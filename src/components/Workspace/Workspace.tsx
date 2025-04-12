import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import { Play } from 'next/font/google';
import Playground from './Playground/Playground';

type WorkspaceProps = {

};

const Workspace:React.FC<WorkspaceProps> = () => {

    return <Split className='split' minSize={0}>
        <ProblemDescription />
        <Playground/>
    </Split>
}
export default Workspace;
