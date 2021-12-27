import { nanoid } from "nanoid";
import "./photos.css";
import React, { useEffect, useState } from "react";
import Modal from "./modal";
import loadingImg from "./img/Double Ring-1s-374px.png";

export default function Photos() {
  const [phList, setPhList] = useState([]);
  const [index, setIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPhotosList() {
      const fch = await fetch(
        "https://boiling-refuge-66454.herokuapp.com/images"
      );
      const photosList = await fch.json();
      setPhList(photosList);
      setIsLoading(false);
    }
    getPhotosList();
  }, []);

  const list = phList.map((item, ind) => {
    return (
      <div className="item" key={nanoid()}>
        <img onClick={() => setIndex(ind)} alt={item.url} src={item.url}></img>
        {ind === index && <Modal item={item} setIndex={setIndex} />}
      </div>
    );
  });

  return (
    <>
      <div className="container">
        <div className="header">
          <strong>
            <div>TEST APP</div>
          </strong>
        </div>
        <div className="list">
          {isLoading ? (
            <img id="loader" src={loadingImg} alt="Loading"></img>
          ) : (
            list
          )}
        </div>
        <div className="footer">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://sites.google.com/view/burlykodmitry/%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F-%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0"
          >
            Dmitry
          </a>
        </div>
      </div>
    </>
  );
}
