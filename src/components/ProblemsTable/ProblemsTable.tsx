import { problems } from '@/mockProblems/problems';
import Link from 'next/link';
import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  return (
    <tbody className="text-white">
      {problems.map((doc, idx) => {
        const difficulyColor =
          doc.difficulty === 'Easy'
            ? 'text-green-500'
            : doc.difficulty === 'Medium'
            ? 'text-yellow-500'
            : 'text-red-500';

        return (
          <tr className={`${idx % 2 === 0 ? 'bg-gray-800' : ''}`} key={doc.id}>
            <th className="px-2 py-4 font-medium whitespace-nowrap text-green-800">
              <BsCheckCircle fontSize={'10'} width="10" />
            </th>
            <td className="px-6 py-4">
               (
                <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${doc.id}`}
                >
                  {doc.title}
                </Link>
              )
            </td>
            <td className={`px-6 py-4 ${difficulyColor}`}>{doc.difficulty}</td>
            <td className="px-6 py-4">{doc.category}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProblemsTable;
