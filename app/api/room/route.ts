import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany();
    return new Response(JSON.stringify(rooms), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
