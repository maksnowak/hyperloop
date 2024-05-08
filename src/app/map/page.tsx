import Sidebar from "@/components/sidebar";
import React, { useMemo } from "react";
import "../globals.css";
import dynamic from "next/dynamic";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Map = async () => {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const capsule_location_events =
    await prisma.capsule_location_events.findMany();

  return (
    <div className="relative">
      <div className="">
        <Sidebar />
      </div>
      <div className="ml-32">
        <MapComponent cle={capsule_location_events} />
      </div>
    </div>
  );
};

export default Map;
