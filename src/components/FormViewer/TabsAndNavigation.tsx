import React, { useState } from 'react';
import { FormViewerProps } from '../../Model/FormViewerModel'
import { useFormContext } from '../../Store/FormViewerContext';
import Page from '../../components/FormViewer/Page';
import formPayload from '../../Data.json';
import { FormPayload } from '../../Model/FormViewerModel';



const TabsAndNavigation: React.FC<FormViewerProps> = (
    FormViewerPropsObj
) => {
    const JSONData: FormPayload = formPayload;
    const { values, validateField, errors } = useFormContext();
    const currentPage = FormViewerPropsObj.Pages[FormViewerPropsObj.currentPageIndex];
    //here the model is assigned to jsondata 
    let firstInvalidFieldFocused = false;

    // State to track if the "Thank You" popup should be displayed
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Function to update the JSON data directly
    const updateJsonData = (currentPageIndex: number) => {
        //to make tab color as green setting to true 
        FormViewerPropsObj.Pages[currentPageIndex].isformsubmitted = true;

        // setisformsubmitted(true);
        currentPage.elements.forEach((element) => {

            const id = element.id;
            const value = values[id] || ''; // Get the value from the form context


            // Assuming `Pages` is your JSON data structure
            const elementToUpdate = FormViewerPropsObj.Pages[currentPageIndex].elements.find((el: any) => el.id === id);
            if (elementToUpdate) {
                // Check if value is an array
                if (Array.isArray(value)) {
                    // You can choose how to handle this; here we join the array into a comma-separated string
                    elementToUpdate.value = value.join(','); // Convert array to string (optional)
                } else {
                    elementToUpdate.value = value; // Assign directly if it's a string
                }
                JSONData.pages = FormViewerPropsObj.Pages; // Re-assign updated Pages array to formPayload.pages
            }
        });
    };

    const validateForm = () => {
        let isValid = true;
        currentPage.elements.forEach((element) => {
            const id = element.id;
            const isFieldValid = validateField(id);
            if (!isFieldValid && !firstInvalidFieldFocused) {
                const fieldElement = document.getElementById(id);
                if (fieldElement) {
                    fieldElement.focus(); // Focus the input element
                    firstInvalidFieldFocused = true; // Mark that we've focused on the first invalid field
                }
                isValid = false; // Set overall validity to false
            }
        });
        return isValid;
    };

    const handlePrevious = () => {
        if (!FormViewerPropsObj.disablePrevious && FormViewerPropsObj.onPageChange) {
            FormViewerPropsObj.onPageChange(FormViewerPropsObj.currentPageIndex - 1);
        }
    };



    const handleNext = () => {
        if (validateForm()) {
            updateJsonData(FormViewerPropsObj.currentPageIndex); // Call the update function
            if (isLastPage()) {
                handleSubmit(); // Call submit logic when it's the last page
            } else if (FormViewerPropsObj.onPageChange) {
                FormViewerPropsObj.onPageChange(FormViewerPropsObj.currentPageIndex + 1);

            }
        }
    };

    const handleTabClick = (index: number) => {
        if (FormViewerPropsObj.onPageChange) {
            FormViewerPropsObj.onPageChange(index);

        }
    }


    const handleSubmit = () => {
        //console.log('Form submitted!');
        setIsSubmitted(true); // Show the "Thank you" message
    };

    const isLastPage = () => {
        return FormViewerPropsObj.currentPageIndex === FormViewerPropsObj.Pages.length - 1;
    };


    return (
        <div>
            {FormViewerPropsObj.Pages && FormViewerPropsObj.Pages.length > 0 && (
                <div className="tab-container mb-6">
                    <div className="flex space-x-4">
                        {FormViewerPropsObj.Pages.map((Page, index) => (
                            <h2
                                key={index}
                                className={`cursor-pointer rounded-lg px-4 py-2 text-center transition duration-300 ease-in-out shadow-lg ${Page.isformsubmitted
                                    ? 'bg-green-600 text-white shadow-xl'
                                    : index === FormViewerPropsObj.currentPageIndex
                                        ? 'bg-customBlue text-white shadow-xl'
                                        : 'bg-customgrey text-white'
                                    }`}
                                onClick={() => {
                                    if (Page.isformsubmitted || index === FormViewerPropsObj.currentPageIndex) {
                                        handleTabClick(index); // Correctly call the function here
                                    } else {
                                       // console.log('Page not clickable'); // Optional feedback
                                    }
                                }}

                            >
                                {Page.title}
                            </h2>
                        ))}
                    </div>
                </div>
            )}


            {currentPage?.elements?.length > 0 && (
                <Page title={currentPage.title} elements={currentPage.elements} />
            )}
            <br/>
            {currentPage?.elements?.length > 0 && (
                <div className="flex justify-center space-x-4">
                <button
                  className={`px-6 py-2 bg-customBlue text-white rounded hover:bg-customblue focus:outline-none focus:ring ${
                    FormViewerPropsObj.disablePrevious ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  onClick={handlePrevious}
                  disabled={FormViewerPropsObj.disablePrevious}
                >
                  Previous
                </button>
                <button
                  className="px-6 py-2 bg-customBlue text-white rounded hover:bg-customBlue focus:outline-none focus:ring"
                  onClick={handleNext}
                >
                  {isLastPage() ? 'Submit' : 'Next'}
                </button>
              </div>
              
              
            )}

            {/* Display Thank You Popup */}
            {isSubmitted && (
                <div className="thank-you-popup">
                    <div className="popup-content">
                        <h2>Thank You!</h2>
                        <p>Your form has been submitted successfully.</p>

                        {/* Display the JSON data */}
                        <div style={{ position: 'relative' }}>
                            <pre style={{ textAlign: 'left', backgroundColor: '#f8f8f8', padding: '10px', borderRadius: '5px', maxHeight: '300px', overflowY: 'auto' }}>
                                {JSON.stringify(JSONData, null, 2)}
                            </pre>

                            {/* Copy button */}
                            <button
                                onClick={() => navigator.clipboard.writeText(JSON.stringify(JSONData, null, 2))}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                }}
                                title="Copy JSON"
                            >
                                Copy JSON
                            </button>
                        </div>

                        <button onClick={() => setIsSubmitted(false)}>Close</button>
                    </div>
                </div>
            )}



        </div>
    );
};

export default TabsAndNavigation;
