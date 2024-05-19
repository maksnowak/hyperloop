import { ArrowRightEndOnRectangleIcon, CalendarDaysIcon, HomeIcon, LifebuoyIcon, MapIcon, WrenchIcon } from "@heroicons/react/24/outline";

export interface Route {
	path: string;
	title: string;
	icon?: JSX.Element;
}

export const routes: Route[] = [
	{ path: '/', title: 'Map', icon: <MapIcon className='w-6 h-6' /> },
	{ path: '/stations', title: 'Stations', icon: <ArrowRightEndOnRectangleIcon className='w-6 h-6' /> },
	{ path: '/depots', title: 'Depots', icon: <HomeIcon className='w-6 h-6' /> },
	{ path: '/capsules', title: 'Capsules', icon: <LifebuoyIcon className='w-6 h-6' /> },
	{ path: '/schedules', title: 'Schedules', icon: <CalendarDaysIcon className='w-6 h-6' /> },
	{ path: '/repairs', title: 'Repair History', icon: <WrenchIcon className='w-6 h-6' /> },
];
