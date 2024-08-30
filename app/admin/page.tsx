"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from next/link
import formatDate from "../utils/formatDate";
import {
  STATUS_CANCELLED,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../constant/constant";

export default function Home() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings");
        setBookings(response.data);
      } catch (err: any) {
        setError("Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, []);

  const statusClass = (status: string) => {
    switch (status) {
      case STATUS_SUCCESS:
        return "bg-green-200 text-green-800";
      case STATUS_FAILED:
        return "bg-yellow-200 text-yellow-800";
      case STATUS_CANCELLED:
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleCancel = async (bookingId: string) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: STATUS_CANCELLED }
            : booking
        )
      );
      alert("Booking cancelled successfully.");
    } catch (err: any) {
      alert("Failed to cancel booking.");
    }
  };

  return (
    <main>
      <div className="flex justify-center gap-2 md:gap-10 flex-wrap px-5 md:px-24 py-12 bg-slate-50 overflow-scroll">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        STT
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Phòng
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Tên
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Ngày check-in
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Ngày check-out
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Trạng thái
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {error ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-4 text-center text-sm text-red-500"
                        >
                          {error}
                        </td>
                      </tr>
                    ) : bookings.length > 0 ? (
                      bookings.map((booking, index) => (
                        <tr
                          key={booking.id}
                          className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {booking.room.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {booking.userName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {formatDate(booking.checkInDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {formatDate(booking.checkOutDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div
                              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${statusClass(
                                booking.status
                              )}`}
                            >
                              {booking.status}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-end whitespace-nowrap text-sm font-medium">
                            <Link
                              href={`/admin/bookings/${booking.id}`}
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800"
                            >
                              Chi tiết
                            </Link>
                            {booking.status !== STATUS_CANCELLED && (
                              <>
                                /
                                <button
                                  type="button"
                                  onClick={() => handleCancel(booking.id)}
                                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none "
                                >
                                  Hủy
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
