// src/components/Toolbox.tsx

import DraggableItemToolBox from "./DraggableItemToolBox";

const ITEM_TYPES = {
  TEXTBOX: "text",
  RADIO: "radio",
  DROPDOWN: "select",
  APPLICATIONINFORMATIONSECTION: "applicationinformation",
  COMMUNICATIONDETAILS: "communicationdetails",
  PAGENAME: "pagename",
  HEADERTEXT: "headertext",
  CHECKBOX: "checkbox",
  DATEPICKER: "date",
  FILEUPLOAD: "file",
  TEXTAREA: "textarea",
  PAGEHEADERTEXT: "pageheadertext",
  PAGEFOOTERTEXT: "pagefootertext",
};

export const Toolbox: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 p-3 border-r border-gray-300 rounded-lg">
        {/* ToolBox Heading */}
        <h2 className="text-center text-xl font-bold text-gray-700 mb-4 pb-1 border-b-2 border-gray-300">
          ToolBox
        </h2>
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-md font-semibold text-gray-600 mb-4 border-b pb-2">
            Predefined Templates
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="cell-content p-1 bg-white border rounded shadow-sm hover:shadow-lg transition duration-200 transform hover:scale-105 text-sm">
              <DraggableItemToolBox
                id={ITEM_TYPES.APPLICATIONINFORMATIONSECTION}
                label="Basic Information"
              />
            </div>
            <div className="cell-content p-1 bg-white border rounded shadow-sm hover:shadow-lg transition duration-200 transform hover:scale-105 text-sm">
              <DraggableItemToolBox
                id={ITEM_TYPES.COMMUNICATIONDETAILS}
                label="Communication Details"
              />
            </div>
          </div>
        </div>
        <br></br>
        {/* Standard Section */}
        <div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-md font-semibold text-gray-600 mb-4 border-b pb-2">
              Standard Elements
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox
                  id={ITEM_TYPES.HEADERTEXT}
                  label="Section title"
                />
              </div>
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox
                  id={ITEM_TYPES.PAGEHEADERTEXT}
                  label="Header Instructions"
                />
              </div>
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox
                  id={ITEM_TYPES.PAGEFOOTERTEXT}
                  label="Footer Instructions"
                />
              </div>
              <h3 className="text-md font-semibold text-gray-600 mb-4 border-b pb-2"></h3>
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox
                  id={ITEM_TYPES.TEXTBOX}
                  label="Text box"
                />
              </div>
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox
                  id={ITEM_TYPES.TEXTAREA}
                  label="Text area"
                />
              </div>
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox id={ITEM_TYPES.RADIO} label="Radio" />
              </div>
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox
                  id={ITEM_TYPES.DROPDOWN}
                  label="Dropdown"
                />
              </div>
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox
                  id={ITEM_TYPES.CHECKBOX}
                  label="Checkbox"
                />
              </div>
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox
                  id={ITEM_TYPES.DATEPICKER}
                  label="Date picker"
                />
              </div>
              <div className="transition duration-200 transform hover:scale-105 text-sm">
                <DraggableItemToolBox
                  id={ITEM_TYPES.FILEUPLOAD}
                  label="File upload"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
