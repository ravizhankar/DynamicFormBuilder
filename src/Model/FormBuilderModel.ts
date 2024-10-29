export interface Option {
  value: string;
  label: string;
}

export interface FormElement {
  id: string;
  type: string;
  label: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  options?: Option[];
  value?: string;
  errorMessages?: Option[];
  alignment?: string;
  toolTip?: string;
  placeHolder?: string;
  disbled: boolean;
  allowedSplChars?: string;
  notAllowedSplChars?: string;
  minDate?: string;
  maxDate?: string;
  isMultiple?: boolean;
  maxFiles?: number;
  minFiles?: number;
  maxSizeInMB?: number;
  allowedFileTypes?: string[];
  rows?: number;
  pagegridcolumn?: number;
}

export interface FormData {
  elements: FormElement[];
}
