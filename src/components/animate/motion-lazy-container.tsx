import { LazyMotion } from 'framer-motion';

import * as m from 'framer-motion/m';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

const loadFeatures = () => import('./features.ts').then((res) => res.default);

export default function MotionLazyContainer({ children }: Props) {
	return (
		<LazyMotion strict features={loadFeatures}>
			<m.div> {children} </m.div>
		</LazyMotion>
	);
}
