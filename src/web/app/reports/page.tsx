import React from 'react';
import '@/app/globals.css';
import ReportForm from '@/components/reportForm';

const Reports = () => {
	return (
		<div className='p-5'>
			<h1 className='text-4xl font-bold pb-5'>Reports</h1>
			<ReportForm />
		</div>
	);
};

export default Reports;

export const dynamic = 'force-dynamic';
