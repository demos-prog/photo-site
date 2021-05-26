// import { nanoid } from "nanoid";
import "./photos.css";
import Close from "./img/Close.png";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function Modal(props) {
  const link = `https://picsum.photos/id/${props.item.id}/600/400`;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const fch = await fetch(
        `https://boiling-refuge-66454.herokuapp.com/images/${props.item.id}`
      );
      const obj = await fch.json();
      let comms = obj.comments.map((item) => {
        const date = new Date(item.date);
        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        return (
          <div key={nanoid()} className="commentsItem">
            <div className="commentsItem__date">{`${day}.${
              month + 1
            }.${year}`}</div>
            <div className="commentsItem__comment">{item.text}</div>
          </div>
        );
      });
      setComments(comms);
    }
    getComments();
  }, [props.item.id]);

  return (
    <div className="modal">
      <div className="modalBody">
        <div className="modalImgPlusInfo">
          <div className="modalImg">
            <img src={link} alt={link}></img>
          </div>
          <div className="comments">{comments}</div>
          <div className="close">
            <img
              onClick={() => props.setIndex(-1)}
              src={Close}
              alt="close"
            ></img>
          </div>
        </div>
        <form className="form">
          <input type="text" placeholder="your name"></input>
          <input type="text" placeholder="your comment"></input>
          <button type="submit">Leave comment</button>
        </form>
      </div>
      <div onClick={() => props.setIndex(-1)} className="modalBG"></div>
    </div>
  );
}
