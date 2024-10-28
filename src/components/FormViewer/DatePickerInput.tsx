import React, { useEffect } from 'react';
import { useFormContext } from '../../Store/FormViewerContext';
import { FormElement } from '../../Model/FormViewerModel';

const DateInput: React.FC<FormElement> = (formelementobj) => {
    const { values, setValue, setError, setFieldProperties, errors } = useFormContext();
    const value = values[formelementobj.id] || '';
    const errorMessage = errors[formelementobj.id];

    // Set field properties on component mount
    useEffect(() => {
        setFieldProperties(formelementobj.id, formelementobj);
    }, []);

    // Handle input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(formelementobj.id, newValue);

        // Example: Basic validation for required field
        if (formelementobj.required && !newValue) {
            setError(formelementobj.id, 'This field is required.');
        } else {
            setError(formelementobj.id, '');
        }
    };

    // Prevent manual entry
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
    };

    return (
        <div className="flex flex-col mb-6 w-full md:w-2/3">
            <label htmlFor={formelementobj.id} className="mb-2 text-sm font-semibold text-gray-800">
                {formelementobj.label}
                {formelementobj.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
                type="date"
                id={formelementobj.id}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown} // Prevent manual entry
                required={formelementobj.required}
                min={formelementobj.minDate || ''}
                max={formelementobj.maxDate || ''}
                placeholder={formelementobj.placeHolder}
                className={`p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                transition duration-200 ease-in-out ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
            />

            {errorMessage && (
                <span className="text-red-600 text-sm mt-1">{errorMessage}</span>
            )}
        </div>
    );
};

export default DateInput;
