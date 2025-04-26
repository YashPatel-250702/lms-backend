
import { NextResponse } from "next/server";
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendValidationResponse(validatedData: any): NextResponse {
  const error: Record<string, string> = {};
 
  validatedData.error.issues.map((issue: any) => {
    error[issue.path[0]] = issue.message;
  });
 
  return NextResponse.json(error, { status: 400 });
}