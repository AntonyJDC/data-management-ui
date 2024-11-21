import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/utils';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { LinkItem } from '../../data/LinksMenu';
import { RippleContainer } from './ripple-container';

interface ItemDropdownMenuProps {
	item: LinkItem;
	index: number;
	closeSidebar: () => void;
	open: boolean;
}

export const ItemDropdownMenu = ({
	item,
	index,
	closeSidebar,
	open,
}: ItemDropdownMenuProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<li key={item.key} className="items-center">
			<div
				onMouseEnter={() => {
					setOpenIndex(index);
				}}
				onMouseLeave={() => setOpenIndex(null)}
				className="flex w-full p-0 m-0 justify-center rounded-xl"
			>
				<DropdownMenu open={openIndex === index}>
					<NavLink
						to={item.to}
						className={`w-full capitalize rounded-xl  font-bold items-center`}
						onClick={closeSidebar}
					>
						{({ isActive }) => (
							<RippleContainer
								isActive={isActive}
								className={cn(
									'flex-col w-full px-2 py-2 text-[20px] rounded-xl font-bold',
									{
										'flex-row': open,
									},
								)}
							>
								<DropdownMenuTrigger className={'w-full p-0 m-0'}>
									<div className="flex justify-center">
										{item.icon}
										<MdKeyboardArrowRight />
									</div>
									<span className="text-xs capitalize">{item.label}</span>
									<span
										className={`${
											!open && 'hidden'
										} pr-4 origin-left duration-200 text-sm text-nowrap`}
									>
										{item.label}
									</span>
								</DropdownMenuTrigger>
							</RippleContainer>
						)}
					</NavLink>
					<DropdownMenuContent
						className="ml-4 rounded-xl space-y-1"
						side="right"
						sideOffset={1}
					>
						{item?.submenu?.map((subitem) => {
							return (
								<NavLink
									key={subitem.key}
									to={subitem.to}
									className={`flex space-x-3 w-full capitalize font-bold items-center `}
									onClick={closeSidebar}
								>
									{({ isActive }) => (
										<DropdownMenuItem
											className={`py-2 px-4 w-full cursor-pointer rounded-lg`}
											active={isActive}
											key={subitem.key}
										>
											{subitem.icon}
											<span className="pl-2">{subitem.label}</span>
										</DropdownMenuItem>
									)}
								</NavLink>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</li>
	);
};
