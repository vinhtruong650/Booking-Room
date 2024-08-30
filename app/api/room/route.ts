import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { STATUS_SUCCESS } from "@/app/constant/constant";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search") || "";
    const checkInDate = searchParams.get("check_in_date") || "";
    const checkOutDate = searchParams.get("check_out_date") || "";

    const checkIn = checkInDate ? new Date(checkInDate) : undefined;
    const checkOut = checkOutDate ? new Date(checkOutDate) : undefined;

    if (!checkIn && !checkOut) {
      return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }

    const whereCondition: any = {
      bookings: {
        none: {
          status: STATUS_SUCCESS,
          OR: [
            {
              checkInDate: {
                lt: checkOut,
              },
              checkOutDate: {
                gt: checkIn,
              },
            },
            {
              checkInDate: {
                gte: checkIn,
                lt: checkOut,
              },
            },
            {
              checkOutDate: {
                gt: checkIn,
                lte: checkOut,
              },
            },
          ],
        },
      },
    };

    if (search) {
      whereCondition.location = {
        contains: search,
        mode: "insensitive",
      };
    }

    const rooms = await prisma.room.findMany({
      where: whereCondition,
    });
    
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
