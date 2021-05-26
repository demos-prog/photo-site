// import { nanoid } from "nanoid";
import "./photos.css";
import Close from "./img/Close.png";
import React from "react";

export default function Modal(props) {
  return (
    <div className="modal">
      <div className="modalBody">
        <div className="modalImgPlusInfo">
          <div className="modalImg">
            <img
              src={props.item.url}
              alt="https://picsum.photos/id/237/600/400"
            ></img>
          </div>
          <div className="comments">
            <div className="commentsItem">
              <div className="commentsItem__date">18.12.2019</div>
              <div className="commentsItem__comment">good photo</div>
            </div>
          </div>
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
