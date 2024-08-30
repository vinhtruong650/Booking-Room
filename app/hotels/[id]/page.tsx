import { FaFlag, FaParking, FaStar, FaSwimmingPool } from "react-icons/fa";
import Card from "./components/Card";
import Link from "next/link";
import RoomItem from "./components/RoomItem";

export default function Hotel({ params }: { params: { id: string } }) {
  return (
    <main className="w-full min-h-screen p-5">
      <div className="bg-white rounded-md p-5">
        <h1 className="text-4xl">Khách sạn Mai House SaiGon</h1>
        <div className="flex justify-between md:flex-row flex-col md:items-center items-start">
          <h3 className="text-gray-400">
            157 Đường Nam Kì Khởi Nghĩa, Võ Thị Sáu, Q3, TP Hồ Chí Minh
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 py-5">
          <img
            className="col-span-2 row-span-2 h-full object-cover"
            src="https://media.vneconomy.vn/w800/images/upload/2021/09/04/34852980014-503e510db0-k-1519666490.jpg"
          />
          <img
            className="object-fill col-span-1 row-span-1"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQc4O5R29AXNp7tnU4MjHiVrkjIdmEpLlM3g&s"
          />
          <img
            className="object-fill col-span-1 row-span-1"
            src="https://media.vneconomy.vn/w800/images/upload/2021/09/04/34852980014-503e510db0-k-1519666490.jpg"
          />
          <img
            className="object-fill col-span-1 row-span-1"
            src="https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/07/gia-phong-khach-san.png"
          />
          <img
            className="object-fill col-span-1 row-span-1"
            src="https://media.vneconomy.vn/w800/images/upload/2021/09/04/34852980014-503e510db0-k-1519666490.jpg"
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <Card
            title="Tiện nghi"
            listChildren={[
              <span key={1} className="flex items-center gap-2">
                <FaSwimmingPool />
                Hồ bơi
              </span>,
              <span key={2} className="flex items-center gap-2">
                <FaParking />
                Chỗ đậu xe
              </span>,
              <span key={3} className="flex items-center gap-2">
                <FaFlag />
                Khu vui chơi giải trí
              </span>,
            ]}
          />
          <Card
            title="Đánh giá"
            listChildren={[
              <span key={1} className="flex gap-2 items-center">
                4.7/5 <FaStar color="yellow" />
              </span>,
              <span key={2} className="flex gap-2 items-center">
                Có tất cả 365 đánh giá
              </span>,
            ]}
          />
        </div>
        <RoomItem idRoom={params.id}></RoomItem>
      </div>
    </main>
  );
}
