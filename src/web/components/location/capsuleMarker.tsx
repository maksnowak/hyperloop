import { icon } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { io } from "socket.io-client";

const socket = io('/capsules');

interface CapsuleLocationEvent {
	eventIdd: string;
	timestamp: Date;
	latitude: number;
	longitude: number;
	referredCapsuleId: number;
}

export const CapsuleMaker = ({ capusle_id = 2137 }) => {
	const [position, setPosition] = useState([0.0, 0.0]);

	useEffect(() => {
		socket.on('events', (event: CapsuleLocationEvent) => {
			console.log(event);

			if (event.referredCapsuleId !== capusle_id) return;
			setPosition([event.latitude, event.longitude]);
		});
	}, []);

	const CapsuleIcon = icon({
		iconUrl: `https://ui-avatars.com/api/?rounded=true&background=fcd34d&color=020617&name=${capusle_id}`,
		iconSize: [25, 25],
	});

	return (
		<Marker key={1} position={position} icon={CapsuleIcon}>
			<Popup>Capsule number {1}</Popup>
		</Marker>
	);
};
