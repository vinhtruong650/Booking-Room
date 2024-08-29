"use client";
import CardRoom from "./components/CardRoom";
import useSWR from "swr";
import { fetcher } from "./utils/fetcher";

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/room", fetcher);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="flex justify-center gap-10 flex-wrap px-24 py-12">
      {data.map((room: any) => {
        return (
          <CardRoom
            key={room.id}
            imageUrl={room.imageUrl}
            name={room.name}
            location={room.location}
            price={room.price}
          ></CardRoom>
        );
      })}
    </main>
  );
}
