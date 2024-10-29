import React, { useEffect } from 'react';
import { useFormContext } from '../../Store/FormViewerContext';
import { validateValue } from '../../Utils/validation';
import { FormElement } from '../../Model/FormViewerModel';
import ToolTip from './ToolTip';
import { InformationCircleIcon } from '@heroicons/react/solid';

const SelectInput: React.FC<FormElement> = (forelementobj) => {
    const { values, setValue, errors, setError, setFieldProperties } = useFormContext();

    // Set field properties on component mount
    useEffect(() => {
        setFieldProperties(forelementobj.id, forelementobj);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        const error = validateValue(newValue, forelementobj);
        
        setValue(forelementobj.id, newValue); // Update the value in the form context
        setError(forelementobj.id, null); // Clear the error when the user makes a selection   

        // // Handle dependent elements based on the selected option
        // forelementobj.dependents?.forEach((dependent) => {
        //     const isVisible = isDependentVisible(dependent, newValue);
        //     setFieldProperties(dependent.id, (prevElement: FormElement) => ({
        //         ...prevElement,
        //         visible: isVisible, // Update visibility based on the condition
        //     }));
        // });
    };

    const isDependentVisible = (dependent: any, newValue: string): boolean => {
        return (dependent.condition === newValue && dependent.action === "Show") ||
               (dependent.action === "Hide" && dependent.condition !== newValue);
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

            <select
                id={forelementobj.id}
                value={values[forelementobj.id] || ''} // Controlled input from context
                onChange={handleChange}
                required={forelementobj.required}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="">Select</option>
                {forelementobj.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[forelementobj.id] && (
                <span className="text-red-600 text-xs mt-1">{errors[forelementobj.id]}</span>
            )}
        </div>
    );
};

export default SelectInput;
