import React from 'react';
import { FormElement } from '../../Model/FormViewerModel';

const PageFooter: React.FC<FormElement> = (formelementobj) => {
    
    const htmlContent = Array.isArray(formelementobj.value) 
        ? formelementobj.value.join('') // Handle array case by joining the strings
        : formelementobj.value || ''; // Ensure it’s a string and not undefined

    return (
        <div className="form-element col-span-full  ">
            <span className="text-sm  text-gray-700">
                {formelementobj.label}
            </span>
            <div
                className="text-base text-gray-600 mt-4"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    );
};

export default PageFooter;
