import React, { useEffect } from 'react';
import { useFormContext } from '../../Store/FormViewerContext';
import { validateValue } from '../../Utils/validation';
import { FormElement } from '../../Model/FormViewerModel';
import ToolTip from './ToolTip';
import { InformationCircleIcon } from '@heroicons/react/solid'; // Import the icon

const TextAreaInput: React.FC<FormElement> = (formelementobj) => {
    const { values, errors, setValue, setError, setFieldProperties } = useFormContext();
    const value = values[formelementobj.id] || ''; // Ensure value is a string
    const errorMessage = errors[formelementobj.id];

    // Set field properties on mount
    useEffect(() => {
        setFieldProperties(formelementobj.id, formelementobj);
    }, []);

    // Handler for textarea change
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target?.value ?? ''; // Ensure newValue is not null
        setValue(formelementobj.id, newValue); // Update value in context

        // Validate the new value
        const error = validateValue(newValue, formelementobj);
        setError(formelementobj.id, error); // Set error in context
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

            <textarea
                id={formelementobj.id}
                value={value}
                onChange={handleChange}
                required={formelementobj.required}
                placeholder={formelementobj.placeHolder}
                className={`p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                transition duration-200 ease-in-out resize-none ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
               rows={formelementobj.rows} // Default to 4 rows if not provided
               
            />

            {errorMessage && (
                <span className="text-red-600 text-sm mt-1">{errorMessage}</span>
            )}
        </div>
    );
};

export default TextAreaInput;
