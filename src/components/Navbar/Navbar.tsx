import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};
	return (
		<div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
			<Link href='/' className='flex items-center justify-center h-20'>
				{/* <Image src='/logo.png' alt='LeetClone' height={200} width={200} /> */}
                LOGO
			</Link>
			<div className='flex items-center'>
				<button
					className='bg-orange-400 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-orange-400 hover:bg-white hover:border-2 hover:border-orange-400 border-2 border-transparent
                transition duration-300 ease-in-out
                '
					onClick={handleClick}
				>
					Sign In
				</button>
			</div>
		</div>
	);
};
export default Navbar;
