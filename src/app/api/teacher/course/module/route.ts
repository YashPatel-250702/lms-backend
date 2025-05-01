import { CommonErrorHandler, sendError } from "@/errors/Customerror";
import { getAllModules } from "@/service/teacherService/module/GetModuleService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
    try {
        const modules = await getAllModules();
        return NextResponse.json({ message: "Modules fetched successfully", modules: modules }, { status: 200 });
    } catch (error) {
        if (error instanceof CommonErrorHandler) {
            return sendError(error.message, error.statusCode);
        }
        return sendError("Something went wrong while getting all modules", 500);
    }
}

