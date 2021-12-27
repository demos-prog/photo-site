// import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Close from "./img/Close.png";
import "./photos.css";
import "./modal.css";

export default function Modal(props) {
  const link = `https://picsum.photos/id/${props.item.id}/600/400`;
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [commen, setCommen] = useState("");

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

  async function sendPost(e) {
    e.preventDefault();
    const now = new Date();
    const id = Math.round(Math.random() * 100 + Math.round(Math.random() * 10));
    const newComment = { id: id, text: commen, date: now };
    const fch = await fetch(
      `https://boiling-refuge-66454.herokuapp.com/images/${props.item.id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(newComment),
      }
    );
    if (fch.ok) {
      alert("comment sended");
    } else {
      alert("not ok");
    }
    setName("");
    setCommen("");
  }

  return (
    <div className="modal" style={{ top: `${window.pageYOffset}px` }}>
      <div className="modalBody">
        <div className="modalImgPlusInfo">
          <div id="wrp">
            <div className="modalImg">
              <img src={link} alt={link}></img>
            </div>
            <div className="comments">{comments}</div>
          </div>
          <div className="close">
            <img
              onClick={() => props.setIndex(-1)}
              src={Close}
              alt="close"
            ></img>
          </div>
        </div>
        <form onSubmit={sendPost} className="form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your name"
          ></input>
          <input
            type="text"
            value={commen}
            onChange={(e) => setCommen(e.target.value)}
            placeholder="your comment"
          ></input>
          <button type="submit">Leave comment</button>
        </form>
      </div>
      <div onClick={() => props.setIndex(-1)} className="modalBG"></div>
    </div>
  );
}
