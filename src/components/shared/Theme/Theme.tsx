import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { FC } from 'react';
import { BsPalette2 } from 'react-icons/bs';

const themes = [
	{ theme: 'light' },
	{ theme: 'winter' },
	{ theme: 'dark' },
	{ theme: 'night' },
];

interface Props {
	align?: 'center' | 'start' | 'end' | undefined;
}

const Theme: FC<Props> = ({ align = 'center' }) => {

	return (
		<div>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<div
						role="button"
						className="px-2 lg:px-4 btn btn-ghost max-sm:btn-square"
					>
						<div className="hidden md:contents">
							Theme
							<svg
								width="12px"
								height="12px"
								className="h-2 w-2 fill-current opacity-60 inline-block"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 2048 2048"
							>
								<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
							</svg>
						</div>
						<BsPalette2 className="md:hidden" size={20} />
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align={align}
					className="h-auto max-h-[calc(100vh-10rem)] overflow-y-auto w-auto"
				>
					{themes.map((theme) => (
						<DropdownMenuItem key={theme.theme}>
							<button
								className=" outline-base-content text-start outline-offset-4 w-full"
								data-set-theme={theme.theme}
								data-key="theme"
								onClick={() => {
									localStorage.setItem('theme', theme.theme || 'light');
									document
										.querySelector('html')
										?.setAttribute('data-theme', theme.theme);
								}}
							>
								<span
									data-theme={theme.theme}
									className="bg-base-100 ring-1 ring-base-content/15 rounded-btn text-base-content block w-full cursor-pointer font-sans"
								>
									<span className="grid grid-cols-5 grid-rows-3">
										<span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="invisible h-3 w-3 shrink-0"
											>
												<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
											</svg>
											<span className="flex-grow text-sm">{theme.theme}</span>
											<span className="flex h-full shrink-0 flex-wrap gap-1">
												<span className="bg-primary rounded-badge w-2"></span>
												<span className="bg-secondary rounded-badge w-2"></span>
												<span className="bg-accent rounded-badge w-2"></span>
												<span className="bg-neutral rounded-badge w-2"></span>
											</span>
										</span>
									</span>
								</span>
							</button>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

Theme.displayName = 'Theme';

export { Theme };
