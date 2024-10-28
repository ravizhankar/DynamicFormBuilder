import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCheckSquare,
  faTextWidth,
  faCaretDown,
  faHeading,
  faUser,
  faAddressCard,
  faCircleDot,
  faCalendar,
  faCalendarAlt,
  faFile,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";

const ITEM_TYPES = {
  RADIO: "radio",
  CHECKBOX: "checkbox",
  TEXTBOX: "text",
  DROPDOWN: "select",
  HEADERTEXT: "headertext",
  APPLICATIONINFORMATIONSECTION: "applicationinformation",
  COMMUNICATIONDETAILS: "communicationdetails",
  DATEPICKER: "date",
  FILEUPLOAD: "file",
  TEXTAREA: "textarea",
  PAGEHEADERTEXT: "pageheadertext",
  PAGEFOOTERTEXT:"pagefootertext"
};
const getIcon = (type: String) => {
  switch (type) {
    case ITEM_TYPES.RADIO:
      return (
        <FontAwesomeIcon
          icon={faCircleDot}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.CHECKBOX:
      return (
        <FontAwesomeIcon
          icon={faCheckSquare}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.TEXTBOX:
      return (
        <FontAwesomeIcon
          icon={faTextWidth}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.DROPDOWN:
      return (
        <FontAwesomeIcon
          icon={faCaretDown}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.HEADERTEXT:
      return (
        <FontAwesomeIcon
          icon={faHeading}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.PAGEHEADERTEXT:
      return (
        <FontAwesomeIcon
          icon={faHeading}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.PAGEFOOTERTEXT:
      return (
        <FontAwesomeIcon
          icon={faHeading}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.DATEPICKER:
      return (
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.FILEUPLOAD:
      return (
        <FontAwesomeIcon
          icon={faFileUpload}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.TEXTAREA:
      return (
        <FontAwesomeIcon
          icon={faTextWidth}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    case ITEM_TYPES.APPLICATIONINFORMATIONSECTION:
      return (
        <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-gray-500 mr-2" />
      );
    case ITEM_TYPES.COMMUNICATIONDETAILS:
      return (
        <FontAwesomeIcon
          icon={faAddressCard}
          className="h-4 w-4 text-gray-500 mr-2"
        />
      );
    default:
      return null;
  }
};

const DraggableItemToolBox: React.FC<{ id: string; label: string }> = ({
  id,
  label,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        cursor: "grab",
        margin: "5px",
      }}
    >
      {getIcon(id)}
      {label}
    </div>
  );
};

export default DraggableItemToolBox;
