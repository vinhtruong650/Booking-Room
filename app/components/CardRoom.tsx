import Link from "next/link";
import { FaLocationArrow, FaStar } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { DateType } from "react-tailwindcss-datepicker";

type Props = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  location?: string;
  imageUrl?: string;
  check_in_date: DateType | undefined;
  check_out_date: DateType | undefined;
};

export default function CardRoom(props: Props) {
  return (
    <div className="bg-white grid grid-rows-3 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif] mt-4">
      <div className="relative row-span-3">
        <img src={props.imageUrl} className="w-full h-full object-cover" />
        <p className="absolute text-white bottom-2.5 md:bottom-0 left-0 md:p-5 px-3">
          {props.location?.split(", ")[0] ?? ""}
        </p>
        <p className="absolute md:text-white text-red-400 md:bottom-0 bottom-2.5 right-0 md:p-5 px-3">
          {`${props.price} USD/Night`}
        </p>
      </div>

      <div className="md:p-6 p-3 row-span-1">
        <h3 className="text-gray-800 flex items-center justify-between text-xl font-bold">
          {props.name}
          <span className="flex">
            <FaStar color="yellow" />
            <FaStar color="yellow" />
            <FaStar color="yellow" />
            <FaStar color="yellow" />
            <FaStar />
          </span>
        </h3>
        <p className="my-4 flex items-center text-sm text-gray-500 leading-relaxed">
          <FaLocationArrow className="mr-2" />
          {props.location}
        </p>
        <Link
          href={`/rooms/${props.id}?check_in_date=${props.check_in_date}&check_out_date=${props.check_out_date}`}
          className="sm:w-full block md:inline text-center px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
        >
          Chi tiết
        </Link>
      </div>
    </div>
  );
}
