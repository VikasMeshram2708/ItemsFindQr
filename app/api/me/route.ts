/* eslint-disable @typescript-eslint/no-unused-vars */
import { prismaInstance } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await prismaInstance.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({
    data: user,
  });
}
