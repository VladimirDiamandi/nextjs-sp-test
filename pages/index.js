import React, { useState } from "react";
import DragFormComponent from "../components/dragFormComponent";
import GalleryComponent from "../components/galleryComponent";

export default function Home() {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = async (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    const body = new FormData();
    for (let index = 0; index < files.length; index++) {
      body.append(`file${index}`, files[index]);
    }
    const response = await fetch("/api/photos", {
      method: "POST",
      body,
    });

    setDrag(false);
  };
  const onDelete = async () => {
    const response = await fetch("/api/photos", {
      method: "DELETE",
    });
    setDrag(false);
  };

  const onChangeTitle = async (title) => {
    const body = { title };

    const response = await fetch("/api/file", {
      method: "PUT",
      body: JSON.stringify(body),
    });
  };
  const onChangeDesc = async (description) => {
    const body = { description };

    const response = await fetch("/api/file", {
      method: "PUT",
      body: JSON.stringify(body),
    });
  };

  return (
    <div className="wrapper">
      <DragFormComponent
        drag={drag}
        dragStartHandler={dragStartHandler}
        dragLeaveHandler={dragLeaveHandler}
        onDropHandler={onDropHandler}
        onDelete={onDelete}
        onChangeTitle={onChangeTitle}
        onChangeDesc={onChangeDesc}
      />
      <GalleryComponent />
    </div>
  );
}
