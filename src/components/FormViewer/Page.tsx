import React, { useRef,useEffect } from 'react';
import { FormElement } from '../../Model/FormViewerModel'; 
import Element from './Element';

interface PageProps {
    title: string;
    elements: FormElement[];
}

const Page: React.FC<PageProps> = ({ title, elements  }) => {
   
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
        <div className="rounded-lg p-5 bg-gray-100 shadow-md mx-4 sm:mx-8 lg:mx-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
