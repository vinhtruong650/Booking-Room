"use client";

import axios from "axios";
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/room/${props.idRoom}`);
        setData(response.data);
        console.log(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
            <button className="bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Đặt phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
