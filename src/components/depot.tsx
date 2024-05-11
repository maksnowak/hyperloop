"use client";
import { Decimal } from "@prisma/client/runtime/library";
import React from "react";

interface DepotProps {
  depot_id: number;
  name: string;
  latitude: Decimal;
  longitude: Decimal;
}

const Depot = ({ depot_id, name, latitude, longitude }: DepotProps) => {
  return (
    <button
      className="w-1/3 rounded-lg bg-gray-600 text-white ring-3 hover:bg-gray-900 hover:rounded-3xl"
      onClick={() => alert(`Clicked on depot ${name}`)}
    >
      <h3 className="text-center">{depot_id}</h3>
      <p>Depot name: {name}</p>
      <p>Latitude: {Number(latitude)}</p>
      <p>Longitude: {Number(longitude)}</p>
    </button>
  );
};

export default Depot;
