import React from "react";
import style from "../styles/gallery.module.scss";

function PaginationComponent({ nextPage, prevPage, startPage }) {
  return (
    <div>
      <div className={style.footer}>
        <div className={style.footernav} onClick={prevPage}>
          <i className="ri-arrow-left-line"></i>
        </div>
        <div className={style.footernav} onClick={startPage}>
          <i className="ri-home-line"></i>
        </div>
        <div className={style.footernav} onClick={nextPage}>
          <i className="ri-arrow-right-line"></i>
        </div>
      </div>
    </div>
  );
}

export default PaginationComponent;
