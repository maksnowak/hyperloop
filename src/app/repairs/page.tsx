import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import prisma from "../client";
import FilteredRepairs from "./filtered_repairs";

const Repairs = async () => {
  const repairs = await prisma.repairs_history.findMany();
  const depots = await Promise.all(
    repairs.map(async (r) => await prisma.depots.findFirst({
      where: { depot_id: r.performing_depot_id },
    }))
  );

  return (
    <>
      <Sidebar />
      <h1 className="text-center bold">Repair History</h1>

      <FilteredRepairs repairs={repairs} depots={depots} />
    </>
  )
};

export default Repairs;
