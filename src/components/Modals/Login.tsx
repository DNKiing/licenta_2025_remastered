import { authModalState } from '@/atoms/authModalAtom';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
type LoginProps = {

};

const Login:React.FC<LoginProps> = () => {
const setAuthModalState = useSetRecoilState(authModalState);
const handleClick = (type:"login"|"register"|"forgotPassword") => {
setAuthModalState((prev) => ({ ...prev, type}));
}
const [inputs,useInputs]=useState({
    email: "", password:""})
const [
  signInWithEmailAndPassword,
  user,
  loading,
  error,
] = useSignInWithEmailAndPassword(auth);
const router= useRouter();

const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    useInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}
const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!inputs.email || !inputs.password) return alert("Please fill all fields!");
    try {
        const newUser= await signInWithEmailAndPassword(inputs.email, inputs.password)
        if(!newUser) return;
        router.push("/");
    } catch (error:any) {
        console.log(error.message);

    }
}
useEffect(() => {
 if(error)toast.error(error.message,{position:'top-center',autoClose:3000,theme:'dark'});

}, [error])

    return <form className='space-y-6 px-6 pb-4' onSubmit={handleLogin}>
            <h3 className='text-xl font-medium text-white'>Sign in to our platform</h3>
            <div>
                <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300 '>Your Email</label>
                <input type="email"
                onChange={handleInputChange}
                 name='email'
                 id='email'
                 className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placholder-gray-400 text-white' placeholder='name@company.com'/>
            </div>
              <div>
                <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300 '>Your Password</label>
                <input type="password"
                     onChange={handleInputChange}
                 name="password"
                 id="password"
                 className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placholder-gray-400 text-white' placeholder='******'/>
            </div>
            <button type='submit' className='w-full text-white bg-gradient-to-b from-orange-400 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>{loading ? "Loading..." : "Log In"}
            </button>
            <button className='flex w-full justify-end'>
                <a href="#" className='text-sm block text-orange-400 hover:underline w-full text-right ' onClick={()=> handleClick("forgotPassword")}>
                    Forgot Password?
                </a>
            </button>
            <div className='text-sm font-medium text-gray-500 ' >Not Registered? {/**/}
                <a href="#" className='text-blue-700 hover:underline'  onClick={()=> handleClick("register")}>Create account</a>
            </div>
    </form>
}
export default Login;
