import React, { useEffect, useState, useRef } from 'react';
import { useFormContext } from '../../Store/FormViewerContext';
import { FormElement } from '../../Model/FormViewerModel';
import axios from 'axios';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FileInput: React.FC<FormElement> = (formelementobj) => {
    const { errors, setError, setFieldProperties, setValue } = useFormContext();
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [fileLinks, setFileLinks] = useState<string[]>([]);
    const [progressList, setProgressList] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);

    const progressRef = useRef<number[]>([]);
    const errorMessage = errors[formelementobj.id];

    // Ref for file input
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    interface UploadResponse {
        FileID: number;
        Location: string;
        StatusCode: string;
    }

    useEffect(() => {
        setFieldProperties(formelementobj.id, formelementobj);
    }, []);

    const validateFiles = (newFiles: File[]) => {
        const errors: string[] = [];
        const totalFiles = newFiles.length + fileNames.length;

        const maxFiles = formelementobj.isMultiple ? formelementobj.maxFiles : 1;

        if (formelementobj.isMultiple && maxFiles === 0) {
            errors.push(`The maximum number of files allowed is set to 0`);
            return errors;
        }

        if (!formelementobj.allowedFileTypes || formelementobj.allowedFileTypes.length === 0) {
            errors.push(`No allowed file types are selected.`);
            return errors;
        }

        if (maxFiles && totalFiles > maxFiles) {
            errors.push(`You can upload a maximum of ${maxFiles} ${maxFiles > 1 ? "files" : "file"}.`);
        }

        newFiles.forEach((file) => {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (
                formelementobj.allowedFileTypes &&
                !formelementobj.allowedFileTypes.includes(fileExtension || '')
            ) {
                errors.push(`Invalid file type: ${file.name}.`);
            }
            if (formelementobj.maxSizeInMB && file.size > formelementobj.maxSizeInMB * 1024 * 1024) {
                errors.push(`File ${file.name} exceeds size limit of ${formelementobj.maxSizeInMB} MB.`);
            }
        });

        if (formelementobj.minFiles && totalFiles < formelementobj.minFiles) {
            errors.push(`Please upload at least ${formelementobj.minFiles} files.`);
        }

        return errors;
    };

    const uploadFile = async (file: File, index: number): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);

        try {
            const response = await axios.post<UploadResponse>(
                'https://isarastesting.excelindia.com/PearsonSATCoreAPI/api/v1.0/BaseAPI/UploadFileForMyProfile',
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        if (total) {
                            const percentCompleted = Math.round((loaded * 100) / total);
                            progressRef.current[index] = percentCompleted;
                            setProgressList([...progressRef.current]);
                        }
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            console.error('Error uploading file:', error);
            setError(formelementobj.id, `Error uploading ${file.name}.`);
            return { FileID: 0, Location: '', StatusCode: 'Error' };
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files || []);
        const validationErrors = validateFiles(newFiles);
        
        if (validationErrors.length > 0) {
            setError(formelementobj.id, validationErrors.join(' '));
            return;
        }
        
        setError(formelementobj.id, '');
        const newProgressList = new Array(newFiles.length).fill(0);
        progressRef.current = [...progressRef.current, ...newProgressList];
        setProgressList([...progressRef.current]);
        
        const uploadedLinks: string[] = [];
        for (const [index, file] of newFiles.entries()) {
            const { Location } = await uploadFile(file, fileNames.length + index);
            if (Location) uploadedLinks.push(Location);
        }
        
        // Allow duplicate file uploads
        setFileNames((prev) => [...prev, ...newFiles.map((file) => file.name)]);
        setFileLinks((prev) => [...prev, ...uploadedLinks]);
        
        // Update form value
        setValue(formelementobj.id, [...fileLinks, ...uploadedLinks]);
        
        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the input
        }
    };

    const handleOpenFile = (fileLink: string): void => {
        if (!fileLink) return;

        const width = 800;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            fileLink,
            '_blank',
            `popup=yes, width=${width}, height=${height}, top=${top}, left=${left}, resizable=yes, scrollbars=yes`
        );
    };

    const handleDeleteFile = (index: number) => {
        const updatedFileNames = fileNames.filter((_, i) => i !== index);
        const updatedFileLinks = fileLinks.filter((_, i) => i !== index);
        const updatedProgressList = progressList.filter((_, i) => i !== index);

        setFileNames(updatedFileNames);
        setFileLinks(updatedFileLinks);
        setProgressList(updatedProgressList);
        progressRef.current = updatedProgressList;

        // Clear the error message if present
        if (errors[formelementobj.id]) {
            setError(formelementobj.id, '');
        }
        if (updatedFileNames.length === 0) {
            setValue(formelementobj.id, []);
        } else {
            setValue(formelementobj.id, updatedFileNames);
        }
    };

    return (
        <div className="relative">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            )}

            <div className="mb-4">
                <span className="text-sm font-semibold text-gray-800 flex items-center">
                    {formelementobj.label}
                    {formelementobj.required && <span className="text-red-500 ml-1">*</span>}
                </span>

                {/* File Upload Button */}
                <label
                    htmlFor={formelementobj.id}
                    className="cursor-pointer bg-blue-500 text-white font-medium text-sm px-3 py-1.5 rounded-md shadow 
                   hover:bg-blue-600 hover:shadow-md transition duration-150 ease-in-out 
                   active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 
                   inline-flex items-center justify-center gap-1"
                >
                    Choose Files
                </label>

                <input
                    type="file"
                    id={formelementobj.id}
                    ref={fileInputRef} // Attach the ref here
                    multiple={formelementobj.isMultiple}
                    onChange={handleFileChange}
                    required={formelementobj.required}
                    className="hidden"
                />

                {fileNames.length > 0 && (
                    <div className="text-sm text-gray-600 mt-4">
                        <h4 className="font-semibold mb-1">
                            {formelementobj.isMultiple ? 'Uploaded files:' : 'Uploaded file:'}
                        </h4>
                        <ul className="bg-gray-50 rounded-md shadow-md p-3">
                            {fileNames.map((fileName, index) => (
                                <li key={index} className="flex items-center justify-between py-1 border-b last:border-b-0">
                                    <button
                                        onClick={() => handleOpenFile(fileLinks[index])}
                                        className="text-blue-500 underline hover:text-blue-700 transition duration-200"
                                    >
                                        {fileName}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteFile(index)}
                                        className="text-red-500 hover:text-red-700 transition duration-200"
                                        aria-label={`Delete ${fileName}`}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Show error message if exists */}
                {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
            </div>
        </div>
    );
};

export default FileInput;
