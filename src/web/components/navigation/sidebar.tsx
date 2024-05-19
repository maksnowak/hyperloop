import { Button } from '@nextui-org/react';
import { routes } from '@/routes';
import { headers } from 'next/headers';
import { Timer } from '@/components/time/timer';
import Link from 'next/link';

export const Sidebar = () => {
	const heads = headers();
	const pathname = (heads.get('x-next-pathname') || '/?').split('?')[0];

	console.log('Pathname: ', pathname);

	return (
		<aside className='fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-black px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
			<div className='mt-16 flex justify-center'>
                <Timer />
            </div>
            <div className='space-y-2 tracking-wide'>
				{routes.map((route, index) => (
					<div key={index}>
						<Link href={route.path} passHref>
							<Button
								className='w-full'
								color='primary'
								variant={
									pathname === route.path || (route.path !== '/' && pathname.startsWith(route.path)) ? 'shadow' : 'light'
								}
								startContent={route.icon}
							>
								{route.title}
							</Button>
						</Link>
					</div>
				))}
			</div>
            <div className='h-16'></div>
		</aside>
	);
};
