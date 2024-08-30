# Booking-Room

Project booking room for a hotel (Test project)
Main function: booking room and manage booking

#setup local

1. run yarn install (or npm)
2. create .env file (copy .env.example and replace variable)
3. run seeder (npx prisma db seed)
4. run yarn dev -> localhost:3000

#API endpoint

- GET /api/rooms?search=""&check_in_date=""&check_out_date: get list room by location, check_in_date, check_out_date of booking
- GET /api/rooms/:id: get detail room
- POST /api/bookings: create new booking
- GET /api/bookings: get list booking (admin)
- DELETE /api/bookings/:id: Cancel booking of user (admin)

#Link deloy:
https://booking-room-five.vercel.app/

#Link design-system-file
https://drive.google.com/file/d/1BJZm_HKaThFrLZ7HdQVIX7QvqVJgSjqO/view?usp=sharing

#run seeder import mock data
npx prisma db seed
