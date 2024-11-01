import React from "react";
import Dropzone from "./Dropzone";
import {
  SortableContext,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableItemFormBuildArea from "./DraggableItemFormBuildArea";
import { FormElement } from "../../Model/FormBuilderModel";

interface FormBuildAreaProps {
  elements: FormElement[];
}

const FormBuildArea = ({
  elements,
  selectedElement,
  removeItem,
  setSelectedElement,
  isPropertiesVisible,
  setIsPropertiesVisible,
  overId,
  setIsToolboxVisible,
  isToolboxVisible,
}: {
  elements: FormElement[];
  selectedElement: FormElement | null;
  removeItem: (
    itemIndex: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  setSelectedElement: (element: FormElement | null) => void;
  isPropertiesVisible: true | false | null;
  setIsPropertiesVisible: (element: true | false) => void;
  overId: string | null;
  setIsToolboxVisible: (element: true | false) => void;
  isToolboxVisible: true | false | null;
}) => {
  const handleElementClick = (element: FormElement) => {
    setSelectedElement(element);
    setIsPropertiesVisible(true);
    setIsToolboxVisible(false);
  };

  const pageNameIndex = elements.findIndex((el) => el.type === "pagename");

  const gridClass =
    pageNameIndex !== -1
      ? elements[pageNameIndex].pagegridcolumn === 1
        ? "grid-cols-1"
        : elements[pageNameIndex].pagegridcolumn === 2
        ? "grid-cols-2"
        : "grid-cols-3"
      : "";

  let gridcolumnsize = elements[pageNameIndex]?.pagegridcolumn ?? 1;
  
  return (
    <>
      <Dropzone>
        <SortableContext items={elements} strategy={rectSortingStrategy}>
          <div className={`grid gap-3 ${gridClass}`}>
            {elements.map(
              (element) =>
                element.type !== "pagename" && (
                  <div
                    key={element.id}
                    className={`${
                      element.type === "headertext" ||
                      element.type === "pageheadertext" ||
                      element.type === "pagefootertext"
                        ? "col-start-1 col-span-full"
                        : ""
                    }
        ${element.id === overId ? "OverIndexhighlighted" : ""}
        `}
                  >
                    <DraggableItemFormBuildArea
                      key={element.id}
                      element={element}
                      selectedElement={selectedElement}
                      removeItem={removeItem}
                      handleElementClick={handleElementClick}
                      isPropertiesVisible={isPropertiesVisible}
                      gridcolumnsize={gridcolumnsize}
                      isToolboxVisible={isToolboxVisible}
                    />
                  </div>
                )
            )}
          </div>
        </SortableContext>
      </Dropzone>
    </>
  );
};

export default FormBuildArea;
