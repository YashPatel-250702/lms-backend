import { NextResponse } from "next/server";
 
export class CommonErrorHandler extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = "CommonErrorHandler";
    }
  }
  
export const sendError = (error:any): NextResponse =>{

  if(error instanceof CommonErrorHandler) {
    NextResponse.json({ error: error.message }, {status: error.statusCode });
  }
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}