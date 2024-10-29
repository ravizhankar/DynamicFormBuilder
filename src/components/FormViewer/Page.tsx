import React, { useRef,useEffect } from 'react';
import { FormElement } from '../../Model/FormViewerModel'; 
import Element from './Element';

interface PageProps {
    title: string;
    elements: FormElement[];
    pagegridcolumn:number;
}

const Page: React.FC<PageProps> = ({ title, elements,pagegridcolumn }) => {
   
   useEffect(() => {
    if (elements.length > 0) {
      const firstElement = elements[0];
      const id = firstElement.id;
      // Check if the first element is not of type 'headertext'
      if (firstElement.type !== 'headertext') {
        const fieldElement = document.getElementById(id);
        if (fieldElement) {
          fieldElement.focus(); // Focus the first input element
        }
      }
    }
  }, [elements]);
   

    return (
        <div className="rounded-lg p-5 bg-white-100 shadow-md mx-4 sm:mx-8 lg:mx-12">
       <div
    className={`grid gap-3 ${
        pagegridcolumn === 1 
            ? 'grid-cols-1' 
            : pagegridcolumn === 2 
            ? 'grid-cols-2' 
            : 'grid-cols-3'
    }`}
>
            {elements.length > 0 ? (
                elements.map((element) => (
                    <Element
                        key={element.id}
                        element={element}
                    />
                ))
            ) : (
                <div className="col-span-3 text-center text-gray-500">
                    <p className="text-lg italic">No elements available on this page</p>
                </div>
            )}
        </div>
    </div>
    
    
    
    );
};

export default Page;
