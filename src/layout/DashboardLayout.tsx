import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';

export const DashboardLayout = () => {

	const [open, setOpen] = useState<boolean>(() => {
		const statusNavbar = localStorage.getItem('statusNavbar');
		if (statusNavbar === 'true' || statusNavbar === 'false') {
			return statusNavbar === 'true';
		} else {
			return false;
		}
	});

	useEffect(() => {
		localStorage.setItem('statusNavbar', JSON.stringify(open));
	}, [open]);

	return (
		<div className="bg-base-100 animate-in fade-in duration-500 flex h-dvh">
			<Sidebar open={open} setOpen={setOpen} />
			<div className="flex flex-col w-full">
				<div className="bg-base-100 border-2 rounded-xl m-1 md:m-2 mb-0">
					<div className="flex w-full flex-col">
						<Navbar open={open} setOpen={setOpen} />
					</div>
				</div>
				<div className=" relative border-2 h-full rounded-xl flex m-1 md:m-2 overflow-hidden ">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
