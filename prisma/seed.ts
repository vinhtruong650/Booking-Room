import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.room.deleteMany();

  const rooms = [
    {
      name: 'Room A',
      description: 'A cozy room with a nice view.',
      price: 100.0,
      location: 'Downtown',
      imageUrl: 'https://readymadeui.com/Imagination.webp',
    },
    {
      name: 'Room B',
      description: 'A spacious room with modern amenities.',
      price: 150.0,
      location: 'Suburbs',
      imageUrl:'https://readymadeui.com/Imagination.webp',
    },
    {
      name: 'Room C',
      description: 'A luxury room with a king-size bed.',
      price: 200.0,
      location: 'City Center',
      imageUrl:'https://readymadeui.com/Imagination.webp',
    },
    {
      name: 'Room D',
      description: 'A comfortable room with a small kitchen.',
      price: 120.0,
      location: 'Near Airport',
      imageUrl:'https://readymadeui.com/Imagination.webp',
    },
    {
      name: 'Room E',
      description: 'A quiet room perfect for relaxation.',
      price: 80.0,
      location: 'Countryside',
      imageUrl:'https://readymadeui.com/Imagination.webp',
    },
  ];

  // Nhập dữ liệu vào bảng Room
  for (const room of rooms) {
    await prisma.room.create({
      data: room,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
