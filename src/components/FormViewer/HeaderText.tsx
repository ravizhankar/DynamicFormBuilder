import React, { useEffect } from 'react';
import { FormElement } from '../../Model/FormViewerModel';


const HeaderText: React.FC<FormElement> = (formelementobj) => {

    return (
        <div className="form-element col-start-1 col-span-full">
            <h1 className="text-2xl font-semibold mb-2">{formelementobj.label}</h1>
        </div>
    );
};

export default HeaderText;
