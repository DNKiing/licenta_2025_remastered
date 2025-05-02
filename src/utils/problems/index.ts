import { Problem } from "../types/problem";
import { findMax } from "./find-maximum-element";
import { longestSubarraySum } from "./longest-subarray-sum";
import { removeDuplicates } from "./remove-duplicates";

import { reverseArray } from "./reverse-array";
import { rotateArray } from "./rotate-array";


interface ProblemMap {
	[key: string]: Problem;
}

export const problems: ProblemMap = {
    "reverse-array": reverseArray,
    "find-maximum-element": findMax,
    "remove-duplicates": removeDuplicates,
    "rotate-array": rotateArray,
    "longest-subarray-sum": longestSubarraySum,
};
