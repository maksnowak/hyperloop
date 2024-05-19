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
    <a href={`/depots/${depot_id}`}>
      <button className="hyperloop-item w-2/3">
      <h3 className="text-center">{depot_id}</h3>
      <p>Depot name: {name}</p>
      <p>Latitude: {Number(latitude)}</p>
      <p>Longitude: {Number(longitude)}</p>
    </button>
    </a>
  );
};

export default Depot;

export const dynamic = 'force-dynamic';