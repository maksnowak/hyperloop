"use client";

import { useEffect, useState } from "react";

const getTime = () => new Date();

const ensureTwoDigits = (value: number) => value < 10 ? `0${value}` : value

export const Timer = () => {
    const [dateString, setDateString] = useState('');
    const [timeString, setTimeString] = useState('');

    useEffect(() => {
        setInterval(() => {
            const time = getTime();
            setTimeString(`${ensureTwoDigits(time.getHours())}:${ensureTwoDigits(time.getMinutes())}:${ensureTwoDigits(time.getSeconds())}`);
            setDateString(`${ensureTwoDigits(time.getDate())} / ${ensureTwoDigits(time.getMonth())} / ${time.getFullYear()}`);
        }, 100);
    });

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