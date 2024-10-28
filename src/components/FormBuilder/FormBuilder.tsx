import React, { useEffect, useState } from "react";
import { DndContext, pointerWithin, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { FormData, FormElement } from "../../Model/FormBuilderModel";
import { Toolbox } from "./ToolBox";
import FormBuildArea from "./FormBuildArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Properties from "./Properties";

interface Page {
  id: string;
  elements: FormElement[];
}

const FormBuilder: React.FC = () => {
  const [isFormElement, setisFormElement] = useState(false);
  const [overId, setOverId] = useState<string | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<string | null>(null);
  const [isJsonGenerated, SetisJsonGenerated] = useState(false);
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(
    null
  );
  const [isPropertiesVisible, setIsPropertiesVisible] =
    useState<boolean>(false);
  const [isToolboxVisible, setIsToolboxVisible] = useState(true);

  // Manage multiple pages
  const [pages, setPages] = useState<Page[]>([]);
  const [activePageId, setActivePageId] = useState<string | null>(null);

  const addPage = () => {
    const newPageId = `page-${Date.now()}`;

    const PageElement: FormElement = {
      id: newPageId,
      type: "pagename",
      label: "Page Title",
      required: false,
      minLength: 0,
      maxLength: 0,
      pattern: "",
      options: [],
      value: "",
      errorMessages: [],
      alignment: "",
      toolTip: "",
      placeHolder: "",
      disbled: false,
      allowedSplChars: "",
      notAllowedSplChars: "",
      minDate: "",
      maxDate: "",
      isMultiple: false,
      maxFiles: 0,
      minFiles: 0,
      maxSizeInMB: 0,
      allowedFileTypes: [],
      rows: 0,
    };

    const PageHeaderElement: FormElement = {
      id: `pageheadertext-${Date.now()}`,
      type: "pageheadertext",
      label: "Header Instructions",
      required: false,
      minLength: 0,
      maxLength: 0,
      pattern: "",
      options: [],
      value: "",
      errorMessages: [],
      alignment: "",
      toolTip: "",
      placeHolder: "",
      disbled: false,
      allowedSplChars: "",
      notAllowedSplChars: "",
      minDate: "",
      maxDate: "",
      isMultiple: false,
      maxFiles: 0,
      minFiles: 0,
      maxSizeInMB: 0,
      allowedFileTypes: [],
      rows: 0,
    };

    const PageFooterElement: FormElement = {
      id: `pagefootertext-${Date.now()}`,
      type: "pagefootertext",
      label: "Footer Instructions",
      required: false,
      minLength: 0,
      maxLength: 0,
      pattern: "",
      options: [],
      value: "",
      errorMessages: [],
      alignment: "",
      toolTip: "",
      placeHolder: "",
      disbled: false,
      allowedSplChars: "",
      notAllowedSplChars: "",
      minDate: "",
      maxDate: "",
      isMultiple: false,
      maxFiles: 0,
      minFiles: 0,
      maxSizeInMB: 0,
      allowedFileTypes: [],
      rows: 0,
    };

    setPages((prevPages) => [
      ...prevPages,
      {
        id: newPageId,
        elements: [PageElement, PageHeaderElement, PageFooterElement],
      },
    ]);

    setActivePageId(newPageId);
  };

  const applicationinformationformData: FormData = {
    elements: [
      {
        id: `HTXTBasicInformation-${Date.now()}`,
        type: "headertext",
        label: "Basic Information",
        required: false,
        minLength: 0,
        maxLength: 0,
        pattern: "",
        value: "",
        options: [],
        errorMessages: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `firstName-${Date.now()}`,
        type: "text",
        label: "First name",
        required: true,
        minLength: 0,
        maxLength: 50,
        pattern: "",
        value: "",
        options: [],
        errorMessages: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `MiddleName-${Date.now()}`,
        type: "text",
        label: "Middle name",
        required: true,
        minLength: 0,
        maxLength: 50,
        pattern: "",
        value: "",
        options: [],
        errorMessages: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `LastName-${Date.now()}`,
        type: "text",
        label: "Last name",
        required: false,
        minLength: 0,
        maxLength: 50,
        pattern: "",
        value: "",
        options: [],
        errorMessages: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `gender-${Date.now()}`,
        type: "radio",
        label: "Gender",
        required: true,
        minLength: 0,
        maxLength: 0,
        pattern: "",
        value: "",
        options: [
          { value: "MALE", label: "Male" },
          { value: "FEMALE", label: "Female" },
          { value: "NOTTODISCLOSE", label: "Not to disclose" },
        ],
        errorMessages: [],
        alignment: "Horizontal",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `dob-${Date.now()}`,
        type: "date",
        label: "Date of birth",
        required: true,
        minLength: 0,
        maxLength: 0,
        pattern: "",
        value: "",
        options: [],
        errorMessages: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `profileimage-${Date.now()}`,
        type: "file",
        label: "Profile photo",
        required: true,
        minLength: 0,
        maxLength: 0,
        pattern: "",
        value: "",
        options: [],
        errorMessages: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 1,
        minFiles: 0,
        maxSizeInMB: 2,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `country-${Date.now()}`,
        type: "select",
        label: "Country",
        required: true,
        minLength: 0,
        maxLength: 0,
        pattern: "",
        value: "",
        options: [{ value: "INDIA", label: "India" }],
        errorMessages: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `language-${Date.now()}`,
        type: "checkbox",
        label: "Language known",
        required: true,
        minLength: 0,
        maxLength: 0,
        pattern: "",
        value: "",
        options: [
          { value: "ENGLISH", label: "English" },
          { value: "KANNADA", label: "Kannada" },
          { value: "TAMIL", label: "Tamil" },
        ],
        errorMessages: [],
        alignment: "Horizontal",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `aboutyourself-${Date.now()}`,
        type: "textarea",
        label: "About yourself",
        required: true,
        minLength: 0,
        maxLength: 20,
        pattern: "",
        value: "",
        options: [],
        errorMessages: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 4,
      },
    ],
  };

  const communicationdetailsformData: FormData = {
    elements: [
      {
        id: "HTXTCommunicationInformation",
        type: "headertext",
        label: "Communication Information",
        required: false,
        minLength: 0,
        maxLength: 0,
        pattern: "",
        value: "",
        options: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `CurrentAddress-${Date.now()}`,
        type: "text",
        label: "Door No",
        required: true,
        minLength: 0,
        maxLength: 50,
        pattern: "",
        value: "",
        options: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `CurrentAddress1-${Date.now()}`,
        type: "text",
        label: "Address Line 1",
        required: true,
        minLength: 0,
        maxLength: 50,
        pattern: "",
        value: "",
        options: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `CurrentAddress2-${Date.now()}`,
        type: "text",
        label: "Address Line 2",
        required: true,
        minLength: 0,
        maxLength: 50,
        pattern: "",
        value: "",
        options: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
      {
        id: `Pincode-${Date.now()}`,
        type: "text",
        label: "Pin code",
        required: true,
        minLength: 0,
        maxLength: 50,
        pattern: "",
        value: "",
        options: [],
        alignment: "",
        disbled: false,
        allowedSplChars: "",
        notAllowedSplChars: "",
        toolTip: "",
        placeHolder: "",
        minDate: "",
        maxDate: "",
        isMultiple: false,
        maxFiles: 0,
        minFiles: 0,
        maxSizeInMB: 0,
        allowedFileTypes: [],
        rows: 0,
      },
    ],
  };

  const handleDragStart = (event: any) => {
    //console.log("handleDragStart");
    if (event.active.data.current === undefined) setisFormElement(true);
    else setisFormElement(false);
    setActiveDragItem(event.active.id); // Set the active drag item ID
  };

  const handleDragOver = (event: any) => {
    //console.log("handleDragOver");
    const { over } = event;

    if (over && isFormElement) {
      setOverId(over.id); // Set the hovered element ID
    } else {
      setOverId(null); // Clear it when no element is hovered
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activePage = pages.find((page) => page.id === activePageId);
    if (!activePage) return;

    const activeIndex = activePage.elements.findIndex(
      (element) => element.id === active.id
    );
    let overIndex = activePage.elements.findIndex(
      (element) => element.id === over.id
    );

    let targetIndex = event.over?.data.current?.sortable.index ?? -1;
    const pageHeaderIndex = activePage.elements.findIndex(
      (element) => element.type === "pageheadertext"
    );
    const pageFooterIndex = activePage.elements.findIndex(
      (element) => element.type === "pagefootertext"
    );

    // Prevent dragging pageHeader away from the first position
    if (
      !active.id.startsWith("pageheader") &&
      overIndex === 1 &&
      overIndex === pageHeaderIndex
    ) {
      if (!active.id.includes("-")) {
        overIndex = 2;
      } else {
        return;
      }
    }

    if (targetIndex === -1 && active.id.includes("-")) return;   
    if (pageFooterIndex > 0 && targetIndex >= pageFooterIndex) {
      if (!active.id.includes("-")) {
        targetIndex = targetIndex - 1;
      } else {
        return;
      }
    }

    const isNewElement = [
      "text",
      "select",
      "radio",
      "pagename",
      "headertext",
      "pageheadertext",
      "pagefootertext",
      "checkbox",
      "applicationinformation",
      "communicationdetails",
      "date",
      "file",
      "textarea",
    ].includes(active.id);

    if (
      active.id.startsWith("pageFooter") &&
      overIndex !== activePage.elements.length - 1
    )
      return;

    const addElementsToPage = (
      newElements: FormElement[],
      insertIndex: number
    ) => {
      setPages((prevPages) =>
        prevPages.map((page) =>
          page.id === activePageId
            ? {
                ...page,
                elements: [
                  ...page.elements.slice(0, insertIndex),
                  ...newElements,
                  ...page.elements.slice(insertIndex),
                ],
              }
            : page
        )
      );
      resetDrag();
    };

    const resetDrag = () => {
      setOverId(null);
      setActiveDragItem(null);
    };

    if (isNewElement) {
      overIndex = overIndex === -1 ? activePage.elements.length : overIndex;
      const insertIndex = Math.max(
        pageHeaderIndex === 1 ? pageHeaderIndex + 1 : 1,
        pageFooterIndex > 0
          ? Math.min(overIndex, activePage.elements.length - 1)
          : Math.min(overIndex, activePage.elements.length)
      );

      if (
        active.id === "applicationinformation" ||
        active.id === "communicationdetails"
      ) {
        const formData =
          active.id === "applicationinformation"
            ? applicationinformationformData
            : communicationdetailsformData;
        const newElements = formData.elements.map((element) => ({
          ...element,
        }));
        addElementsToPage(newElements, insertIndex);
        return;
      } else {
        const newElement: FormElement = {
          id: `${active.id}-${Date.now()}`,
          type: active.id,
          label: GetLabel(`${active.id}`),
          required: false,
          rows: active.id === "textarea" ? 4 : 0,
          minLength: active.id === "textarea" ? 10 : 0,
          maxLength: active.id === "textarea" ? 100 : 0,
          pattern: "",
          options: [],
          value: "",
          errorMessages: [],
          alignment: "",
          toolTip: "",
          placeHolder: "",
          disbled: false,
          allowedSplChars: "",
          notAllowedSplChars: "",
          minDate: active.id === "date" ? formatDate(new Date()) : "",
          maxDate: active.id === "date" ? formatDate(new Date()) : "",
          isMultiple: active.id === "file",
          maxFiles: active.id === "file" ? 2 : 0,
          minFiles: active.id === "file" ? 1 : 0,
          maxSizeInMB: active.id === "file" ? 10 : 0,
          allowedFileTypes: [],
        };
        addElementsToPage([newElement], insertIndex);
        return;
      }
    }

    if (activeIndex !== overIndex) {
      const safeOverIndex = Math.min(
        Math.max(pageHeaderIndex + 1, overIndex),
        activePage.elements.length - 2
      );
      setPages((prevPages) =>
        prevPages.map((page) =>
          page.id === activePageId
            ? {
                ...page,
                elements: arrayMove(page.elements, activeIndex, safeOverIndex),
              }
            : page
        )
      );
      resetDrag();
    } else {
      resetDrag();
    }

    // Ensure pageHeader is at the first position and pageFooter is at the last position
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === activePageId
          ? {
              ...page,
              elements: [
                ...page.elements.filter(
                  (element) => element.type === "pageheadertext"
                ),
                ...page.elements.filter(
                  (element) =>
                    element.type !== "pageheadertext" &&
                    element.type !== "pagefootertext"
                ),
                ...page.elements.filter(
                  (element) => element.type === "pagefootertext"
                ),
              ],
            }
          : page
      )
    );
  };

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const removeItem = (
    itemId: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setSelectedElement(null);
    setIsPropertiesVisible(false);
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === activePageId
          ? {
              ...page,
              elements: page.elements.filter(
                (element) => element.id !== itemId
              ),
            }
          : page
      )
    );
  };

  const removePage = (
    pageId: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setSelectedElement(null);
    setIsPropertiesVisible(false);
    setPages((prevPages) => {
      const updatedPages = prevPages.filter((page) => page.id !== pageId);
      if (updatedPages.length > 0) {
        if (activePageId === pageId) {
          setActivePageId(updatedPages[0].id);
        }
      }
      return updatedPages;
    });
  };

  useEffect(() => {
    if (selectedElement && activePageId) {
      // Find the page with the activePageId
      const updatedPages = pages.map((page) => {
        if (page.id === activePageId) {
          if (page.id === selectedElement.id) {
            // Find and update the correct element in the elements array
            const updatedElements = page.elements.map((element) =>
              element.id === selectedElement.id
                ? { ...selectedElement }
                : element
            );
            // Return the updated page with modified elements
            return { ...page, elements: updatedElements };
          } else {
            // Find and update the correct element in the elements array
            const updatedElements = page.elements.map((element) =>
              element.id === selectedElement.id
                ? { ...selectedElement }
                : element
            );
            // Return the updated page with modified elements
            return { ...page, elements: updatedElements };
          }
        }
        return page; // Return unchanged page if it's not the active page
      });
      // Update the pages state with the modified elements in the correct page
      setPages(updatedPages);
    }
  }, [selectedElement, activePageId]);

  const handlePageClick = (page: Page) => {
    setActivePageId(page.id);
    const Element = page.elements.filter(
      (element) => element.type === "pagename"
    );
    if (Element[0]) {
      setSelectedElement(Element[0]);
      setIsPropertiesVisible(true);
      setIsToolboxVisible(false);
    }
  };

  const PreviewForm = () => {
    if (isJsonGenerated) window.open("/FormViewer", "_blank");
  };

  const generateJson = () => {
    SetisJsonGenerated(false);
    localStorage.setItem("JSONData", "");
    const formData = {
      title: "Form Viewer",
      isformsubmitted: false,
      pages: Array.from(pages.entries()).map(([id, elements]) => {
        let pageTitle = "Untitled Page";
        const pageNameElement = elements.elements.filter(
          (element) => element.type === "pagename"
        );
        pageTitle =
          pageNameElement.length > 0
            ? "" + pageNameElement[0].label?.toString()
            : "Untitled Page";

        return {
          title: pageTitle,
          isformsubmitted: false,
          elements: elements.elements
            .filter((ele) => ele.type !== "pagename")
            .map((element) => ({
              id: element.id,
              type: element.type,
              label: element.label,
              required: element.required || false,
              minLength: element.minLength || 0,
              maxLength: element.maxLength || 0,
              pattern: PatternParse(element.pattern) || "",
              alignment:
                element.type === "radio" || element.type === "checkbox"
                  ? AlignmentParse(element.alignment) || ""
                  : "",
              value: element.value || "",
              options: element.options || [],
              errorMessages: element.errorMessages || [],
              allowedSplChars: element.allowedSplChars,
              notAllowedSplChars: element.notAllowedSplChars,
              toolTip: element.toolTip,
              placeHolder: element.placeHolder,
              minDate: element.minDate,
              maxDate: element.maxDate,
              isMultiple: element.isMultiple,
              maxFiles: element.maxFiles,
              minFiles: element.minFiles,
              maxSizeInMB: element.maxSizeInMB,
              allowedFileTypes: element.allowedFileTypes,
              rows: element.rows,
            })),
        };
      }),
    };

    console.log(JSON.stringify(formData, null, 2)); // Log the generated JSON

    localStorage.setItem("JSONData", JSON.stringify(formData, null, 2));
    SetisJsonGenerated(true);
  };

  function PatternParse(pattern?: string) {
    let patternstring = "";
    switch (pattern) {
      case "None":
        patternstring = "NONE";
        break;
      case "Alphabets":
        patternstring = "ALPHABETS";
        break;
      case "Numbers":
        patternstring = "NUMERIC";
        break;
      case "AlphaNumeric":
        patternstring = "ALPHANUMERIC";
        break;
      case "PhoneNumber":
        patternstring = "PHONENUMBER";
        break;
      case "Email":
        patternstring = "EMAIL";
        break;
      case "Aadhar":
        patternstring = "AADHAR";
        break;
      case "Text":
        patternstring = "TEXT";
        break;
      default:
        patternstring = "NONE";
        break;
    }
    return patternstring;
  }

  function AlignmentParse(alignment?: string) {
    let alignmentstring = "";
    switch (alignment) {
      case "Vertical":
        alignmentstring = "VERTICAL";
        break;
      case "Horizontal":
        alignmentstring = "HORIZONTAL";
        break;
      default:
        alignmentstring = "VERTICAL";
        break;
    }
    return alignmentstring;
  }

  function GetLabel(id: string) {
    if (id.search("-") > 0) {
      id = id.split("-")[0];
    }
    switch (id) {
      case "applicationinformation":
        return "Basic Information";
      case "communicationdetails":
        return "Communication Information";
      case "text":
        return "Text box";
      case "select":
        return "Dropdown";
      case "radio":
        return "Radio";
      case "headertext":
        return "Section title";
      case "pageheadertext":
        return "Header Instructions";
      case "pagefootertext":
        return "Footer Instructions";
      case "checkbox":
        return "Checkbox";
      case "date":
        return "Date picker";
      case "file":
        return "File upload";
      case "textarea":
        return "Text area";
      default:
        return id;
    }
  }

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex p-4 space-x-4 bg-gray-100 min-h-[760px]">
        {/* Toolbox Area - conditionally rendered with transitions */}
        {isToolboxVisible && (
          <div className="transition-all duration-500 w-1/5 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
            <Toolbox />
          </div>
        )}

        {/* Toggle Button for Toolbox */}
        <div className="flex items-center mx-2">
          <button
            onClick={() => setIsToolboxVisible((prev) => !prev)}
            className="p-2 text-lg text-white bg-blue-500 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl focus:ring-4 focus:ring-blue-200"
          >
            <FontAwesomeIcon
              icon={isToolboxVisible ? faAngleDoubleLeft : faAngleDoubleRight}
              className="h-4 w-4 text-white"
            />
          </button>
        </div>

        {/* Main Workspace */}
        <div
          className={`transition-all duration-500 rounded-lg shadow-md overflow-y-auto relative p-6 bg-white ${
            isPropertiesVisible
              ? isToolboxVisible
                ? "w-2/4"
                : "w-3/4"
              : isToolboxVisible
              ? "w-4/5"
              : "w-full"
          }`}
        >
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={addPage}
              className="bg-customBlue text-white px-6 py-2 font-semibold rounded-md shadow-md transition duration-300 transform hover:bg-customOrange hover:-translate-y-1"
            >
              Add Page
            </button>
            <button
              onClick={generateJson}
              className="bg-customBlue text-white px-6 py-2 font-semibold rounded-md shadow-md transition duration-300 transform hover:bg-customOrange hover:-translate-y-1"
            >
              Save Form
            </button>
            <button
              onClick={PreviewForm}
              className={`bg-customBlue text-white px-6 py-2 font-semibold rounded-md shadow-md ${
                !isJsonGenerated
                  ? "disabled bg-customgrey cursor-not-allowed"
                  : "transition duration-300 transform hover:bg-customOrange hover:-translate-y-1"
              }`}
            >
              Preview Form
            </button>
          </div>

          {/* Placeholder Message when No Pages */}
          {pages.length === 0 && (
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 -ml-24 text-gray-500 text-lg font-medium whitespace-nowrap">
              Click on Add Page to add the elements
            </div>
          )}

          {/* Page Tabs */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {pages.map((page) => {
                const pageNameElement = page.elements.find(
                  (element) => element.type === "pagename"
                );
                return (
                  <div key={page.id} className="flex items-center space-x-2">
                    <div
                      onClick={() => handlePageClick(page)}
                      className={`block p-2 rounded cursor-pointer ${
                        activePageId === page.id ? "bg-blue-200" : "bg-gray-200"
                      } mb-2`}
                    >
                      {/* Display the label of the element with type "pagename" */}
                      {pageNameElement
                        ? pageNameElement.label
                        : "Untitled Page"}

                      <button
                        className="pl-2"
                        onClick={(event) => removePage(page.id, event)}
                      >
                        <FontAwesomeIcon
                          key={`${page.id}-icon`}
                          icon={faTrashAlt}
                          className="h-4 w-4 text-customRed"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Build Area */}
          {pages.length > 0 && (
            <FormBuildArea
              elements={
                pages.find((page) => page.id === activePageId)?.elements || []
              }
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              removeItem={removeItem}
              isPropertiesVisible={isPropertiesVisible}
              setIsPropertiesVisible={setIsPropertiesVisible}
              overId={overId}
              setIsToolboxVisible={setIsToolboxVisible}
            />
          )}
        </div>

        {/* Toggle Button for Properties Panel */}
        <div className="flex items-center mx-2">
          <button
            onClick={() => setIsPropertiesVisible((prev) => !prev)}
            className="p-2 text-lg text-white bg-blue-500 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl focus:ring-4 focus:ring-blue-200"
          >
            <FontAwesomeIcon
              icon={
                isPropertiesVisible ? faAngleDoubleRight : faAngleDoubleLeft
              }
              className="h-4 w-4 text-white"
            />
          </button>
        </div>

        {/* Properties Panel */}
        {isPropertiesVisible && (
          <div className="transition-all duration-500 w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg overflow-y-auto">
            <Properties
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
            />
          </div>
        )}

        {/* Drag Overlay */}
        <DragOverlay>
          {activeDragItem && activeDragItem.search("-") < 0 ? (
            <div className="p-2 bg-blue-100 rounded-md shadow-md">
              {activeDragItem !== "" && GetLabel(activeDragItem)}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default FormBuilder;
