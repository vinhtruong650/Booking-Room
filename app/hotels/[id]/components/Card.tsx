import React, { ReactNode } from "react";

type props = {
  title: string;
  listChildren: ReactNode[];
};

export default function Card(props: props) {
  return (
    <div className="bg-gray-200 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden font-[sans-serif] mt-4">
      <div className="p-5">
        <h5 className="text-lg text-blue-900">{props.title}</h5>
        <div className="px-3">
          {/* {props.listChildren.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
