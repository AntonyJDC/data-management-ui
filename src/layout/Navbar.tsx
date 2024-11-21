import React from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { Theme } from '../components/shared';
interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Navbar: React.FC<Props> = ({ open, setOpen }) => {
	return (
		<div className="relative flex h-14 mx-2 items-center justify-between">
			<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
				{/* Mobile menu button*/}
				<button
					type="button"
					onClick={() => {
						setOpen(!open);
					}}
					className="relative rounded-full  p-1"
				>
					<span className="absolute -inset-1.5" />
					<span className="sr-only">View notifications</span>
					<HiOutlineMenu className="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
			<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div className="hidden flex-shrink-0 items-center md:flex ml-5">
					<h2 className='font-semibold text-xl'>Data management</h2>
				</div>
			</div>
			<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
				<Theme />
			</div>
		</div>
	);
};
