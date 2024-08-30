import BookingsForm from "../components/RoomItem";

export default function Booking({ params }: { params: { id: string } }) {
  return (
    <main className="w-full min-h-screen p-5">
      <div className="bg-white rounded-md p-5">
        <h1 className="text-4xl">Khách sạn Mai House SaiGon</h1>
        <div className="flex justify-between md:flex-row flex-col md:items-center items-start">
          <h3 className="text-gray-400">
            157 Đường Nam Kì Khởi Nghĩa, Võ Thị Sáu, Q3, TP Hồ Chí Minh
          </h3>
        </div>
        <BookingsForm idRoom={params.id}></BookingsForm>
      </div>
    </main>
  );
}
