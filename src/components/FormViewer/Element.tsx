
import React, { forwardRef, useEffect } from 'react';
import { ElementProps } from '../../Model/FormViewerModel'
import TextInput from './TextInput';
import RadioGroup from './RadioGroup';
import SelectInput from './SelectInput';
import HeaderText from './HeaderText';
import FileInput from './FileInput';
import CheckboxInput from './CheckboxInput';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import DatePickerInput from './DatePickerInput';
import TextAreaInput from './TextAreaInput';

const Element: React.FC<ElementProps> = ({ element }) => {


    const renderElement = () => {
        switch (element.type) {
            case 'text':
                /*  Spread Operator ({...element}): This will pass all the properties in element as props to the component without having to explicitly mention each prop (like id, label, etc.). */
                //  return <TextInput id={element.id} label={element.label} required={element.required} />;
                return <TextInput
                    {...element} // Spread the other properties of the element
                />;
            case 'textarea':
                return <TextAreaInput
                    {...element} // Spread the other properties of the element
                />;
            case 'file':
                return <FileInput {...element} />;
            case 'date':
                return <DatePickerInput {...element} />;
            case 'radio':
                // Only render RadioGroup if options are available
                return element.options ? <RadioGroup  {...element} options={element.options} /> : null;
            case 'select':
                // Ensure select also handles the options correctly
                return element.options ? <SelectInput {...element} options={element.options} /> : null;
            case 'checkbox':
                // Ensure select also handles the options correctly
                return element.options ? <CheckboxInput {...element} options={element.options} /> : null;
            case 'headertext':
                return <HeaderText {...element} />;
            case 'pageheadertext':
                return <PageHeader {...element} />;
            case 'pagefootertext':
                return <PageFooter {...element} />;
            default:
                return null;
        }
    };

    return renderElement();
};

export default Element;
