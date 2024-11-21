import { NavLink } from 'react-router-dom';
import { LinkItem } from '../../data/LinksMenu';
import { cn } from '../../utils/utils';
import { RippleContainer } from './ripple-container';

interface ItemProps {
	item: LinkItem;
	closeSidebar: () => void;
	open: boolean;
}

export const Item = ({ item, closeSidebar, open }: ItemProps) => {
	return (
		<div key={item?.key} className="w-full">
			<NavLink
				to={item.to}
				className={cn('flex w-full rounded-xl p-0 gap-x-4')}
				onClick={closeSidebar}
			>
				{({ isActive }) => (
					<RippleContainer
						isActive={isActive}
						className={cn(
							'flex-col px-2 py-2 text-[20px] rounded-xl font-bold',
							{
								'flex-row': open,
							},
						)}
					>
						{item?.icon}
						<span className={cn({ hidden: open }, 'text-xs capitalize')}>
							{item?.label}
						</span>
						<span
							className={`${
								!open && 'hidden'
							} pl-4 origin-left duration-200 capitalize text-sm text-nowrap`}
						>
							{item?.label}
						</span>
					</RippleContainer>
				)}
			</NavLink>
		</div>
	);
};
