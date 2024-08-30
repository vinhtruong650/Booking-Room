import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.room.deleteMany();

  const rooms = [
    {
      name: 'Room VIP',
      description: 'A cozy room with a nice view.',
      price: 100.0,
      location: 'Downtown',
      imageUrl: 'https://studiochupanhdep.com/Upload/Images/Album/anh-phong-khach-san-dep-03.jpg',
    },
    {
      name: 'Room SeaView',
      description: 'A spacious room with modern amenities.',
      price: 150.0,
      location: 'Suburbs',
      imageUrl:'https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/07/gia-phong-khach-san.png',
    },
    {
      name: 'Room Royal',
      description: 'A luxury room with a king-size bed.',
      price: 200.0,
      location: 'City Center',
      imageUrl:'https://www.hoteljob.vn/files/2015/7-luu-y-khi-dat-phong-khach-san.jpg',
    },
    {
      name: 'Room normal',
      description: 'A comfortable room with a small kitchen.',
      price: 120.0,
      location: 'Near Airport',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQc4O5R29AXNp7tnU4MjHiVrkjIdmEpLlM3g&s',
    },
    {
      name: 'Room first-class',
      description: 'A quiet room perfect for relaxation.',
      price: 80.0,
      location: 'Countryside',
      imageUrl:'https://media.vneconomy.vn/w800/images/upload/2021/09/04/34852980014-503e510db0-k-1519666490.jpg',
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
