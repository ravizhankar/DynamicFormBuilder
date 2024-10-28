// Models/Model.ts
export interface FormPayload {
  title: string;
  isformsubmitted:boolean;
  pages:page[]
}

export interface page {
  title: string;
  isformsubmitted:boolean;
  elements: FormElement[];
}

export interface ElementProps {
  element: FormElement;
}


export interface FormElement {
  id: string;
  type: string;
  label: string;
  required: boolean;
  minLength?: number; // Optional minimum length
  maxLength?: number; // Optional maximum length
  pattern?: string; // Optional regex pattern
  options?: { value: string; label: string }[]; // This is for select, radio, etc.
  value?: string | string[] // Added this line to include the value property
  errorMessages?:[];
  allowedFileTypes?: string[];
  maxSizeInMB?: number; 
  isMultiple?: boolean;  
  maxFiles?:number;
  minFiles?:number;
  alignment?:string;
  allowedSplChars?: string;
  notAllowedSplChars?: string;
  toolTip?:string;
  placeHolder?:string;
  minDate?:string;
  maxDate?:string;
  minWords?:number;
  maxWords?:number;
  rows?:number;

}


export interface Option {
  value: string | number;
  label: string | number;
}


export interface FormViewerProps {
  Pages: page[];
  currentPageIndex: number;
  onPageChange?: (index: number) => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
}


