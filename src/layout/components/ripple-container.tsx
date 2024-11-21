import { m } from 'framer-motion';
import React, { useState, type MouseEvent } from 'react';

interface Ripple {
	x: number;
	y: number;
	diameter: number;
	id: number;
}

export const RippleContainer: React.FC<{
	children: React.ReactNode;
	isActive?: boolean;
	onClick?: (event: MouseEvent<HTMLDivElement>) => void;
	className?: string;
}> = ({
	children,
	className = 'px-4 py-2 capitalize font-bold rounded-xl',
	isActive = false,
	onClick,
}) => {
	const [ripples, setRipples] = useState<Ripple[]>([]);

	const createRipple = (event: MouseEvent<HTMLDivElement>) => {
		const container = event.currentTarget;
		const rect = container.getBoundingClientRect();
		const diameter = Math.max(rect.width, rect.height);
		const x = event.clientX - rect.left - diameter / 2;
		const y = event.clientY - rect.top - diameter / 2;
		const id = Date.now();

		setRipples((prevRipples) => [...prevRipples, { x, y, diameter, id }]);

		// Remove the ripple after animation
		setTimeout(() => {
			setRipples((prevRipples) =>
				prevRipples.filter((ripple) => ripple.id !== id),
			);
		}, 500);

		// Call the onClick handler if provided
		if (onClick) {
			onClick(event);
		}
	};

	return (
		<div
			onClick={createRipple}
			className={`relative flex flex-row w-full overflow-hidden ${className} ${
				isActive
					? 'bg-primary/15 text-primary'
					: 'bg-base-100 text-base-content hover:bg-neutral/15'
			} items-center cursor-pointer transition-colors duration-500`}
		>
			{children}
			{ripples.map(({ x, y, diameter, id }) => (
				<m.span
					key={id}
					initial={{ opacity: 0.4, scale: 0 }}
					animate={{ opacity: 0, scale: 2 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className="absolute bg-neutral rounded-xl pointer-events-none brightness-125"
					style={{
						width: diameter,
						height: diameter,
						left: x,
						top: y,
					}}
				/>
			))}
		</div>
	);
};
