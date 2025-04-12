import React from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';


type PlaygroundProps = {

};

const Playground:React.FC<PlaygroundProps> = () => {

    return (
    <div className='flex flex-col bg-gray-800 relative'>
    <PreferenceNav />
    <Split className='h-[calc(100vh-94px)]'
        direction='vertical'
        sizes={[60, 40]}
        minSize={60}>
            <div className='w-full overflow-auto'>
                <CodeMirror value="int a = 5;" extensions={[langs.c()]}  theme={"dark"} style={{fontSize:16}}/>;
            </div>
            <div>Test cases</div>
             </Split>
    </div>
    )
}
export default Playground;
