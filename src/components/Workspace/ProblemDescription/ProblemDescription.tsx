import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem, Problem } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

type ProblemDescriptionProps = {problem:Problem,
    _solved:boolean
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({problem,_solved}) => {
   const { currentProblem, loading, problemDifficultyClass } = useGetCurrentProblem(problem.id);

   const{solved} = useGetUsersDataOnProblem(problem.id);
	return (
		<div className='bg-gray-900'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-gray-900 text-white overflow-x-hidden'>
				<div className={"bg-gray-900 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer w-f"}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto  '>
				<div className='px-5 '>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>{problem.title}</div>
						</div>
					{!loading && currentProblem && (
                        	<div className='flex items-center mt-3'>
							<div
								className={`${problemDifficultyClass}inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
							>
								{currentProblem.difficulty}
							</div>
						{(solved || _solved) && (
                            	<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-500 hover:text-green-400'>
							 <BsCheck2Circle />
							</div>
                        )}

						</div>
                    )}
                    {loading && (
                        <div className="mt-3 flex space-x-2">
                            <RectangleSkeleton />
                            <CircleSkeleton/>
                        </div>
                    )}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
                            <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }}/>
						</div>

						{/* Examples */}
                    <div className='mt-4'>
                    {problem.examples.map((example, index) => (
                    <div key={index}>
                        <p className='font-medium text-white'>Example {index + 1}:</p>
                        {example.img && (
                            <img
                            src={example.img}
                            alt={`Example ${index + 1}`}
                            className='mt-3'/>
                        )}
                        <div className='example-card'>
                        <pre>
                            <strong className='text-white'>Input: </strong> {example.inputText}{" "}
                            <br />
                            <strong>Output:</strong> {example.outputText} <br />
                        {example.explanation && (
                            <>
                            <strong>Explanation:</strong> {example.explanation}
                            </>
                        )}
                        </pre>
                        </div>
                    </div>
                    ))}
						</div>

						{/* Constraints ? ⬇️*/}

					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;

function useGetCurrentProblem(problemId:string){
    const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [problemDifficultyClass,setproblemDifficultyClass] = useState<string>("");

    useEffect(() => {
      const getCurrentProblem = async () => {
        setLoading(true);
        const docRef=doc(firestore, "problems", problemId);
        const docSnap = await getDoc(docRef);
        if(docSnap){
            const problem=docSnap.data();
            setCurrentProblem({id:docSnap.id,...problem} as DBProblem);
            setproblemDifficultyClass(
                problem?.difficulty === "Easy" ? "bg-green-600 text-white" : problem?.difficulty === "Medium" ? "bg-yellow-500 text-white" : "bg-red-500 text-white"
            )
        }
        setLoading(false);
    }
    getCurrentProblem()

    }, [problemId])
    return {currentProblem, loading, problemDifficultyClass};
}

function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({ solved: false });
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const data = userSnap.data();
				const { solvedProblems } = data;
				setData({

					solved: solvedProblems.includes(problemId),
				});
			}
		};

		if (user) getUsersDataOnProblem();
		return () => setData({  solved: false });
	}, [problemId, user]);

	return { ...data, setData };
}
