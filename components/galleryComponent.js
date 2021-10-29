import React, { useState, useEffect } from "react";
import Image from "next/image";
import style from "../styles/gallery.module.scss";

import PaginationComponent from "./paginationComponent";

function GalleryComponent({}) {
  function importAll(r) {
    return r.keys().map(r);
  }
  const images = importAll(
    require.context("../public/images", false, /\.(png|jpe?g|svg)$/)
  );
  const jsonInfo = require("../pages/api/data.json");
  const [page, setPage] = useState(1);
  const [init, setInit] = useState(false);
  const [startImages, setStartImages] = useState(null);
  const [showBegin, setShowBegin] = useState(0);
  const [showEnd, setShowEnd] = useState(9);
  const [totalPage, setTotalPage] = useState(null);
  const [showImages, setShowImages] = useState();

  const nextPage = () => {
    if (totalPage > page) {
      setPage(page + 1);
      setShowBegin(showBegin + 9);
      setShowEnd(showEnd + 9);
      setShowImages(images.slice(showBegin + 9, showEnd + 9));
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setShowBegin(showBegin - 9);
      setShowEnd(showEnd - 9);
      setShowImages(images.slice(showBegin - 9, showEnd - 9));
    }
  };
  const startPage = () => {
    setPage(1);
    setShowBegin(0);
    setShowEnd(9);
    setShowImages(images.slice(0, 9));
  };

  useEffect(() => {
    if (images) {
      let totalPages = Math.ceil(images.length / 9);
      if (totalPages && !isNaN(totalPages)) {
        setTotalPage(totalPages);
      }
    }
  }, [images]);

  useEffect(() => {
    const setImages = () => {
      if (images && !init) {
        setStartImages(images);
        setShowImages(images.slice(0, 9));
        setInit(true);
      }
    };
    setImages();
  }, [images, init]);

  useEffect(() => {
    setPage(1);
    setShowBegin(0);
    setShowEnd(9);
    setShowImages(images.slice(0, 9));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h2>{jsonInfo.title ? jsonInfo.title : "Type title"}</h2>
        <p>
          {jsonInfo.description ? jsonInfo.description : "Type description"}
        </p>
      </div>

      <div className={style.gallery}>
        {showImages?.length ? (
          showImages.map((item, i) => (
            <div className={style.image} key={i}>
              <>
                <span>
                  <i className="ri-eye-line"></i>
                </span>

                <Image
                  objectFit="cover"
                  layout="fill"
                  src={item?.default?.src}
                  alt="image"
                  priority="true"
                />
              </>
            </div>
          ))
        ) : (
          <div className={style.imagePlaceholderWrapper}>
            <div className={style.imagePlaceholder}>
              <h1>No photos yet</h1>
            </div>
          </div>
        )}
      </div>
      {images.length > 9 && (
        <PaginationComponent
          nextPage={nextPage}
          prevPage={prevPage}
          startPage={startPage}
        />
      )}
    </div>
  );
}

export default GalleryComponent;
