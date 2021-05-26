import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

export default function Photos() {
  const [phList, setPhList] = useState([]);

  useEffect(() => {
    async function getPhotosList() {
      const fch = await fetch(
        "https://boiling-refuge-66454.herokuapp.com/images"
      );
      const photosList = await fch.json();
      setPhList(photosList);
    }
    getPhotosList();
  }, []);

  // async function getImg (url){
  //  return await fetch(url)
  // }

  const list = phList.map((item) => {
    return (
      <div key={nanoid()}>
        <div>{item.id}</div>
        <img src={item.url}></img>
      </div>
    );
  });

  return (
    <>
      <div>
        <strong>TEST APP</strong>
      </div>
      {list}
    </>
  );
}
