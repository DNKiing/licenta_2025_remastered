import React from 'react';

type EditorFooterProps = {
handleSubmit: () => void;
};

const EditorFooter:React.FC<EditorFooterProps> = ({handleSubmit}) => {

    return <div className='flex bg-gray-900 absolute bottom-0 z-10 w-full'>
	<div className='mx-5 my-[10px] flex justify-between w-full'>
		<div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
		</div>
		<div className='ml-auto flex items-center space-x-4'>
			<button className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-green-700 hover:bg-green-600 rounded-lg' onClick={handleSubmit}>
				Run
			</button>
		</div>
	</div>
</div>;
}
export default EditorFooter;
