import React from "react";
import prisma from "../app/client";

interface RepairProps {
  repair_id: number;
  date_start: Date;
  date_end: Date | null;
  referred_capsule_id: number;
  performing_depot_id: number;
}

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
        <button className="hyperloop-item w-1/5">
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
