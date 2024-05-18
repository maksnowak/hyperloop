import { icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { io } from 'socket.io-client';
import { Capsule } from '../../types/Capsule';
import { CapsuleLocationEvent } from '../../types/CapsuleLocationEvent';

const socket = io('/capsules');

const getIconUrl = (capsuleId: number) => `https://ui-avatars.com/api/?rounded=true&background=fcd34d&color=020617&name=${capsuleId}`;

interface CapsuleMakerProps {
	capsule: Capsule;
}

export const CapsuleMarker = ({ capsule }: CapsuleMakerProps) => {
	const [position, setPosition] = useState([0.0, 0.0]);

	useEffect(() => {
		socket.on('events', handlePositionChange);
	}, []);

	const handlePositionChange = (event: CapsuleLocationEvent) => {
		if (event.referredCapsuleId !== capsule.capsule_id) return;
		setPosition([event.latitude, event.longitude]);
	};

	return (
		<Marker
			key={capsule.capsule_id}
			position={position as [number, number]}
			icon={icon({
				iconUrl: getIconUrl(capsule?.capsule_id),
				iconSize: [25, 25],
			})}
		>
			<Popup>Capsule number {capsule.capsule_id}</Popup>
		</Marker>
	);
};
