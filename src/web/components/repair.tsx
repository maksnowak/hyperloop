import React from "react";
import { DepotProps } from "./depot";

export interface RepairProps {
  repair_id: number;
  date_start: Date;
  date_end: Date | null;
  referred_capsule_id: number;
  performing_depot_id: number;
}

const Repair = (props: {
  repair: RepairProps,
  depot: DepotProps,
}) => {
  return (
    <div>
      <a href={`/depots/${props.repair.performing_depot_id}`}>
        <button className="hyperloop-item w-1/5">
          <h3 className="text-center">{props.repair.repair_id}</h3>
          <p>Start date: {props.repair.date_start.toDateString()}</p>
          <p>End date: {props.repair.date_end?.toDateString() ?? "N/A"}</p>
          <p>Performing depot: {props.depot.name}</p>
        </button>
      </a>
    </div>
  );
};

export default Repair;
