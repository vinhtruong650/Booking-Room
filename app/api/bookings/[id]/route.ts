import { STATUS_CANCELLED } from "@/app/constant/constant";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: Number(id) },
      data: { status: STATUS_CANCELLED },
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      const id = params.id;
  
      if (!id) {
        return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
      }
  
      const booking = await prisma.booking.findUnique({
        where: { id: Number(id) },
        include: {
          room: true,
        },
      });
  
      if (!booking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }
  
      return NextResponse.json(booking, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
