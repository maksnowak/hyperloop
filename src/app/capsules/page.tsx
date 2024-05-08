import Sidebar from "@/components/sidebar";
import React from "react";
import "../globals.css";
import { PrismaClient } from "@prisma/client";
import Capsule from "@/components/capsule";

const prisma = new PrismaClient();

const Capsules = async () => {
  const capsules = await prisma.capsules.findMany();
  return (
    <>
      <h1 className="text-center bold">Capsules</h1>
      <div className="relative">
        <Sidebar />
        <div className="ml-64 static grid grid-cols-3 inset-y-0 right-0 gap-y-8">
          {capsules.map((capsule) => {
            return <Capsule key={capsule.capsule_id} {...capsule} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Capsules;
