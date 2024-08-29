import prisma from '../../lib/prisma'
export async function GET() {
    const rooms = await prisma.room.findMany();
    return Response.json(rooms)
}