import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();

  const rooms = [
    {
      name: 'Room VIP',
      description: 'A cozy room with a breathtaking view of the city skyline. Perfect for travelers seeking comfort and convenience, equipped with premium amenities.',
      price: 100.0,
      location: 'Downtown, 123 Main St, Central District',
      imageUrl: 'https://studiochupanhdep.com/Upload/Images/Album/anh-phong-khach-san-dep-03.jpg',
    },
    {
      name: 'Room SeaView',
      description: 'A spacious room with a panoramic view of the ocean. The room is designed with modern amenities, making it ideal for both relaxation and business.',
      price: 150.0,
      location: 'Suburbs, 456 Coastal Ave, Oceanfront',
      imageUrl: 'https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/07/gia-phong-khach-san.png',
    },
    {
      name: 'Room Royal',
      description: 'A luxurious room featuring a king-size bed and elegant decor. Guests can enjoy the royal treatment with top-notch services and exquisite furnishings.',
      price: 200.0,
      location: 'City Center, 789 King St, Royal Quarter',
      imageUrl: 'https://www.hoteljob.vn/files/2015/7-luu-y-khi-dat-phong-khach-san.jpg',
    },
    {
      name: 'Room normal',
      description: 'A comfortable room with a fully equipped small kitchen. Ideal for long stays, offering all the essentials for a home-like experience near major transport hubs.',
      price: 120.0,
      location: 'Near Airport, 101 Airport Blvd, Transit Area',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQc4O5R29AXNp7tnU4MjHiVrkjIdmEpLlM3g&s',
    },
    {
      name: 'Room first-class',
      description: 'A quiet and serene room perfect for relaxation, set in a tranquil environment. The room offers peace and comfort, away from the hustle and bustle of the city.',
      price: 80.0,
      location: 'Countryside, 202 Serenity Lane, Quiet Village',
      imageUrl: 'https://media.vneconomy.vn/w800/images/upload/2021/09/04/34852980014-503e510db0-k-1519666490.jpg',
    },
  ];

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
