import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Logout from '../Buttons/Logout';
import { BsList } from 'react-icons/bs';
import Timer from '../Timer/Timer';
import { problems } from '@/utils/problems';
import { Problem } from '@/utils/types/problem';


type TopbarProps = {
problemPage?: boolean
};

const Topbar:React.FC<TopbarProps> = ({problemPage}) => {
    const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();
	const handleProblemChange= (isForward:boolean) => {
       const {order}= problems[router.query.pid as string]as Problem;
       const direction = isForward ? 1 : -1;
       const nextProblemOrder=order + direction;
       const nextProblemKey= Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);
        if(isForward && !nextProblemKey){
            const firstProblemKey= Object.keys(problems).find((key) => problems[key].order === 1);
            router.push(`/problems/${firstProblemKey}`);
        }else if(!isForward && !nextProblemKey){
            const lastProblemKey= Object.keys(problems).find((key) => problems[key].order === Object.keys(problems).length);
            router.push(`/problems/${lastProblemKey}`);
        }else{
            router.push(`/problems/${nextProblemKey}`);
        }
    }

    return  <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-800 text-gray-300'>
			<div className={`flex w-full items-center justify-between ${problemPage ? 'max-w-[1200px] mx-auto': ""} `}>
				<Link href='/' className='h-[22px] flex-1'>
					{/* <img src='/logo-full.png' alt='Logo' className='h-full' /> */}
                    Logo
				</Link>

                {problemPage && (
                    <div className='flex items-center gap-4 flex-1 justify-center '>
                        <div className='flex items-center justify-center bg-gray-900 hover:bg-gray-800 h-5 w-5 cursor-pointer'>
                            <FaChevronLeft onClick={() => handleProblemChange(false)}/>
                        </div>
                        <Link href="/" className='flex items-center gap-2 font-medium max-w-[170px] text-white cursor-pointer'>
                        <div>
                            <BsList/>
                            </div>
                        <p>ProblemList</p>
                            </Link>
                              <div className='flex items-center justify-center bg-gray-900 hover:bg-gray-800 h-5 w-5 cursor-pointer' onClick={() => handleProblemChange(true)}>

                            <FaChevronRight/>
                        </div>
                    </div>
                )}

				<div className='flex items-center space-x-4 flex-1 justify-end'>
                    {problemPage && (<Timer/>)}
                {!user && (
					<Link href='/auth' onClick={() => setAuthModalState({ isOpen: true, type: 'login' })}>
						<button className='bg-gray-700 py-1 px-2 cursor-pointer rounded '>Sign In</button>
					</Link>
                )}
                {user && (
                    <div className='cursor-pointer group relative'>
                        {/* <img src="profile" alt="user profile image" className='h-8 w-8 rounded-full' /> */}
                        Profile
                        <div
                className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-orange-400 p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0
                transition-all duration-300 ease-in-out'
            >
	            	<p className='text-sm'>{user.email}</p>
	                    </div>
                    </div>
                )}

                {user && <Logout/>}
				</div>
		</div>
</nav>


}
export default Topbar;
