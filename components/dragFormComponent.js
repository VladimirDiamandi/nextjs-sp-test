/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import style from "../styles/dragform.module.scss";
import debounce from "lodash.debounce";

function DragFormComponent({
  drag,
  dragStartHandler,
  dragLeaveHandler,
  onDropHandler,
  onDelete,
  onChangeTitle,
  onChangeDesc,
}) {
  const onChangeTitleHandler = (val) => {
    debounceT(val);
  };
  const onChangeDescHandler = (val) => {
    debounceD(val);
  };

  const debounceT = useCallback(debounce(onChangeTitle, 600), []);
  const debounceD = useCallback(debounce(onChangeDesc, 600), []);

  return (
    <div className={style.wrapper}>
      <div className={style.headerform}>
        <input
          name="title"
          placeholder="Title"
          onChange={(e) => onChangeTitleHandler(e.target.value)}
        ></input>
        <textarea
          name="description"
          placeholder="Description"
          onChange={(e) => onChangeDescHandler(e.target.value)}
        ></textarea>
      </div>
      <div
        className={style.dragwrapper}
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
        onDrop={(e) => onDropHandler(e)}
      >
        {drag ? (
          <div style={{ backgroundColor: "gray" }} className={style.dragplace}>
            <h1>Let go</h1>
          </div>
        ) : (
          <div className={style.dragplace}>
            <h1>Drag photos here</h1>
          </div>
        )}
      </div>
      <div className={style.deletebtn} onClick={onDelete}>
        <h1>Delete ALL photos</h1>
      </div>
    </div>
  );
}

export default DragFormComponent;
