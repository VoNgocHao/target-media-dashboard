import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";
import parse from "html-react-parser";
import { timePost } from "../helper";
import API from "../api";

function Post({ data, onEditPost, user_id }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComments(data.comments || []);
  }, [data]);

  const onSave = async (news_id) => {
    await API.postParam("comment-save.php", {
      news_id: news_id,
      content: comment,
      user_id: 1,
    }).then((res) => {
      if (res.success) {
        setComment("");
        setComments(res.data);
      }
    });
  };

  return (
    <div className="card mt-4">
      <div className="card-header pb-0 p-3">
        <div className="row">
          <div className="col-auto">
            <div className="avatar avatar-lg position-relative">
              <img
                src={"/images/" + data.url_avata}
                alt="profile_image"
                className="w-100 border-radius-lg shadow-sm"
              />
            </div>
          </div>
          <div className="col-auto my-auto p-0">
            <div className="h-100">
              <h6 className="mb-1">{data.full_name}</h6>
              <p className="mb-0 font-weight-normal text-xs">
                {timePost(data.created_at || "")}
              </p>
            </div>
          </div>
          {user_id === data.created_by && (
            <div className="col p-0 text-end mx-2">
              <span
                className="cursor-pointer"
                onClick={() => onEditPost(data.id)}
              >
                <Icon.Edit3 size={18} />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="card-body p-3">
        <div className="row bd-news-post">
          {parse(data.content || "")}
          <div className="card-footer d-flex">
            <div className="d-flex px-2" style={{ alignItems: "baseline" }}>
              <Icon.ThumbsUp size={16} />
              <span>150</span>
            </div>
            <div className="d-flex px-2" style={{ alignItems: "baseline" }}>
              <Icon.MessageSquare size={16} />
              <span>{comments.length}</span>
            </div>
          </div>
          <hr className="css-1pcem6n-MuiDivider-root" />
          <div className="card-footer">
            {comments.map((value, index) => {
              return (
                <div className="row mb-4" key={index}>
                  <div className="col-auto">
                    <div className="avatar avatar-lg rounded-circle">
                      <img
                        src={"/images/" + value.url_avata}
                        alt="profile_image"
                        className="w-100 border-radius-lg shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="col-sm-10 my-auto p-0">
                    <div className="h-100">
                      <h6 className="mb-1">{value.full_name}</h6>
                      <p className="mb-0 font-weight-normal text-sm">
                        {value.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="row">
              <div className="col-auto">
                <div className="avatar avatar-lg rounded-circle">
                  <img
                    src={"/images/" + data.url_avata}
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-md-9 my-auto p-0">
                <div className="h-100">
                  <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div className="input-group input-group-outline">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Write your comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={1000}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-1">
                <button
                  className="btn btn-outline-info btn-sm mt-2"
                  onClick={() => onSave(data.id)}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
