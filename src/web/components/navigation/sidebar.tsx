"use client";

import { Button } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from '@/routes';

export const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

	return (
		<aside className='fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-center border-r bg-black px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
			<div className='space-y-2 tracking-wide'>
				{routes.map((route, index) => (
					<Button
						key={index}
						className='w-full'
						color='primary'
						variant={pathname === route.path || (route.path !== '/' && pathname.startsWith(route.path)) ? 'shadow' : 'light'}
						startContent={route.icon}
						onClick={() => router.push(route.path)}
					>
						{route.title}
					</Button>
				))}
			</div>
		</aside>
	);
};
