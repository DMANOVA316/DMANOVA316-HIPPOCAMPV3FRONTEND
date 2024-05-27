import React from 'react';
import Mainform from './Mainform';
import Asideform from './Asideform';
import Navform from './Navform';


const Headform = () => {
    return (
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <Navform/>
            <Asideform/> 
          
            <Mainform/>  
      </div>
    );
};

export default Headform;