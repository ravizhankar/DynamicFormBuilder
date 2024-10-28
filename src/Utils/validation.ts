import { FormElement } from '../Model/FormViewerModel';

export const validateValue = (
    value: string | string[], 
    formElementObj: FormElement
): string | null => {
    
    // Convert to an array if value isn't already one
    const valuesArray = Array.isArray(value) ? value : [value]; 

    // Required field validation
    if (formElementObj.required && valuesArray.every(v => !v)) {
        return 'This field is required.';
    }

    // Iterate through each value to apply validations
    for (const val of valuesArray) {
        if (!val && !formElementObj.required) continue; // Skip validation for non-required empty values

        // MinLength and MaxLength for non-select/radio inputs
        if (formElementObj.type !== 'select' && formElementObj.type !== 'radio') {
            if (formElementObj.required && formElementObj.minLength && val.length < formElementObj.minLength) {
                return `Minimum length is ${formElementObj.minLength} characters.`;
            }
            if (formElementObj.maxLength && val.length > formElementObj.maxLength) {
                return `Maximum length is ${formElementObj.maxLength} characters.`;
            }
        }

        // Word count validation for text areas
        if (formElementObj.type === 'textarea') {
            const wordCount = val.trim().split(/\s+/).length;
            if (formElementObj.minWords && wordCount < formElementObj.minWords) {
                return `Minimum ${formElementObj.minWords} words required.`;
            }
            if (formElementObj.maxWords && wordCount > formElementObj.maxWords) {
                return `Maximum ${formElementObj.maxWords} words allowed.`;
            }
        }

        // Pattern validations
        if (val && formElementObj.pattern) {
            switch (formElementObj.pattern) {
                case 'ALPHABETS':
                    if (!/^[A-Za-z]+$/.test(val)) return 'Only alphabets are allowed.';
                    break;
                case 'ALPHANUMERIC':
                    if (!/^[A-Za-z0-9]+$/.test(val)) return 'Only alphabets and numbers are allowed.';
                    break;
                case 'NUMERIC':
                    if (!/^\d+$/.test(val)) return 'Only numbers are allowed.';
                    break;
                case 'AADHAR':
                    if (!/^\d{4}\s\d{4}\s\d{4}$/.test(val)) return 'Invalid Aadhar format.';
                    break;
                case 'EMAIL':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Invalid email format.';
                    break;
                case 'PHONENUMBER':
                    if (!/^\d{10}$/.test(val)) return 'Invalid phone number format.';
                    break;
                case 'TEXT':
                    const allowedChars = formElementObj.allowedSplChars || '';
                    const disallowedChars = formElementObj.notAllowedSplChars || '';

                    const allowedPattern = new RegExp(`^[A-Za-z0-9${allowedChars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]*$`);
                    const disallowedPattern = new RegExp(`[${disallowedChars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`);

                    if (!allowedPattern.test(val)) {
                        return `Only alphabets, numbers, and the following characters are allowed: ${allowedChars}`;
                    }
                    if (disallowedPattern.test(val)) {
                        return `The following characters are not allowed: ${disallowedChars}`;
                    }
                    break;
                    case 'NONE':
                        break;
                default:
                    return 'Pattern not recognized.';
            }
        }
    }

    return null; // No validation errors
};
