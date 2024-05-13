import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import Repair from "@/components/repair";
import prisma from "../../client";

const Repairs = async () => {
  const repairs = (await prisma.repairs_history.findMany())
    .sort()
    .map((r) => <Repair key={r.repair_id} {...r} />)


  return (
    <>
      <Sidebar />
      <h1 className="text-center bold">Repair History</h1>

      <form>
        <label>Search for a repair</label><br />
        <label>From</label>
        <input type="text" id="repair_history_search_from" /><br />
        <label>To</label>
        <input type="text" id="repair_history_search_to" />
      </form>

      <div>
        {repairs}
      </div>
    </>
  )
};

export default Repairs;
