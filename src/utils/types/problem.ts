export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};

// local problem data
export type Problem = {
	id: string;
	title: string;
	problemStatement: string;
	examples: Example[];
	order: number;
	starterCode: string;
	testCases?: { input: number[]; output: number }[];
	solution?: string;
};

export type DBProblem = {
	id: string;
	title: string;
	category: string;
	difficulty: string;
	order: number;
};
