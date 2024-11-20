import { HTMLMotionProps, m } from 'framer-motion';
import { type FC, ReactNode } from 'react';

let base = 4;
let t = (d: number) => d * base;

interface AnimatedListItemProps extends HTMLMotionProps<'li'> {
	children: ReactNode;
}

export const AnimatedListItem: FC<AnimatedListItemProps> = ({
	children,
	className = 'relative group',
	...rest
}) => {
	return (
		<m.li
			className={className}
			initial={{ height: 0, opacity: 0 }}
			animate={{
				height: 'auto',
				opacity: 1,
				transition: {
					type: 'spring',
					bounce: 0.3,
					opacity: { delay: t(0.025) },
				},
			}}
			exit={{ height: 0, opacity: 0 }}
			transition={{
				duration: t(0.15),
				type: 'spring',
				bounce: 0,
				opacity: { duration: t(0.03) },
			}}
			{...rest}
		>
			{children}
		</m.li>
	);
};
