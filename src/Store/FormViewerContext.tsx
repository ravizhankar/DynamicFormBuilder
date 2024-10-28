import React, { createContext, useContext, useState, ReactNode } from 'react';
import data from '../Data.json'; // Import JSON data containing initial form values
import { validateValue } from '../Utils/validation'; // Import a utility function for validating form values
import { FormElement } from '../Model/FormViewerModel';

// Interface defining the structure of the FormContext
interface FormContextType {
    values: Record<string, string | string[]>; // Object holding current values of the form fields
    errors: Record<string, string | null>; // Object holding error messages for the form fields
    setValue: (id: string, value: string | string[]) => void; // Function to set the value of a field as either a string or an array of strings
    setError: (id: string, error: string | null) => void; // Function to set the error message for a field
    validateField: (id: string) => boolean; // Function to validate a specific field and return a boolean
    setFieldProperties: (id: string, properties: FormElement) => void; // Function to set properties for a field
    getFieldProps: (id: string) => FormElement; // Function to retrieve properties for a field
}

// Create a context for the form with an initial value of undefined
const FormContext = createContext<FormContextType | undefined>(undefined);

// FormProvider component to wrap around parts of the application needing access to the form context
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize the form values from the JSON data
    const initialValues = data.pages.reduce((acc, page) => {
    
        page.elements.forEach(element => {
            if (element.value) {
                if (Array.isArray(element.value)) {
                    // If the value is already an array, assign it directly
                    acc[element.id] = element.value;
                } else if (typeof element.value === 'string' && element.value.includes(',')) {
                    // If the value is a string with commas, split it into an array
                    acc[element.id] = element.value.split(',').map(item => item.trim());
                } else {
                    // Otherwise, assign the string or other value directly
                    acc[element.id] = element.value;
                }
            }
        });
        return acc; // Return the accumulated values
    }, {} as Record<string, string | string[]>);

    // State to manage current values of the form fields
    const [values, setValues] = useState<Record<string, string | string[]>>(initialValues);
    // State to manage error messages for the form fields
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    // State to manage field properties (like required, minLength, etc.)
    const [fieldProps, setFieldProps] = useState<Record<string, FormElement>>({});

    // Function to update the value of a specific field
    const setValue = (id: string, value: string | string[]) => {
        setValues(prev => ({ ...prev, [id]: value })); // Update the state with the new value
    };

    // Function to update the error message for a specific field
    const setError = (id: string, error: string | null) => {
        setErrors(prev => ({ ...prev, [id]: error })); // Update the state with the new error message
    };

    // Function to get the properties of a specific field
    const getFieldProps = (id: string): FormElement => {
        return fieldProps[id] || { required: false }; // Return the properties or default to { required: false }
    };

    // Function to set properties for a specific field
    const setFieldProperties = (id: string, props: FormElement) => {
        setFieldProps(prev => ({ ...prev, [id]: props })); // Update the state with the new field properties
    };

    // Function to validate a specific field
    const validateField = (id: string): boolean => {
        const value = values[id] || ''; // Get the current value for the field or default to an empty string
        const props = getFieldProps(id); // Retrieve the field properties
        const error = validateValue(value, props); // Validate the value using the validation utility function
        setError(id, error); // Set the error message in the state
        return error === null; // Return true if there's no error, false otherwise
    };

    // Return the context provider with the state and functions available to child components
    return (
        <FormContext.Provider value={{ values, errors, setValue, setError, validateField, setFieldProperties, getFieldProps }}>
            {children}
        </FormContext.Provider>
    );
};

// Custom hook to access the form context
export const useFormContext = () => {
    const context = useContext(FormContext); // Get the context value
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider'); // Throw error if used outside of provider
    }
    return context; // Return the context value
};
