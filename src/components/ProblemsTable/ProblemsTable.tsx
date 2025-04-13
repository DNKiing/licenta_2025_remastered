import { firestore } from '@/firebase/firebase';
import { DBProblem } from '@/utils/types/problem';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';

type ProblemsTableProps = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({setLoadingProblems}) => {
  const problems=useGetProblems(setLoadingProblems)
    return (
    <tbody className="text-white">
      {problems.map((problem, idx) => {
        const difficulyColor =
          problem.difficulty === 'Easy'
            ? 'text-green-500'
            : problem.difficulty === 'Medium'
            ? 'text-yellow-500'
            : 'text-red-500';

        return (
          <tr className={`${idx % 2 === 0 ? 'bg-gray-800' : ''}`} key={problem.id}>
            <th className="px-2 py-4 font-medium whitespace-nowrap text-green-800">
              <BsCheckCircle fontSize={'10'} width="10" />
            </th>
            <td className="px-6 py-4">
               (
                <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${problem.id}`}
                >
                  {problem.title}
                </Link>
              )
            </td>
            <td className={`px-6 py-4 ${difficulyColor}`}>{problem.difficulty}</td>
            <td className="px-6 py-4">{problem.category}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProblemsTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
	const [problems, setProblems] = useState<DBProblem[]>([]);
	useEffect(() => {
		const getProblems = async () => {
			// fetching data logic
			setLoadingProblems(true);
			const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
			const querySnapshot = await getDocs(q);
			const tmp:DBProblem[] = [];
			querySnapshot.forEach((doc) => {
				tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
			});
			setProblems(tmp);
			setLoadingProblems(false);
		};

		getProblems();
	}, [setLoadingProblems]);
	return problems;
}
