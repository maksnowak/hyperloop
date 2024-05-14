import React from "react";
import "../../globals.css";
import Sidebar from "@/components/sidebar";
import Repair from "@/components/repair";
import prisma from "../../client";
import RepairActionButton from "@/app/capsules/[id]/repairActionButton";

const CapsulePage = async ({ params }: { params: { id: string } }) => {
    var repairs = await prisma.repairs_history.findMany({
    where: {
      referred_capsule_id: Number(params.id),
    },
  });
  const depots = await Promise.all(
    repairs.map(async (r) => await prisma.depots.findFirst({
      where: { depot_id: r.performing_depot_id },
    }))
  );
  const capsule = await prisma.capsules.findFirst({
    where: { capsule_id: Number(params.id) },
  });

  return (
    <div>
      <Sidebar />
      <h1 className="text-center bold">Capsule no. {params.id} repairs</h1>
        <h3 className="text-center bold">Current status: {capsule.status}</h3>
        <RepairActionButton status={capsule.status} capsule_id={capsule.capsule_id} />
        <br></br>
        <br></br>
        {repairs.sort((r1, r2) => r1.repair_id - r2.repair_id)
            .map((r, i) => {
          return <Repair repair={r} depot={depots[i]} />;
        })}
    </div>
  );
};

export default CapsulePage;
