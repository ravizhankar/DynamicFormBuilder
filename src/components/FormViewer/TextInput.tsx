import React, { useEffect } from 'react';
import { useFormContext } from '../../Store/FormViewerContext';
import { validateValue } from '../../Utils/validation';
import { FormElement } from '../../Model/FormViewerModel';
import InputMask from 'react-input-mask';
import ToolTip from './ToolTip';
import { InformationCircleIcon } from '@heroicons/react/solid'; // Import the icon

const TextInput: React.FC<FormElement> = (formelementobj) => {
    const { values, errors, setValue, setError, setFieldProperties } = useFormContext();
    const value = values[formelementobj.id] || ''; // Ensure the value is a string for text input
    const errorMessage = errors[formelementobj.id];

    // Set field properties on component mount
    useEffect(() => {
        setFieldProperties(formelementobj.id, formelementobj);
    }, []); // Added dependencies for useEffect

    // Handler for input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target?.value ?? ''; // Ensure newValue is never null
        setValue(formelementobj.id, newValue); // Set the value in the form context

        // Validate using the utility function
        const error = validateValue(newValue, formelementobj); // Validate the new value
        setError(formelementobj.id, error); // Set the error message in the context
    };

    const handleAadharChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target?.value ?? ''; // Ensure newValue is never null
        setValue(formelementobj.id, newValue); // Set the value in the form context

        // Validate the new value
        const error = validateValue(newValue, formelementobj); 
        setError(formelementobj.id, error); // Set the error message in the context
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow only numeric keys for NUMERIC or PHONENUMBER patterns
        if (
            (formelementobj.pattern === 'NUMERIC' || formelementobj.pattern === 'PHONENUMBER') &&
            !/^[0-9]$/.test(event.key) &&
            event.key !== 'Backspace' &&
            event.key !== 'Tab'
        ) {
            event.preventDefault();
        }
    };
    return (
        <div className="flex flex-col mb-6 w-full md:w-2/3">
            <label htmlFor={formelementobj.id} className="flex items-center mb-2 text-sm font-semibold text-gray-800">
                {formelementobj.label}
                {formelementobj.required && <span className="text-red-500 ml-1">*</span>}

                {/* Info Icon with Tooltip */}
                {formelementobj.toolTip && (
                    <ToolTip text={formelementobj.toolTip}>
                        <InformationCircleIcon className="h-5 w-5 text-blue-500 ml-2 cursor-pointer" />
                    </ToolTip>
                )}
            </label>

            {formelementobj.pattern === "AADHAR" ? (
                <InputMask
                    mask="9999 9999 9999"
                    value={value || ''}
                    autoComplete="off"
                    onChange={handleAadharChange}
                    required={formelementobj.required}
                    onKeyDown={handleKeyPress}
                    className={`p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                    transition duration-200 ease-in-out ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
                    id={formelementobj.id}
                />
            ) : (
                <input
                    type="text"
                    id={formelementobj.id}
                    value={value}
                    onChange={handleChange}
                    required={formelementobj.required}
                    placeholder={formelementobj.placeHolder}
                    onKeyDown={handleKeyPress}
                    className={`p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                    transition duration-200 ease-in-out ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
                />
            )}

            {errorMessage && (
                <span className="text-red-600 text-sm mt-1">{errorMessage}</span>
            )}
        </div>
    );
};

export default TextInput;
