import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { roomId, userName, checkInDate, checkOutDate } = await request.json();

    if (!roomId || !userName || !checkInDate || !checkOutDate) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    if (checkIn >= checkOut) {
      return NextResponse.json({ error: 'Check-out date must be after check-in date' }, { status: 400 });
    }

    const existingBookings = await prisma.booking.findMany({
      where: {
        roomId: Number(roomId),
        OR: [
          {
            checkInDate: { lt: checkOut },
            checkOutDate: { gt: checkIn }
          },
          {
            checkInDate: { lte: checkIn },
            checkOutDate: { gte: checkOut }
          }
        ]
      }
    });

    if (existingBookings.length > 0) {
      return NextResponse.json({ error: 'Room is already booked for the selected dates' }, { status: 400 });
    }

    const newBooking = await prisma.booking.create({
      data: {
        roomId: Number(roomId),
        userName,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        status: 'success',
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    try {
      const bookings = await prisma.booking.findMany({
        include: {
          room: true,
        },
      });
  
      return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
