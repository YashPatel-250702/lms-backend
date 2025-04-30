import { NextRequest, NextResponse } from "next/server";
import { CommonErrorHandler, sendError } from "./errors/Customerror";
import { verifyToken } from "./utils/JwtUtil";
import { API_PATH_PERMISSION } from "./shared/paths/ApiPathPermission";
import { JWTPayload } from "jose";

export default async function middleware(request: NextRequest) {
  try {
    const method = request.method;
    const pathname = request.nextUrl.pathname;

    const header = request.headers.get("Authorization") || "";
    if (!header) {
      throw new CommonErrorHandler("Authorization header is required", 401);
    }

    const token = header.slice(7);
    if (!token) {
      throw new CommonErrorHandler("Token is required", 401);
    }

    const payload: JWTPayload = await verifyToken(token);
    if (!payload) {
      throw new CommonErrorHandler("Invalid Token Or Token Expired", 401);
    }

    const userRole: string = payload.role as string;
    const methodPaths: Record<string, string[]> = API_PATH_PERMISSION[method];

    if (methodPaths) {
      const matchedPath = Object.keys(methodPaths).find((routePattern) =>
        routePattern === pathname || matchRoute(routePattern, pathname)
      );

      if (matchedPath) {
        const allowedRoles = methodPaths[matchedPath];
        if (!allowedRoles.includes(userRole)) {
          return NextResponse.json(
            { error: "User does not have permission for this route" },
            { status: 403 }
          );
        }
      }
    }

    const user_id = payload.user_id as string;
    const response = NextResponse.next();
    //console.log("User ID from payload:", user_id);
    response.headers.set("x-user-id", user_id); 

    return response;
  } catch (error) {
    if (error instanceof CommonErrorHandler) {
                return sendError(error.message, error.statusCode);
            }
    
      return sendError("Authorization failed", 401);
  }
}

function matchRoute(route: string, pathname: string): boolean {
  const routePattern = route.split("/").filter(Boolean);
  const pathPattern = pathname.split("/").filter(Boolean);

  if (routePattern.length !== pathPattern.length) return false;

  for (let i = 0; i < routePattern.length; i++) {

    if (routePattern[i].startsWith(":")) continue;
    if (routePattern[i] !== pathPattern[i]) return false;
  }
  return true;
}

export const config = {
    matcher: [
      "/api/teacher/:path*",
      "/api/admin/:path*",
      "/api/student/:path*",
      "/api/user/:path((?!login|register).*)"
      
    ],
  };
  