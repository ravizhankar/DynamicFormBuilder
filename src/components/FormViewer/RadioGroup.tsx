import React, { useEffect,useMemo } from 'react';
import { useFormContext } from '../../Store/FormViewerContext';
import { validateValue } from '../../Utils/validation';
import { FormElement } from '../../Model/FormViewerModel';
import ToolTip from './ToolTip';
import { InformationCircleIcon } from '@heroicons/react/solid'; // Import the icon



const RadioGroup: React.FC<FormElement> = (forelementobj) => {
    const { values, setValue, errors, setError,setFieldProperties } = useFormContext();

    // Set field properties on component mount and when `fieldProps` changes
    useEffect(() => {
        setFieldProperties(forelementobj.id, forelementobj);
    }, []);

     

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateValue(newValue, forelementobj);
        setValue(forelementobj.id, newValue); // Update the value in the form context
        setError(forelementobj.id, null); // Clear the error when user makes a selection
    };


    return (
        <div className="flex flex-col mb-4 w-full md:w-1/2">
           <label htmlFor={forelementobj.id} className="flex items-center mb-2 text-sm font-semibold text-gray-800">
                {forelementobj.label}
                {forelementobj.required && <span className="text-red-500 ml-1">*</span>}

                {/* Info Icon with Tooltip */}
                {forelementobj.toolTip && (
                    <ToolTip text={forelementobj.toolTip}>
                        <InformationCircleIcon className="h-5 w-5 text-blue-500 ml-2 cursor-pointer" />
                    </ToolTip>
                )}
            </label>
           
            <div
            className={`flex ${forelementobj.alignment=="HORIZONTAL" ? 'flex-wrap items-center gap-x-3' : 'flex-col items-start gap-y-3'}`}
            >                {forelementobj.options?.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            type="radio"
                            id={`${forelementobj.id}_${option.value}`}
                            name={forelementobj.id}
                            value={String(option.value)} // Convert value to string
                            checked={String(values[forelementobj.id]) === String(option.value)} // Check if the value matches the current selection
                            onChange={handleChange}
                            required={forelementobj.required}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                            htmlFor={`${forelementobj.id}_${option.value}`}
                            className="ml-2 text-sm font-medium text-gray-700"
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            {errors[forelementobj.id] && (
                <span className="text-red-600 text-xs mt-1">{errors[forelementobj.id]}</span>
            )}
        </div>
    );
};

export default RadioGroup;
