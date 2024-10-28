// src/components/Dropzone.tsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DropzoneProps {
  children: React.ReactNode;
}

const Dropzone: React.FC<DropzoneProps> = ({ children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "form-builder-dropzone",
  });

  const style = {
    border: isOver ? "2px solid blue" : "2px dashed gray",
    padding: "5px",
    minHeight: "550px",
    backgroundColor: isOver ? "#f0f0f0" : "#fff",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Dropzone;
