
import ProblemsTable from '@/components/ProblemsTable/ProblemsTable'
import Topbar from '@/components/Topbar/Topbar'
// import { firestore } from '@/firebase/firebase'
// import { doc, setDoc } from 'firebase/firestore'
import { Inter } from 'next/font/google'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
//     const [inputs, setInputs] = useState({
//         id: '',
//         title: '',
//         difficulty: '',
//         category: '',
//         order: 0
//     })
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// setInputs({
//     ...inputs,
//     [e.target.name]: e.target.value
// })
// }
// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const newProblem={
//         ...inputs,
//         order: Number(inputs.order),
//     }
//     await setDoc(doc(firestore, 'problems', inputs.id),newProblem )
//     alert('Problem added successfully!')
// }
const [loadingProblems, setLoadingProblems] = useState(true)
  return (
    <main className='bg-gray-950 min-h-screen'>
        <Topbar />
        <h1
  className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5'>
    &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
  </h1>

  <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
{loadingProblems && (
    <div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
        {[...Array(5)].map((_, index) => (
            <LoadingSkeleton key={index} />
        ))}

    </div>
)}
  <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
  {!loadingProblems && (
      <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
      <tr>
        <th scope='col' className='px-1 py-3 w-0 font-medium'>
          Status
        </th>
        <th scope='col' className='px-6 py-3 w-0 font-medium'>
          Title
        </th>
        <th scope='col' className='px-6 py-3 w-0 font-medium'>
          Difficulty
        </th>

        <th scope='col' className='px-6 py-3 w-0 font-medium'>
          Category
        </th>

      </tr>
    </thead>
  )}
    <ProblemsTable setLoadingProblems={setLoadingProblems}/>
  </table>
  </div>
  {/* temp form for adding problems to firestore
  <form className='p-6 flex flex-col max-w-sm gap-3 text-white' onSubmit={handleSubmit}>
    <input onChange={handleInputChange} type="text" placeholder='problem id' name='id' />
    <input onChange={handleInputChange} type="text" placeholder='title' name='title' />
    <input onChange={handleInputChange} type="text" placeholder='difficulty' name='difficulty' />
    <input onChange={handleInputChange} type="text" placeholder='category' name='category' />
    <input onChange={handleInputChange} type="text" placeholder='order' name='order' />
    <button >Save to firestore</button>
  </form> */}
</main>
  )
}

const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-gray-600'></div>
			<div className='h-4 sm:w-52  w-32  rounded-full bg-gray-600'></div>
			<div className='h-4 sm:w-52  w-32 rounded-full bg-gray-600'></div>
			<div className='h-4 sm:w-52 w-32 rounded-full bg-gray-600'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};
