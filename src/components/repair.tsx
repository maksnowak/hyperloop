import { PrismaClient } from "@prisma/client";
import React from "react";

interface RepairProps {
  repair_id: number;
  date_start: Date;
  date_end: Date | null;
  referred_capsule_id: number;
  performing_depot_id: number;
}

const prisma = new PrismaClient();

const Repair = async ({
  repair_id,
  date_start,
  date_end,
  referred_capsule_id,
  performing_depot_id,
}: RepairProps) => {
  const depot = await prisma.depots.findFirst({
    where: { depot_id: performing_depot_id },
  });
  return (
    <div>
      <a href={`/depots/${performing_depot_id}`}>
        <button className="w-1/3 rounded-lg bg-gray-600 text-white ring-3 hover:bg-gray-900 hover:rounded-3xl">
          <h3 className="text-center">{repair_id}</h3>
          <p>Start date : {date_start.toDateString()}</p>
          <p>End date: {date_end?.toDateString() ?? "N/A"}</p>
          <p>Performing depot : {depot?.name}</p>
        </button>
      </a>
    </div>
  );
};

export default Repair;
