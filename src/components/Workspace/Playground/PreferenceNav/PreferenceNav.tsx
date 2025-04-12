import React from "react";
import { AiOutlineFullscreen, AiOutlineSetting } from "react-icons/ai";

type PreferenceNavProps = {};

const PreferenceNav: React.FC<PreferenceNavProps> = () => {
	return (
		<div className='flex items-center justify-between bg-gray-800 h-11 w-full'>
			<div className='flex items-center text-white'>
				<button className='flex cursor-pointer items-center rounded focus:outline-none bg-gray-800 text-white hover:bg-gray-900 px-2 py-1.5 font-medium'>
					<div className='flex items-center px-1'>
						<div className='text-xs text-white dark:text-white'>C Language</div>
					</div>
				</button>
			</div>
		</div>

	);
};
export default PreferenceNav;
