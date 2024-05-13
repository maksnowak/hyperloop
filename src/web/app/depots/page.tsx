import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import Depot from "@/components/depot";
import prisma from "../../client";

const Depots = async () => {
  const depots = await prisma.depots.findMany();

  return (
    <>
      <h1 className="text-center">Depots</h1>
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
