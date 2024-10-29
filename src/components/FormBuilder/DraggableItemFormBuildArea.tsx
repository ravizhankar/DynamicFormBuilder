// src/components/SortableItem.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormElement } from "../../Model/FormBuilderModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAlt,    
  faTrashAlt 
} from "@fortawesome/free-solid-svg-icons";

interface SortableItemProps {
  element: FormElement;
}

const DraggableItemFormBuildArea = ({
  element,
  selectedElement,
  removeItem,
  handleElementClick,
  isPropertiesVisible,
  gridcolumnsize,
  isToolboxVisible,
}: {
  element: FormElement;
  selectedElement: FormElement | null;
  removeItem: (
    itemIndex: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleElementClick: (element: FormElement) => void;
  isPropertiesVisible: true | false | null;
  gridcolumnsize: number;
  isToolboxVisible: true | false | null;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: element.id,
    });

  return (
    <div
      ref={setNodeRef}
      className={`border p-4 rounded-md bg-gray-50 shadow
        ${selectedElement?.id === element.id ? "Selectedhighlighted" : ""}`}
      style={{
        cursor: "pointer",
        margin: "2px",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        marginBottom: "9px",
        minHeight: "66px", // Set minimum height to 50px
        height: "auto",
        justifyContent: element.type === "pagename" ? "center" : "",
        fontWeight: element.type === "pagename" ? "bold" : "",
        fontSize: element.type === "pagename" ? "25px" : "",
        backgroundColor: element.type === "pagename" ? "white" : "#f9f9f9",
        transform: CSS.Transform.toString(transform),
        transition: "transform 300ms ease, background-color 500ms ease",
        willChange: "transform",
      }}
      onClick={() => handleElementClick(element)}
      //{...attributes}
      //{...listeners}
    >
      {/* <p>{element.label}</p> */}
      {element.type !== "pagename" &&
        element.type !== "headertext" &&
        element.type !== "pageheadertext" &&
        element.type !== "pagefootertext" && (
          <label
            className="flex items-center mb-2 text-sm font-semibold text-gray-800"
            style={{
              width:
                gridcolumnsize === 3
                  ? "70px"
                  : gridcolumnsize === 1 || gridcolumnsize === 2
                  ? "110px"
                  : isPropertiesVisible
                  ? "80px"
                  : "150px",
            }}
          >
            {selectedElement?.id === element.id
              ? selectedElement.label
              : element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      &nbsp;&nbsp;
      {(element.type === "pagename" ||
        element.type === "headertext" ||
        element.type === "pageheadertext" ||
        element.type === "pagefootertext") && (
        <label id={element.id} className="cursor-pointer">
          {selectedElement?.id === element.id
            ? selectedElement.label
            : element.label}
        </label>
      )}
      {element.type === "text" && (
        <input
          style={{
            width:
              isToolboxVisible === true
                ? gridcolumnsize === 3
                  ? "35px"
                  : gridcolumnsize === 1 || gridcolumnsize === 2
                  ? "150px"
                  : isPropertiesVisible
                  ? "80px"
                  : "150px"
                : gridcolumnsize === 3
                ? "110px"
                : gridcolumnsize === 1 || gridcolumnsize === 2
                ? "220px"
                : isPropertiesVisible
                ? "80px"
                : "150px",
          }}
          size={gridcolumnsize}
          type="text"
          id={element.id}
          value={element.value}
          //onChange={handleChange} // Add onChange handler
          placeholder={
            selectedElement?.id === element.id
              ? selectedElement.placeHolder
              : element.placeHolder
          }
          minLength={
            selectedElement?.id === element.id
              ? selectedElement.minLength
              : element.minLength
          }
          maxLength={
            selectedElement?.id === element.id
              ? selectedElement.maxLength
              : element.maxLength
          }
          pattern={element.pattern}
          className="p-1 border border-gray-400 rounded-lg"
          required={
            selectedElement?.id === element.id
              ? selectedElement.required
                ? true
                : false
              : element.required
              ? true
              : false
          }
          disabled
        />
      )}
      {element.type === "textarea" && (
        <textarea
          style={{
            width:
              isToolboxVisible === true
                ? gridcolumnsize === 3
                  ? "35px"
                  : gridcolumnsize === 1 || gridcolumnsize === 2
                  ? "150px"
                  : isPropertiesVisible
                  ? "80px"
                  : "150px"
                : gridcolumnsize === 3
                ? "110px"
                : gridcolumnsize === 1 || gridcolumnsize === 2
                ? "220px"
                : isPropertiesVisible
                ? "80px"
                : "150px",
          }}
          id={element.id}
          value={element.value}
          placeholder={
            selectedElement?.id === element.id
              ? selectedElement.placeHolder
              : element.placeHolder
          }
          minLength={
            selectedElement?.id === element.id
              ? selectedElement.minLength
              : element.minLength
          }
          maxLength={
            selectedElement?.id === element.id
              ? selectedElement.maxLength
              : element.maxLength
          }
          className="border border-gray-400 rounded-lg"
          required={
            selectedElement?.id === element.id
              ? selectedElement.required
                ? true
                : false
              : element.required
              ? true
              : false
          }
          disabled
        />
      )}
      {element.type === "file" && (
        <input
          style={{
            width:
              isToolboxVisible === true
                ? gridcolumnsize === 3
                  ? "35px"
                  : gridcolumnsize === 1 || gridcolumnsize === 2
                  ? "150px"
                  : isPropertiesVisible
                  ? "80px"
                  : "150px"
                : gridcolumnsize === 3
                ? "110px"
                : gridcolumnsize === 1 || gridcolumnsize === 2
                ? "220px"
                : isPropertiesVisible
                ? "80px"
                : "150px",
          }}
          type="file"
          id={element.id}
          value={element.value}
          //onChange={handleChange} // Add onChange handler
          placeholder={
            selectedElement?.id === element.id
              ? selectedElement.placeHolder
              : element.placeHolder
          }
          minLength={
            selectedElement?.id === element.id
              ? selectedElement.minLength
              : element.minLength
          }
          maxLength={
            selectedElement?.id === element.id
              ? selectedElement.maxLength
              : element.maxLength
          }
          pattern={element.pattern}
          className="p-1 border border-gray-400 rounded-lg"
          required={
            selectedElement?.id === element.id
              ? selectedElement.required
                ? true
                : false
              : element.required
              ? true
              : false
          }
          disabled
        />
      )}
      {element.type === "date" && (
        <input
          style={{
            width:
              isToolboxVisible === true
                ? gridcolumnsize === 3
                  ? "35px"
                  : gridcolumnsize === 1 || gridcolumnsize === 2
                  ? "150px"
                  : isPropertiesVisible
                  ? "80px"
                  : "150px"
                : gridcolumnsize === 3
                ? "110px"
                : gridcolumnsize === 1 || gridcolumnsize === 2
                ? "220px"
                : isPropertiesVisible
                ? "80px"
                : "150px",
          }}
          type="date"
          id={element.id}
          value={element.value}
          //onChange={handleChange} // Add onChange handler
          placeholder={
            selectedElement?.id === element.id
              ? selectedElement.placeHolder
              : element.placeHolder
          }
          minLength={
            selectedElement?.id === element.id
              ? selectedElement.minLength
              : element.minLength
          }
          maxLength={
            selectedElement?.id === element.id
              ? selectedElement.maxLength
              : element.maxLength
          }
          pattern={element.pattern}
          className="p-1 border border-gray-400 rounded-lg"
          required={
            selectedElement?.id === element.id
              ? selectedElement.required
                ? true
                : false
              : element.required
              ? true
              : false
          }
          disabled
        />
      )}
      <div
        className={`flex ${
          element.alignment === "Vertical"
            ? "flex-col items-start gap-y-3"
            : "flex-wrap items-center gap-x-3"
        }`}
      >
        {element.type === "checkbox" &&
          element.options?.map((option, idx) => (
            <div key={idx} className="flex items-center">
              <input
                type="checkbox"
                id={`${element.id}-${option.value}`}
                name={element.id}
                value={option.value}
                className="checkbox cursor-pointer"
                //onChange={handleChange} // Add onChange handler
                disabled
              />
              <label
                htmlFor={`${element.id}-${option.value}`}
                className="ml-2 text-sm font-medium text-gray-700"
              >
                {option.label}
              </label>
              &nbsp;
            </div>
          ))}
      </div>
      <div
        className={`flex ${
          element.alignment === "Vertical"
            ? "flex-col items-start gap-y-3"
            : "flex-wrap items-center gap-x-3"
        }`}
      >
        {element.type === "radio" &&
          element.options?.map((option, idx) => (
            <div key={idx} className="flex items-center">
              <input
                type="radio"
                id={`${element.id}-${option.value}`}
                name={element.id}
                value={option.value}
                className="radio cursor-pointer"
                //onChange={handleChange} // Add onChange handler
                disabled
              />
              <label
                htmlFor={`${element.id}-${option.value}`}
                className="ml-2 text-sm font-medium text-gray-700"
              >
                {option.label}
              </label>
              <br />
            </div>
          ))}
      </div>
      {element.type === "select" && (
        <select
          style={{
            width:
              isToolboxVisible === true
                ? gridcolumnsize === 3
                  ? "35px"
                  : gridcolumnsize === 1 || gridcolumnsize === 2
                  ? "150px"
                  : isPropertiesVisible
                  ? "80px"
                  : "150px"
                : gridcolumnsize === 3
                ? "110px"
                : gridcolumnsize === 1 || gridcolumnsize === 2
                ? "220px"
                : isPropertiesVisible
                ? "80px"
                : "150px",
          }}
          id={element.id}
          value={element.value}
          className="p-1 border border-gray-400 rounded-lg cursor-pointer"
          //onChange={handleChange} // Add onChange handler
          disabled
        >
          {element.options?.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {element.type !== "pagename" && (
        <div className="ml-auto flex space-x-2">
          <button onClick={(event) => removeItem(element.id, event)}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="h-4 w-4 cursor-pointer text-customRed"
            />
          </button>
          {element.type !== "pageheadertext" &&
            element.type !== "pagefootertext" && (
              <button>
                <FontAwesomeIcon
                  icon={faArrowsAlt}
                  className="h-4 w-4 cursor-grab text-customBlue"
                  {...listeners}
                />
              </button>
            )}
        </div>
      )}
    </div>
  );
};

export default DraggableItemFormBuildArea;
