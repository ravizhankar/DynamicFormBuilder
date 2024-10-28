// FormViewer.tsx
import React, { useState ,useEffect} from 'react';
import DataFromJson from '../../Data.json'
import TabsAndNavigation from '../../components/FormViewer/TabsAndNavigation'; // Import the TabsAndNavigation component
import { FormProvider } from '../../Store/FormViewerContext';
import { FormPayload } from '../../Model/FormViewerModel';

//localStorage.setItem('JSONData',JSON.stringify(DataFromJson))
//alert("viewer");
const formDataString = localStorage.getItem('JSONData');
let formData: FormPayload | null = null;
if (formDataString) {
  formData = JSON.parse(formDataString) as FormPayload;
}
const FormViewer: React.FC = () => {
  
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0); // State to track the current section

  if (formData) {
    const currentPage = formData.pages[currentPageIndex]; // Get the current section data

  }
  // Handle Page change by updating the indexF
  const handlePageChange = (index: number) => {
    setCurrentPageIndex(index);
  };

  // Calculate whether previous or next buttons should be disabled
  const disablePrevious = currentPageIndex === 0;
  // Use optional chaining to safely access pages.length
  const disableNext = formData?.pages && currentPageIndex === formData.pages.length - 1;

  return (
    <FormProvider>
      <div>
        {formData ? (
          <>
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
              {formData.title}
            </h1>

            <TabsAndNavigation
              Pages={formData.pages} // Safely use pages if formData is not null
              currentPageIndex={currentPageIndex}
              onPageChange={handlePageChange} // Now expects index-based navigation
              disablePrevious={disablePrevious}
              disableNext={disableNext}
            />
          </>
        ) : (
          <p>Loading...</p> // Handle case when formData is null
        )}
      </div>

    </FormProvider>
  );
};

export default FormViewer;
