import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import Capsule from "@/components/capsule";
import prisma from "../client";

const Capsules = async () => {
  const capsules = (await prisma.capsules.findMany())
    .sort((c1, c2) => c1.capsule_id - c2.capsule_id)
    .map((g) => <Capsule key={g.capsule_id} {...g} />);

  return (
    <>
      <h1 className="text-center">Capsules</h1>
      <div className="relative">
        <Sidebar />
        <div className="hyperloop-grid">
          {capsules}
        </div>
      </div>
    </>
  );
};

export default Capsules;
