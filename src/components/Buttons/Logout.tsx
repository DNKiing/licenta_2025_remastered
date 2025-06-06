import React from 'react';
import { FiLogOut } from "react-icons/fi";
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
type LogoutProps = {

};

const Logout:React.FC<LogoutProps> = () => {
const [signOut, loading, error] = useSignOut(auth);
const handleLogout = () => {
signOut()
}
    return <button className='bg-gray-700 py-1.5 px-3 cursor-pointer rounded text-orange-400' onClick={handleLogout}>
       <FiLogOut />
    </button>
}
export default Logout;
