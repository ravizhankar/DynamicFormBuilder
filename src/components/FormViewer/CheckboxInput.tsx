import React, { useEffect } from 'react';
import { useFormContext } from '../../Store/FormViewerContext';
import { validateValue } from '../../Utils/validation';
import { FormElement } from '../../Model/FormViewerModel';
import ToolTip from './ToolTip';
import { InformationCircleIcon } from '@heroicons/react/solid'; // Import the icon


const CheckboxInput: React.FC<FormElement> = (forelementobj) => {
    const { values, setValue, errors, setError, setFieldProperties } = useFormContext();
     //forelementobj.alignment=="Vertical";

    // Set field properties on component mount
    useEffect(() => {
        setFieldProperties(forelementobj.id, forelementobj);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const currentValues = values[forelementobj.id] as string[]; // Ensure we treat it as a string array
        let newValues: string[] = currentValues ? [...currentValues] : []; // Get current values or initialize an empty array

        if (checked) {
            // Add the value if checked
            newValues.push(value);
        } else {
            // Remove the value if unchecked
            newValues = newValues.filter((v) => v !== value);
        }

        // Validate the new values
        const error = validateValue(newValues.join(','), forelementobj); // If validateValue expects a string
        setValue(forelementobj.id, newValues); // Update the value in the form context
        setError(forelementobj.id, error); // Set error if validation fails
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
        >                     {forelementobj.options?.map((option) => (
                    <div key={option.value} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`${forelementobj.id}-${option.value}`}
                            value={option.value}
                            onChange={handleChange}
                            checked={Array.isArray(values[forelementobj.id]) && values[forelementobj.id].includes(option.value)} // Check if the option is selected                        onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor={`${forelementobj.id}-${option.value}`} className="text-sm text-gray-700">
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

export default CheckboxInput;
