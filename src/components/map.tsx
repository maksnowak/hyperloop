"use client";
import { Decimal } from "@prisma/client/runtime/library";
import React, { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface capsule_location_event {
  event_id: number;
  timestamp: Date;
  latitude: Decimal;
  longitude: Decimal;
  speed: Decimal;
  interior_conditions: string | null;
  signal_strength: Decimal;
  operational_status: string | null;
  health_status: string | null;
  referred_capsule_id: number;
  referred_tube_id: number;
  rau_id: number;
}

interface MapProps {
  cle: capsule_location_event[];
}

const Map: FC<MapProps> = ({ cle }) => {
  return (
    <div>
      <MapContainer
        style={{ height: "100vh" }}
        center={[52.218, 21.011]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cle.map((capsule_location_event) => {
          return (
            <Marker
              key={capsule_location_event.event_id}
              position={[52.218, 21.011]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
