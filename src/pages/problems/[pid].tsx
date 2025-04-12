import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import React from 'react';

type problemPageProps = {

};

const problemPage:React.FC<problemPageProps> = () => {

    return <div>
        <Topbar problemPage/>
        <Workspace />
    </div>
}
export default problemPage;
