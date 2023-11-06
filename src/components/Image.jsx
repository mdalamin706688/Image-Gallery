import React, { useState } from "react";
import "../styles/image.css";

function Image({
  index,
  image,
  isSelected,
  isFeature,
  handleImageReorder,
  toggleImageSelectionCheckbox,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("text/plain");
    const hoverIndex = index;

    if (dragIndex !== hoverIndex) {
      handleImageReorder(parseInt(dragIndex), hoverIndex); 
    }

    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`image ${isSelected ? "selected" : ""} ${
        isFeature ? "feature" : ""
      } ${isDragging ? "dragging" : ""}`}
    >
      {isFeature && <div className="feature-tag">Feature</div>}
      {image.id !== 12 && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleImageSelectionCheckbox(image.id)}
          className="checkbox"
        />
      )}
      <img className="" src={image.src} alt={`Image ${image.id}`} />
    </div>
  );
}

export default Image;
