import React, { useState, useEffect } from "react";
import Image from "./Image";
import "../styles/gallery.css";

function Gallery() {
  const [images, setImages] = useState([
    { id: 1, src: "./images/image-11.jpeg", isFeature: true },
    { id: 2, src: "./images/image-2.png", isFeature: false },
    { id: 3, src: "./images/image-3.png", isFeature: false },
    { id: 4, src: "./images/image-4.png", isFeature: true },
    { id: 5, src: "./images/image-5.png", isFeature: false },
    { id: 6, src: "./images/image-6.png", isFeature: false },
    { id: 7, src: "./images/image-7.webp", isFeature: true },
    { id: 8, src: "./images/image-8.webp", isFeature: false },
    { id: 9, src: "./images/image-9.webp", isFeature: false },
    { id: 10, src: "./images/image-10.jpeg", isFeature: true },
    { id: 11, src: "./images/image-1.png", isFeature: false },
    { id: 12, src: "./images/image-12.png" },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);

  const [featureImage, setFeatureImage] = useState(
    images.find((image) => image.isFeature)
  );

  useEffect(() => {
    const updatedFeatureImage = images.find((image) => image.isFeature);
    setFeatureImage(updatedFeatureImage);
  }, [images]);

  const handleImageReorder = (dragIndex, hoverIndex) => {
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);

    if (hoverIndex === 0) {
      draggedImage.isFeature = true;
      setFeatureImage(draggedImage);
    } else if (dragIndex === 0 && !draggedImage.isFeature) {
      const newFeatureImage = updatedImages.find((image) => !image.isFeature);
      if (newFeatureImage) {
        newFeatureImage.isFeature = true;
        setFeatureImage(newFeatureImage);
      }
    }

    setImages(updatedImages);
  };

  const toggleImageSelection = (id) => {
    const newSelectedImages = selectedImages.includes(id)
      ? selectedImages.filter((selectedId) => selectedId !== id)
      : [...selectedImages, id];
    setSelectedImages(newSelectedImages);
  };

  const toggleImageSelectionCheckbox = (id) => {
    toggleImageSelection(id);
  };

  const handleDeleteImages = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const isDeleteButtonVisible = selectedImages.length > 0;
  const isCheckboxIconVisible = selectedImages.length > 0;

  return (
    <div>
      {isDeleteButtonVisible && (
        <div className="delete">
          <div className="selected-count">
            {isCheckboxIconVisible && (
              <div className="checkbox-icon">
                <i class="fa-solid fa-square-check"></i>
              </div>
            )}
            {selectedImages.length} Files Selected
          </div>
          <button onClick={handleDeleteImages} className="delete-button">
            Delete Files
          </button>
        </div>
      )}

      <div className="gallery">
        {images.map((image, index) => (
          <Image
            key={image.id}
            index={index}
            image={image}
            isSelected={selectedImages.includes(image.id)}
            isFeature={featureImage && image.id === featureImage.id}
            handleImageReorder={handleImageReorder}
            className="image"
            toggleImageSelection={toggleImageSelection}
            toggleImageSelectionCheckbox={toggleImageSelectionCheckbox}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
