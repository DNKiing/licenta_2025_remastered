import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import React from 'react';
import { problems } from "@/utils/problems/";
import { Problem } from '@/utils/types/problem';
type problemPageProps = {
problem:Problem
};

const problemPage:React.FC<problemPageProps> = ({problem}) => {

    return <div>
        <Topbar problemPage/>
        <Workspace problem={problem}/>
    </div>
}
export default problemPage;
export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));

	return {
		paths,
		fallback: false,
	};
}

// getStaticProps => it fetch the data

export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const problem = problems[pid];

	if (!problem) {
		return {
			notFound: true,
		};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
	return {
		props: {
			problem,
		},
	};
}
