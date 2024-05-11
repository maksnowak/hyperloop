import Sidebar from "@/components/sidebar";
import "../../globals.css";
import React from "react";
import { PrismaClient } from "@prisma/client";
import Repair from "@/components/repair";

const prisma = new PrismaClient();

const CapsulePage = async ({ params }: { params: { id: string } }) => {
  const repairs = await prisma.repairs_history.findMany({
    where: {
      referred_capsule_id: Number(params.id),
    },
  });
  console.log(repairs);
  return (
    <div>
      <Sidebar />
      <h1 className="text-center bold">Capsule number {params.id}</h1>
      <div className="ml-64 static grid grid-cols-3 inset-y-0 right-0 gap-y-8">
        {repairs.map((repair) => {
          return <Repair key={repair.repair_id} {...repair} />;
        })}
      </div>
    </div>
  );
};

export default CapsulePage;
