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
    <button
      className="w-1/3 rounded-lg bg-gray-600 text-white ring-3 hover:bg-gray-900 hover:rounded-3xl"
      onClick={() => alert(`Clicked on capsule ${capsule_id}`)}
    >
      <h3 className="text-center">{capsule_id}</h3>
      <p>Capsule model: {model}</p>
      <p>Producer: {producer}</p>
      <p>Status: {status}</p>
      <p>Type: {type}</p>
      <p>Number of seats: {seats}</p>
      <p>Cargo space: {cargo_space}</p>
    </button>
  );
};

export default Capsule;
