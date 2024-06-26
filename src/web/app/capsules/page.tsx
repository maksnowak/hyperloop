import React from "react";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import Capsule from "@/components/capsule";
import AddCapsuleForm from "@/components/addCapsuleForm";
import prisma from "@/client";

const Capsules = async () => {
    const capsules = (await prisma.capsules.findMany())
        .sort((c1, c2) => c1.capsule_id - c2.capsule_id)
        .map((g) => <Capsule key={g.capsule_id} {...g} />);

    return (
        <div className='p-5'>
            <h1 className='text-4xl font-bold pb-5'>Capsules</h1>
            <AddCapsuleForm />
            <br />
            <div className='hyperloop-grid'>{capsules}</div>
        </div>
	);
};

export default Capsules;

export const dynamic = 'force-dynamic';
