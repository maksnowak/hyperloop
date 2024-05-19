"use client";

import { useEffect, useState } from "react";

const getTime = () => new Date();

const ensureTwoDigits = (value: number) => value < 10 ? `0${value}` : value

const toTimeString = (time: Date) => `${ensureTwoDigits(time.getHours())}:${ensureTwoDigits(time.getMinutes())}:${ensureTwoDigits(time.getSeconds())}`;

const toDateString = (time: Date) => `${ensureTwoDigits(time.getDate())} / ${ensureTwoDigits(time.getMonth())} / ${time.getFullYear()}`;

export const Timer = () => {
    const [dateString, setDateString] = useState(toDateString(getTime()));
    const [timeString, setTimeString] = useState(toTimeString(getTime()));

    useEffect(() => {
        const interval = setInterval(() => {
            const time = getTime();
            setTimeString(toTimeString(time));
            setDateString(toDateString(time));
        }, 100);

        return () => clearInterval(interval);
    });

    if (!dateString || !timeString) return null;

    return (
		<div>
            <h3 className='font-medium text-sm text-center text-gray-200'>
                {dateString}
            </h3>
			<h2 className='font-bold text-3xl text-white'>
                {timeString}
            </h2>
		</div>
	);
}