import assert from 'assert';

import { Problem } from '../types/problem';

// Easy Problem 2
const starterCodeMaxElement = `int findMax(int* arr, int size) {
  // Write your code here
}
int main() {
    // Write your code here
}
`;

export const findMax: Problem = {
	id: 'find-maximum-element',
	title: '2. Find Maximum Element',
	problemStatement: `<p class='mt-3'>
    Write a function to return the maximum element in an array <code>arr</code> of integers.
  </p>`,
	examples: [
		{
			id: 1,
			inputText: 'arr = [3, 1, 4, 1, 5, 9]',
			outputText: '9',
			explanation: '9 is the largest number in the array.',
		},
	],
	starterCode: starterCodeMaxElement,
	order: 2,
};
