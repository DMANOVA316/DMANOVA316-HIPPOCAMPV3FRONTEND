import React from 'react';

import Headform from '@/formateurs/components/Headform';
import Navform from '../components/Navform';
import { Outlet, Link} from 'react-router-dom';



const DashboardFormateur = () => {
    return (
        <>
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <main className="p-4 md:ml-64 h-auto pt-10">
                <Outlet/>
            </main>
        </div>


                </>
    );
};

export default DashboardFormateur;