type FormElementType = "text" | "number" | "email" | "radio" | "select";

export interface FormOption {
  value?: string;
  label?: string;
}

export interface FormElement {
  id?: string;
  type?: string;
  label?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  value?: string | number;
  options?: FormOption[];
}

export interface FormSection {
  title?: string;
  elements: FormElement[];
}

export interface FormPage {
  title?: string;
  isformsubmitted?: boolean;
  sections: FormSection[];
}

export interface FormData {
  title?: string;
  isformsubmitted?: boolean;
  pages: FormPage[];
}
