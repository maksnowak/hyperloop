"use client";
import React from "react";

interface CapsuleProps {
  capsule_id: number;
  model: string;
  producer: string;
  status: string;
  type: string;
  seats: number;
  cargo_space: number;
  servicing_depot_id: number;
}

const Capsule = ({
  capsule_id,
  model,
  producer,
  status,
  type,
  seats,
  cargo_space,
  servicing_depot_id,
}: CapsuleProps) => {
  return (
    <a href={`/capsules/${capsule_id}`}>
      <button className="hyperloop-item w-2/3">
        <h3 className="text-center">{capsule_id}</h3>
        <p>Capsule model: {model}</p>
        <p>Producer: {producer}</p>
        <p>Status: {status}</p>
        <p>Type: {type}</p>
        <p>Number of seats: {seats}</p>
        <p>Cargo space: {cargo_space}</p>
      </button>
    </a >
  );
};

export default Capsule;

export const dynamic = 'force-dynamic';