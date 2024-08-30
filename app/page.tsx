"use client";
import CardRoom from "./components/CardRoom";
import axios from "axios";
import { useEffect, useState } from "react";
import getNextDay from "./utils/getNextDay";
import Datepicker, {
  DateRangeType,
  DateValueType,
} from "react-tailwindcss-datepicker";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDate, setFilterDate] = useState<DateValueType>({
    startDate: new Date(),
    endDate: getNextDay(),
  });
  const [search, setSearch] = useState<string>("");
  const [trigerSearch, setTrigerSearch] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/room?search=${search}&check_in_date=${filterDate?.startDate}&check_in_date=${filterDate?.endDate}`
        );
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [trigerSearch]);

  if (error) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <div className="w-screen h-screen items-center justify-center flex">
        <p>Loading...</p>
      </div>
    );

  return (
    <main>
      <div className="bg-white flex flex-1 items-center justify-center p-2">
        <div className="w-full max-w-2xl">
          <form
            className="sm:flex sm:items-center gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setTrigerSearch(!trigerSearch);
            }}
          >
            <input
              id="q"
              name="q"
              className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search by address"
              type="search"
              autoFocus={false}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Datepicker
              required
              containerClassName="mt-2.5 sm:mt-0 border w-full rounded"
              value={filterDate}
              onChange={(newValue) => {
                setFilterDate(newValue);
              }}
            />
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center gap-2 md:gap-10 flex-wrap px-5 md:px-24 py-12">
        {data.length === 0 ? (
          <div className="w-screen h-screen text-center">No data</div>
        ) : (
          data.map((room: any) => {
            return (
              <CardRoom
                key={room.id}
                id={room.id}
                imageUrl={room.imageUrl}
                name={room.name}
                location={room.location}
                price={room.price}
                check_in_date={filterDate?.startDate}
                check_out_date={filterDate?.endDate}
              ></CardRoom>
            );
          })
        )}
      </div>
    </main>
  );
}
