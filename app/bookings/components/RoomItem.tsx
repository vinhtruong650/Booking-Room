"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Datepicker from "react-tailwindcss-datepicker";
import { useForm, SubmitHandler } from "react-hook-form";

type props = {
  idRoom: string;
};

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function BookingsForm(props: props) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const check_in_date = searchParams.get("check_in_date");
  const check_out_date = searchParams.get("check_out_date");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const checkInDate = new Date(check_in_date ?? "");
    const checkOutDate = new Date(check_out_date ?? "");

    if (checkInDate >= checkOutDate) {
      setError("Ngày check-out phải sau ngày check-in");
      return;
    }

    try {
      const response = await axios.post("/api/bookings", {
        roomId: props.idRoom,
        userName: `${formData.name} ${formData.lastName}`,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      });

      if (response.status === 201) {
        alert("Đặt phòng thành công!");
        reset();
      }
    } catch (err: any) {
      setError("Lỗi hệ thống, vui lòng thử lại sau.");
      alert("Đặt phòng không thành công! Liên hệ quản trị viên");
    }
  };

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

  if (error)
    return (
      <div className="w-screen h-screen items-center justify-center flex">
        <p>Failed to load data</p>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-screen h-screen items-center justify-center flex">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="bg-gray-200 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden font-[sans-serif] mt-4">
      <div className="p-5">
        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <div className="col-span-3 md:col-span-1">
            <img src={data?.imageUrl} className="object-cover" />
          </div>
          <div className=" px-3 col-span-2 md:col-span-1 flex flex-col justify-evenly items-start">
            <div>
              <h5 className="text-lg text-blue-900">{data?.name}</h5>
              <p className="flex items-center gap-3">
                <FaLocationDot />
                <span className="text-gray-500">{data?.location}</span>
              </p>
            </div>
            <p className="row-span-2">{data?.description}</p>
            <div className="mt-5 text-red-400">{`${data?.price} USD/Night`}</div>
          </div>
          <div className="flex items-center md:col-span-1 col-span-3">
            <form
              className="grid grid-cols-2 gap-2 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-span-2">
                <Datepicker
                  required
                  disabled
                  containerClassName="mt-2.5 sm:mt-0 border w-full rounded"
                  value={{
                    startDate: new Date(check_in_date ?? ""),
                    endDate: new Date(check_out_date ?? ""),
                  }}
                  onChange={() => {}}
                />
              </div>
              <div>
                <input
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  className={`inline w-full rounded-md border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                  placeholder="Tên"
                  type="text"
                />
                {errors.name && (
                  <span className="text-red-500">Tên là bắt buộc</span>
                )}
              </div>

              <div>
                <input
                  {...register("lastName", { required: true })}
                  id="last-name"
                  name="lastName"
                  className={`inline w-full rounded-md border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                  placeholder="Họ"
                  type="text"
                />
                {errors.lastName && (
                  <span className="text-red-500">Họ là bắt buộc</span>
                )}
              </div>

              <div>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  id="email"
                  name="email"
                  className={`inline w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                  placeholder="Email"
                  type="email"
                />
                {errors.email && (
                  <span className="text-red-500">Email không hợp lệ</span>
                )}
              </div>

              <div>
                <input
                  {...register("phone", {
                    required: true,
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                  id="phone"
                  name="phone"
                  className={`inline w-full rounded-md border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                  placeholder="Số điện thoại"
                  type="tel"
                />
                {errors.phone && (
                  <span className="text-red-500">
                    Số điện thoại không hợp lệ
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="col-span-2 block md:inline text-center px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
              >
                Xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
