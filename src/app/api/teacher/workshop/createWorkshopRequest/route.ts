import { sendError } from "@/errors/Customerror";
import { sendValidationResponse } from "@/responses/ValidationResponse";
import { WorkshopValidation } from "@/shared/validations/WorkshopValidation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {

    try {
        let data = await req.json();
       
        const teacherId = req.headers.get("x-user-id");
        
        data = { ...data, teacher_id: teacherId };
        const validatedData = WorkshopValidation.safeParse(data);
        if (!validatedData.success) {
            return sendValidationResponse(validatedData);
        }
        //const createdWorkshopRequest = await createWorkshopRequest(data, teacherId);

        return NextResponse.json({ message: "Workshop request created successfully" }, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        return sendError(message, 500);
    }

}
