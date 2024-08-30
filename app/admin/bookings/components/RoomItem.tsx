"use client";

import {
  STATUS_CANCELLED,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "@/app/constant/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Datepicker from "react-tailwindcss-datepicker";

type Props = {
  idBooking: string;
};

export default function BookingsForm({ idBooking }: Props) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/bookings/${idBooking}`);
        setData(response.data);
      } catch (err: any) {
        setError("Failed to load booking data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idBooking]);

  if (error) {
    return (
      <div className="w-screen h-screen items-center justify-center flex">
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen items-center justify-center flex">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden font-[sans-serif] mt-4">
      <div className="p-5">
        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <div className="col-span-3 md:col-span-1">
            <img src={data?.room?.imageUrl} className="object-cover" />
          </div>
          <div className="px-3 col-span-2 md:col-span-1 flex flex-col justify-evenly items-start">
            <div>
              <h5 className="text-lg text-blue-900">{data?.room?.name}</h5>
              <p className="flex items-center gap-3">
                <FaLocationDot />
                <span className="text-gray-500">{data?.room?.location}</span>
              </p>
            </div>
            <p className="row-span-2">{data?.room?.description}</p>
            <div className="mt-5 text-red-400">{`${data?.room?.price} USD/Night`}</div>
          </div>
          <div className="flex items-center md:col-span-1 col-span-3">
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="col-span-2">
                <Datepicker
                  disabled
                  containerClassName="mt-2.5 sm:mt-0 border w-full rounded"
                  value={{
                    startDate: new Date(data?.checkInDate),
                    endDate: new Date(data?.checkOutDate),
                  }}
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <input
                  disabled
                  value={data?.userName}
                  className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 sm:text-sm"
                  placeholder="Tên"
                  readOnly
                />
              </div>
              <div className="col-span-1">
                <input
                  disabled
                  value={data?.status.toUpperCase()}
                  className={`inline w-full rounded-md border py-2 pl-3 pr-3 leading-5 sm:text-sm ${
                    data?.status === STATUS_SUCCESS
                      ? "bg-green-100 border-green-300"
                      : data?.status === STATUS_FAILED
                      ? "bg-yellow-100 border-yellow-300"
                      : data?.status === STATUS_CANCELLED
                      ? "bg-red-100 border-red-300"
                      : "bg-gray-100 border-gray-300"
                  }`}
                  placeholder="Trạng thái"
                  readOnly
                />
              </div>

              <button
                className="col-span-1 block md:inline text-center px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                onClick={() => window.history.back()}
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
