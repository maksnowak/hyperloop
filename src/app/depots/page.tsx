import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import { PrismaClient } from "@prisma/client";
import Depot from "@/components/depot";

const prisma = new PrismaClient();

const Depots = async () => {
  const depots = await prisma.depots.findMany();

  return (
    <>
      <div className="text-center">Depots</div>
      <div className="relative">
        <Sidebar />
        <div className="ml-64 static grid grid-cols-3 inset-y-0 right-0 gap-y-8">
          {depots.map((depot) => {
            return <Depot key={depot.depot_id} {...depot} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Depots;
