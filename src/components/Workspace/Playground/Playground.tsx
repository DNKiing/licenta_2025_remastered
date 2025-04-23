import React, { useEffect, useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split';
import { langs } from '@uiw/codemirror-extensions-langs';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { problems } from '@/utils/problems';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

type PlaygroundProps = {
  problem: Problem;
  setSuccess:React.Dispatch<React.SetStateAction<boolean>>;
  setSolved:React.Dispatch<React.SetStateAction<boolean>>;
};

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess,setSolved }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [CodeMirror, setCodeMirror] = useState<any>(null);
  let[userCode, setUserCode] = useState<string>(problem.starterCode);
  const[user]=useAuthState(auth)
  const {query:{pid}}=useRouter()

const handleSubmit = async () => {
  if (!user) {
    toast.error("Please login to submit your solution", {
      autoClose: 3000,
      position: "top-center",
      theme: "dark",
    });
    return;
  }

  try {
    const response = await fetch("/api/compile-c", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: userCode }),
    });

    const result = await response.json();

    if (result.success) {
      toast.success(`Output:\n${result.output}`, {
        autoClose: 5000,
        position: "top-center",
        theme: "dark",
      });
    } else {
      toast.error(`Error:\n${result.error}`, {
        autoClose: 5000,
        position: "top-center",
        theme: "dark",
      });
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!", {
      autoClose: 3000,
      position: "top-center",
      theme: "dark",
    });
  }
};
const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  }
useEffect(() => {
const code=localStorage.getItem(`code-${pid}`)
if(user){
    setUserCode(code ? JSON.parse(code) : problem.starterCode)
}else{
    setUserCode(problem.starterCode)
}

}, [pid,user, problem.starterCode])

  useEffect(() => {
    import('@uiw/react-codemirror').then((mod) => setCodeMirror(() => mod.default));
  }, []);

  return (
    <div className='flex flex-col bg-gray-800 relative h-screen'>
      <PreferenceNav />

      {CodeMirror && (
        <Split
          className='flex flex-col h-full'
          direction='vertical'
          sizes={[70, 30]}
          minSize={100}
          gutterSize={10}
        >
          <div className="w-full h-full">
            <CodeMirror
              value={userCode}
              onChange={onChange}
              extensions={[langs.c()]}
              theme="dark"
              style={{ fontSize: 16, height: '100%' }}
            />
          </div>
          <div className="w-full px-5 overflow-auto">
            <div className='flex h-6 items-center space-x-6'>
              <div className='relative flex h-full flex-row justify-center cursor-pointer'>
                <div className='text-sm font-medium leading-5 text-white '>Test Cases</div>
                <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
              </div>
            </div>
            <div className='flex'>
              {problem.examples.map((example, index) => (
                <div
                  className="mr-2 items-start mt-2 text-white"
                  key={example.id}
                  onClick={() => setActiveTestCaseId(index)}
                >
                  <div className="flex flex-wrap items-center gap-y-4">
                    <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-gray-900 hover:bg-gray-700 relative rounded-full px-4 py-1 cursor-pointer ${activeTestCaseId === index ? 'bg-green-700' : ''}`}>
                      Case {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='font-semibold my-4'>
              <p className='text-sm font-medium mt-4 text-white'>Input:</p>
              <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                {problem.examples[activeTestCaseId].inputText}
              </div>
            </div>

            <p className='text-sm font-medium mt-4 text-white'>Output:</p>
            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </Split>
      )}
      <EditorFooter handleSubmit={handleSubmit}/>
    </div>
  );
};

export default Playground;
