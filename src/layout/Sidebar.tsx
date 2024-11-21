import { TiArrowLeftOutline } from 'react-icons/ti';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/utils';
import { linksMenu } from '../data/LinksMenu';
import { ScrollArea } from '../components/ui/scroll-area';
import { ItemDropdownMenu } from './components/item-dropdown-menu';
import { Item } from './components/item';
import { RippleContainer } from './components';

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<Props> = ({ open, setOpen }) => {
	const sideNavRef = useRef<HTMLDivElement | null>(null);

	const [isActive, setActive] = useState(true);

	useEffect(() => {
		if (isActive) {
			// Add event listener to the document object
			document.addEventListener('mousedown', handleClickOutside);
		}
		// Clean up function
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isActive]);

	const closeSidebar = () => {
		if (window.innerWidth < 769) {
			setOpen(false);
		}
	};

	function handleClickOutside(event: MouseEvent) {
		if (
			sideNavRef.current &&
			!sideNavRef.current.contains(event.target as Node) &&
			window.innerWidth < 769
		) {
			setOpen(false);
		}
	}


	return (
		<section
			id="container"
			ref={sideNavRef}
			className={cn(
				'w-fit min-h-dvh h-full shadow-sm pb-1 pt-1 pl-1 md:pb-2 md:pt-2 md:pl-2 z-50 duration-300 absolute md:relative ',
				{
					'md:translate-x-0 -translate-x-full ': !open,
				},
			)}
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					setOpen(false);
				}
			}}
		>
			<div
				id="sidebar"
				className={cn(
					'h-full relative shrink-0 flex flex-col duration-300  rounded-xl border-2 bg-base-100',
					{ 'w-72 md:w-72': open },
					{
						'md:w-[100px] md:border-2 border-0 px-1 py-2': !open,
					},
				)}
			>
				<button
					onClick={() => {
						setOpen(!open);
					}}
					aria-label="Open/Close navigation bar"
					className={cn(
						'btn btn-sm btn-circle text-2xl bg-base-100 absolute border-2 -right-7 top-11 duration-300',
						{ 'rotate-180 opacity-0 md:opacity-100': !open },
					)}
				>
					<TiArrowLeftOutline className="" />
				</button>
				<div className={cn({ 'px-4': open })}>
					<div
						className={cn(
							'pt-1 flex w-full flex-col  items-center',
							{
								'gap-0': !open,
							},
							{ 'px-4 pb-0 pt-4': open },
						)}
					>
						
						<div className="self-center text-center">
							<p
								className={cn(
									'text-xl text-primary font-serif origin-left duration-200 truncate',
									{
										hidden: !open,
									},
								)}
							></p>
							<p className="text-4xl font-serif"></p>
						</div>
					</div>
				</div>

				<ScrollArea
					type="auto"
					className={cn('h-[inherit] mt-2 overflow-x-hidden overflow-y-auto', {
						'pl-3': open,
					})}
				>
					<p
						className={cn('text-[18px] text-center font-bold uppercase mb-[10px]', {
							'text-[12px]': !open,
						})}
					>
						OPTIONS
					</p>
					<div className="divider my-2 mx-0"></div>
					<div id="nav" className={cn('', { 'mr-4': open })}>
						<div id="menu" className="mx-0.5">
							<ul className="menu bg-base-100 rounded-xl max-w-xs w-full p-0 gap-y-2">
								{linksMenu.map((item, index) => {
									if (item?.submenu && open) {
										return (
											<li key={item.key}>
												<details open>
													<summary className="capitalize text-[20px] font-bold pl-2 ">
														<NavLink
															to={item.to}
															className="flex flex-row gap-x-4"
														>
															{item.icon}
															<span
																className={`${
																	!open && 'hidden'
																} pr-4 origin-left duration-200 text-sm`}
															>
																{item.label}
															</span>
														</NavLink>
													</summary>

													<ul
														className={`${
															!open && 'hidden'
														} space-y-2 mt-2 origin-left duration-200`}
													>
														{item?.submenu.map((subitem) => {
															return (
																<div key={subitem.key}>
																	<NavLink
																		to={subitem.to}
																		className={`flex p-0 w-full rounded-xl`}
																		onClick={closeSidebar}
																	>
																		{({ isActive }) => (
																			<RippleContainer isActive={isActive}>
																				{subitem.icon}
																				<span className="pl-2 truncate">
																					{subitem.label}
																				</span>
																			</RippleContainer>
																		)}
																	</NavLink>
																</div>
															);
														})}
													</ul>
												</details>
											</li>
										);
									} else {
										if (item?.submenu) {
											return (
												<ItemDropdownMenu
													key={item.key}
													item={item}
													index={index}
													closeSidebar={closeSidebar}
													open={open}
												/>
											);
										} else {
											return (
												<Item
													key={item.key}
													item={item}
													closeSidebar={closeSidebar}
													open={open}
												/>
											);
										}
									}
								})}
							</ul>
							<div className="bottom-[-3px] bg-base-100 pointer-events-none flex sticky h-7 [mask-image:linear-gradient(transparent,#000000)]"></div>
						</div>
					</div>
				</ScrollArea>
			</div>
		</section>
	);
};
