"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

type props = {
  idRoom: string;
};

export default function RoomItem(props: props) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const check_in_date = searchParams.get("check_in_date");
  const check_out_date = searchParams.get("check_out_date");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/room/${props.idRoom}`);
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return <></>;
  if (isLoading) return <></>;

  return (
    <div className="bg-gray-200 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden font-[sans-serif] mt-4">
      <div className="p-5">
        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <div>
            <img src={data?.imageUrl} className="object-cover" />
          </div>
          <div className="col-span-2 px-3 flex flex-col justify-evenly items-start">
            <div>
              <h5 className="text-lg text-blue-900">{data?.name}</h5>
              <p className="flex items-center gap-3">
                <FaLocationDot />
                <span className="text-gray-500">{data?.location}</span>
              </p>
            </div>
            <p className="row-span-2">{data?.description}</p>
            <div className="mt-5 text-red-400">{`${data?.price} USD/Night`}</div>
            <Link
              href={`/bookings/${props.idRoom}?check_in_date=${check_in_date}&check_out_date=${check_out_date}`}
              className=" block md:inline text-center px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
            >
              Đặt phòng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
