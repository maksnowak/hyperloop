import React from "react";
import "../../globals.css";
import Sidebar from "@/components/sidebar";
import Repair from "@/components/repair";
import prisma from "../../client";

const CapsulePage = async ({ params }: { params: { id: string } }) => {
  const repairs = await prisma.repairs_history.findMany({
    where: {
      referred_capsule_id: Number(params.id),
    },
  });
  const depots = await Promise.all(
    repairs.map(async (r) => await prisma.depots.findFirst({
      where: { depot_id: r.performing_depot_id },
    }))
  );

  return (
    <div>
      <Sidebar />
      <h1 className="text-center bold">Capsule number {params.id}</h1>
        {repairs.map((r, i) => {
          return <Repair repair={r} depot={depots[i]} />;
        })}
    </div>
  );
};

export default CapsulePage;
