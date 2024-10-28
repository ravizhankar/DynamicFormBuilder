import React, { useEffect, useState } from "react";
import { FormElement } from "../../Model/FormBuilderModel";

const Properties = ({
  selectedElement,
  setSelectedElement,
}: {
  selectedElement: FormElement | null;
  setSelectedElement: (element: FormElement | null) => void;
}) => {
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [minLengthMessage, setminLengthMessage] = useState(false);
  const [maxLengthMessage, setmaxLengthMessage] = useState(false);

  const [minFilesMessage, setminFilesMessage] = useState(false);
  const [maxFilesMessage, setmaxFilesMessage] = useState(false);

  const [minDateMessage, setminDateMessage] = useState(false);
  const [maxDateMessage, setmaxDateMessage] = useState(false);
  const PatternOptions = [
    "None",
    "Alphabets",
    "Numbers",
    "AlphaNumeric",
    "PhoneNumber",
    "Email",
    "Aadhar",
    "Text",
  ];

  const fileTypes = ["jpg", "png", "pdf"];

  const AlignmentOptions = ["Vertical", "Horizontal"];

  // Check if all individual file types are selected, and set "Select All" accordingly
  useEffect(() => {
    if (selectedElement?.allowedFileTypes?.length === fileTypes.length) {
      setIsSelectAllChecked(true);
    } else {
      setIsSelectAllChecked(false);
    }
  }, [selectedElement?.allowedFileTypes]);

  if (!selectedElement) {
    return (
      <>
        <h2 className="text-center text-xl font-bold text-gray-700 mb-4 pb-1 border-b-2 border-gray-300">
          Properties
        </h2>
        <div className="p-4">No element selected.</div>
      </>
    );
  }

  // #region handleTitleChange
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedElement({ ...selectedElement, [name]: value });
  };
  // #endregion

  // #region handleheaderfooterTextChange
  const handleheaderfooterTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedElement({ ...selectedElement, value: e.target.value });
  };
  // #endregion

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelectedElement({ ...selectedElement, [name]: checked });
  };

  const handleMultipleFilesCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {    
    const { name, checked } = e.target;
    setSelectedElement({ ...selectedElement, [name]: checked });
    if (!checked) {
      setSelectedElement({ ...selectedElement, maxFiles: 1 });
    }
  };

  const handlePatternDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    selectedElement.allowedSplChars = "";
    selectedElement.notAllowedSplChars = "";
    selectedElement.minLength = 0;
    selectedElement.maxLength = 0;
    selectedElement.disbled = false;
    const selectedValue = e.target.value;
    if (e.target.value === "PhoneNumber") {
      selectedElement.minLength = 10;
      selectedElement.maxLength = 15;
      selectedElement.disbled = true;
    } else if (e.target.value === "Aadhar") {
      selectedElement.minLength = 12;
      selectedElement.maxLength = 12;
      selectedElement.disbled = true;
    } else if (e.target.value === "Email") {
      selectedElement.minLength = 7;
      selectedElement.maxLength = 100;
      selectedElement.disbled = true;
    }
    setSelectedElement({ ...selectedElement, ["pattern"]: selectedValue });
  };

  const handleAlignmentDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    setSelectedElement({ ...selectedElement, ["alignment"]: selectedValue });
  };

  // Handle changes for minLength
  const handleMinLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setminLengthMessage(false);
    setmaxLengthMessage(false);
    let newMinLength = 0;

    let keyinvalue =
      e.target.value === "" || e.target.value === "0" ? "0" : e.target.value;

    if (parseInt(keyinvalue) >= 0) {
      newMinLength = parseInt(keyinvalue, 10);
      if (newMinLength <= (selectedElement.maxLength || 0)) {
        setSelectedElement({ ...selectedElement, minLength: newMinLength });
      } else {
        setminLengthMessage(true);
      }
    } else if (parseInt(keyinvalue) < 0) {
      selectedElement.minLength = 0;
    }
  };

  const handleMinLengthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setminLengthMessage(false);
  };

  // Handle changes for maxLength
  const handleMaxLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    setminLengthMessage(false);
    setmaxLengthMessage(false);
    let newMaxLength = 0;

    let keyinvalue =
      e.target.value === "" || e.target.value === "0" ? "0" : e.target.value;

    if (parseInt(keyinvalue, 10) >= 0) {
      newMaxLength = parseInt(keyinvalue, 10);
      if (newMaxLength >= (selectedElement.minLength || 0)) {
        setSelectedElement({ ...selectedElement, maxLength: newMaxLength });
      } else {
        setmaxLengthMessage(true);
      }
    } else if (parseInt(keyinvalue) < 0) {
      selectedElement.maxLength = 0;
    }
  };

  const handleMaxLengthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setmaxLengthMessage(false);
  };

  const handleMinDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setminDateMessage(false);
    setmaxDateMessage(false);
    const newMinDate = new Date(e.target.value);
    if (selectedElement.maxDate) {
      if (newMinDate <= new Date(selectedElement.maxDate)) {
        setSelectedElement({
          ...selectedElement,
          minDate: `${newMinDate.getFullYear()}-${(newMinDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${newMinDate
            .getDate()
            .toString()
            .padStart(2, "0")}`,
        });
      } else {
        setminDateMessage(true);
      }
    } else {
      setSelectedElement({
        ...selectedElement,
        minDate: `${newMinDate.getFullYear()}-${(newMinDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${newMinDate
          .getDate()
          .toString()
          .padStart(2, "0")}`,
      });
    }
  };

  const handleMaxDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setminDateMessage(false);
    setmaxDateMessage(false);
    const newMaxDate = new Date(e.target.value);
    if (selectedElement.minDate) {
      if (newMaxDate >= new Date(selectedElement.minDate)) {
        setSelectedElement({
          ...selectedElement,
          maxDate: `${newMaxDate.getFullYear()}-${(newMaxDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${newMaxDate
            .getDate()
            .toString()
            .padStart(2, "0")}`,
        });
      } else {
        setmaxDateMessage(true);
      }
    } else {
      setSelectedElement({
        ...selectedElement,
        maxDate: `${newMaxDate.getFullYear()}-${(newMaxDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${newMaxDate
          .getDate()
          .toString()
          .padStart(2, "0")}`,
      });
    }
  };

  const handleMinDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setminLengthMessage(false);
  };

  const handleMaxDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setmaxLengthMessage(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedElement({
      ...selectedElement,
      [e.target.name]: e.target.value,
    });
  };

  const handlerowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rows = 0;
    if (e.target.value.length > 0) {
      if (parseInt(e.target.value) >= 0) {
        rows = parseInt(e.target.value, 10);
        setSelectedElement({ ...selectedElement, rows: rows });
      } else if (parseInt(e.target.value) < 0) {
        selectedElement.rows = 0;
      }
    }
  };
  const handleMinFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setminFilesMessage(false);
    setmaxFilesMessage(false);
    let newMinFiles = 0;
    let keyinvalue =
      e.target.value === "" || e.target.value === "0" ? "0" : e.target.value;
    if (parseInt(keyinvalue, 10) >= 0) {
      newMinFiles = parseInt(keyinvalue, 10);
      if (newMinFiles <= (selectedElement.maxFiles || 0)) {
        setSelectedElement({ ...selectedElement, minFiles: newMinFiles });
      } else {
        setminFilesMessage(true);
      }
    } else if (parseInt(keyinvalue) < 0) {
      selectedElement.minFiles = 0;
    }
  };
  const handleMinFilesBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setminFilesMessage(false);
  };
  const handleMaxFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setminFilesMessage(false);
    setmaxFilesMessage(false);
    let newMaxFiles = 0;
    let keyinvalue =
      e.target.value === "" || e.target.value === "0" ? "0" : e.target.value;
    if (parseInt(keyinvalue, 10) >= 0) {
      newMaxFiles = parseInt(keyinvalue, 10);
      if (newMaxFiles >= (selectedElement.minFiles || 0)) {
        setSelectedElement({ ...selectedElement, maxFiles: newMaxFiles });
      } else {
        setmaxFilesMessage(true);
      }
    } else if (parseInt(keyinvalue) < 0) {
      selectedElement.maxFiles = 0;
    }
  };
  const handleMaxFilesBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmaxFilesMessage(false);
  };

  const handlemaxSizeInMBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let size = 0;
    if (e.target.value.length > 0) {
      if (parseInt(e.target.value) >= 0) {
        size = parseInt(e.target.value, 10);
        setSelectedElement({ ...selectedElement, maxSizeInMB: size });
      } else if (parseInt(e.target.value) < 0) {
        selectedElement.maxSizeInMB = 0;
      }
    }
  };

  // Handler for "Select All" checkbox
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsSelectAllChecked(isChecked);

    // If "Select All" is checked, select all file types; otherwise, clear selection
    if (isChecked) {
      setSelectedElement({
        ...selectedElement,
        allowedFileTypes: [...fileTypes],
      });
    } else {
      setSelectedElement({ ...selectedElement, allowedFileTypes: [] });
    }
  };

  // Handler for changing file type selection
  const handleFileTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedFileTypes = selectedElement?.allowedFileTypes || [];

    if (checked) {
      // Add selected file type to the array
      updatedFileTypes = [...updatedFileTypes, value];
    } else {
      // Remove unselected file type from the array
      updatedFileTypes = updatedFileTypes.filter((type) => type !== value);
    }

    // Uncheck "Select All" if any item is deselected
    if (updatedFileTypes.length !== fileTypes.length) {
      setIsSelectAllChecked(false);
    } else {
      setIsSelectAllChecked(true);
    }

    setSelectedElement({
      ...selectedElement,
      allowedFileTypes: updatedFileTypes,
    });
  };

  if (!selectedElement) {
    return (
      <div>
        <h2>No element selected</h2>
      </div>
    );
  }

  return (
    <>
      {/* ToolBox Heading */}
      <h2 className="text-center text-xl font-bold text-gray-700 mb-4 pb-1 border-b-2 border-gray-300">
        Properties
      </h2>
      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold text-sm mb-1">Title</label>
        <input
          type="text"
          name="label"
          value={selectedElement.label}
          onChange={handleTitleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {/* placeHolder */}
      {(selectedElement.type === "text" ||
        selectedElement.type === "textarea") && (
        <>
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-1">
              Place holder
            </label>
            <input
              type="text"
              name="placeHolder"
              value={selectedElement.placeHolder}
              onChange={(e) => handleTextChange(e)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </>
      )}
      {/* Required, Tooltip */}
      {selectedElement.type !== "pagename" &&
        selectedElement.type !== "headertext" &&
        selectedElement.type !== "pageheadertext" &&
        selectedElement.type !== "pagefootertext" && (
          <>
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-1">
                Tool tip
              </label>
              <input
                type="text"
                name="toolTip"
                value={selectedElement.toolTip}
                onChange={(e) => handleTextChange(e)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-sm mb-1">
                Mandatory
              </label>
              <input
                type="checkbox"
                name="required"
                checked={selectedElement.required}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="required" className="text-sm">
                Is mandatory?
              </label>
            </div>
          </>
        )}
      {(selectedElement.type === "text" ||
        selectedElement.type === "textarea") && (
        <>
          {selectedElement.type === "textarea" && (
            <>
              {/* Rows */}
              <div className="mb-4">
                <label className="block font-semibold text-sm mb-1">Rows</label>
                <input
                  type="number"
                  name="rows"
                  value={selectedElement.rows || 0}
                  onChange={(e) => handlerowsChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={selectedElement.disbled}
                />
              </div>
            </>
          )}
          {/* Max Length */}
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-1">
              Maximum character length
            </label>
            <input
              type="number"
              name="maxLength"
              value={selectedElement.maxLength || 0}
              onChange={(e) => handleMaxLengthChange(e)}
              onBlur={(e) => handleMaxLengthBlur(e)}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={selectedElement.disbled}
            />
            {maxLengthMessage === true && (
              <span className="text-xs text-red-500">
                Maximum length cannot be less than minimum length
              </span>
            )}
            {maxLengthMessage === false && <span></span>}
          </div>

          {/* Min Length */}
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-1">
              Minimum character length
            </label>
            <input
              type="number"
              name="minLength"
              value={selectedElement.minLength || 0}
              onChange={(e) => handleMinLengthChange(e)}
              onBlur={(e) => handleMinLengthBlur(e)}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={selectedElement.disbled}
            />
            {minLengthMessage === true && (
              <span className="text-xs text-red-500">
                Minimum length cannot be greater than maximum length
              </span>
            )}
            {minLengthMessage === false && <span></span>}
          </div>

          {selectedElement.type === "text" && (
            <>
              {/* Pattern (for text inputs) */}
              <div className="mb-4">
                <label className="block font-semibold text-sm mb-1">
                  Validation
                </label>
                <select
                  value={selectedElement.pattern}
                  onChange={handlePatternDropdownChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  {PatternOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {selectedElement.pattern === "Text" && (
                <>
                  <div className="mb-4">
                    <label className="block font-semibold text-sm mb-1">
                      Allowed special characters
                    </label>
                    <input
                      type="text"
                      name="allowedSplChars"
                      value={selectedElement.allowedSplChars}
                      onChange={(e) => handleTextChange(e)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold text-sm mb-1">
                      Not allowed special characters
                    </label>
                    <input
                      type="text"
                      name="notAllowedSplChars"
                      value={selectedElement.notAllowedSplChars}
                      onChange={(e) => handleTextChange(e)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
      {/*#region Options (for select and radio)  */}
      {(selectedElement.type === "select" ||
        selectedElement.type === "radio" ||
        selectedElement.type === "checkbox") &&
        selectedElement.options && (
          <>
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-1">
                Options
              </label>
              {selectedElement.options.map((option, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => {
                      const updatedOptions = [...selectedElement.options!];
                      updatedOptions[idx] = {
                        ...option,
                        value: e.target.value,
                        label: e.target.value,
                      };
                      setSelectedElement({
                        ...selectedElement,
                        ["options"]: updatedOptions,
                      });
                    }}
                    className="p-2 border border-gray-300 rounded w-full mr-2"
                    placeholder="Option label"
                  />
                  <button
                    className="bg-red-500 text-white p-1 rounded"
                    onClick={() => {
                      const updatedOptions = selectedElement.options!.filter(
                        (_, optionIndex) => optionIndex !== idx
                      );
                      setSelectedElement({
                        ...selectedElement,
                        ["options"]: updatedOptions,
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => {
                    const newOption = { value: "", label: "" };
                    setSelectedElement({
                      ...selectedElement,
                      options: [...(selectedElement.options || []), newOption],
                    });
                  }}
                >
                  Add option
                </button>
              </div>
              <br></br>
              <div>
                <button
                  style={{ fontSize: "13px" }}
                  className="bg-gray-300 text-white px-4 py-1 rounded cursor-not-allowed"
                  disabled
                >
                  Fetch from datasource
                </button>
              </div>
            </div>
          </>
        )}
      {/*#endregion */}
      {/* #region Options Alignment (for select and radio) */}
      {(selectedElement.type === "radio" ||
        selectedElement.type === "checkbox") &&
        selectedElement.options && (
          <>
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-1">
                Alignment
              </label>
              <select
                value={selectedElement.alignment}
                onChange={handleAlignmentDropdownChange}
                className="p-2 border border-gray-400 rounded-lg"
              >
                {AlignmentOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      {/*#endregion */}
      {selectedElement.type === "date" && (
        <>
          {/* Min Date */}
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-1">
              Minimum date (mm/dd/yyyy)
            </label>
            <input
              type="date"
              name="minDate"
              value={selectedElement.minDate || ""}
              onChange={(e) => handleMinDateChange(e)}
              onBlur={(e) => handleMinDateBlur(e)}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={selectedElement.disbled}
            />
            {minDateMessage === true && (
              <span className="text-xs text-red-500">
                Minimum date can not be greater than maximum date
              </span>
            )}
            {minDateMessage === false && <span></span>}
          </div>
          {/* Max Date */}
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-1">
              Maximum date (mm/dd/yyyy)
            </label>
            <input
              type="date"
              name="maxDate"
              value={selectedElement.maxDate || ""}
              onChange={(e) => handleMaxDateChange(e)}
              onBlur={(e) => handleMaxDateBlur(e)}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={selectedElement.disbled}
            />
            {maxDateMessage === true && (
              <span className="text-xs text-red-500">
                Maximum date can not be lesser than minimum date
              </span>
            )}
            {maxDateMessage === false && <span></span>}
          </div>
        </>
      )}

      {selectedElement.type === "file" && (
        <>
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-1">
              Multiple files
            </label>
            <input
              type="checkbox"
              name="isMultiple"
              checked={selectedElement.isMultiple}
              onChange={handleMultipleFilesCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="required" className="text-sm">
              Allow multiple files
            </label>
          </div>

          {selectedElement.isMultiple && (
            <>
              {/* Max Files */}
              <div className="mb-4">
                <label className="block font-semibold text-sm mb-1">
                  No. of maximum files
                </label>
                <input
                  type="number"
                  name="maxFiles"
                  value={selectedElement.maxFiles || 0}
                  onChange={(e) => handleMaxFilesChange(e)}
                  onBlur={(e) => handleMaxFilesBlur(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={selectedElement.disbled}
                />
                {maxFilesMessage === true && (
                  <span className="text-xs text-red-500">
                    No. of maximum files cannot be less than no. of minimum
                    files
                  </span>
                )}
                {maxFilesMessage === false && <span></span>}
              </div>

              {/* Min Files */}
              <div className="mb-4">
                <label className="block font-semibold text-sm mb-1">
                  No. of minimum files
                </label>
                <input
                  type="number"
                  name="minLength"
                  value={selectedElement.minFiles || 0}
                  onChange={(e) => handleMinFilesChange(e)}
                  onBlur={(e) => handleMinFilesBlur(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={selectedElement.disbled}
                />
                {minFilesMessage === true && (
                  <span className="text-xs text-red-500">
                    No. of minimum files cannot be greater than no. of maximum
                    files
                  </span>
                )}
                {minFilesMessage === false && <span></span>}
              </div>
            </>
          )}

          {/* maxSizeInMB */}
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-1">
              Maximum size per file (MB)
            </label>
            <input
              type="number"
              name="maxSizeInMB"
              value={selectedElement.maxSizeInMB || 0}
              onChange={(e) => handlemaxSizeInMBChange(e)}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={selectedElement.disbled}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-sm mb-1">
              Allowed file types
            </label>
            {/* "Select All" Checkbox */}
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isSelectAllChecked}
                onChange={handleSelectAllChange}
                className="mr-2"
              />
              Select All
            </label>
            <br />

            {/* Individual file type checkboxes */}
            <div className="flex flex-wrap gap-2">
              {fileTypes.map((fileType) => (
                <label key={fileType} className="flex items-center">
                  <input
                    type="checkbox"
                    value={fileType}
                    checked={
                      selectedElement?.allowedFileTypes?.includes(fileType) ||
                      false
                    }
                    onChange={handleFileTypeChange}
                    className="mr-2"
                  />
                  {fileType.toUpperCase()}
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Properties;
