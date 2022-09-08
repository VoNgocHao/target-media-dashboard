import React from "react";
import * as Icon from "react-feather";
function Post({ title }) {
  return (
    <div className="card mt-4">
      <div className="card-header pb-0 p-3">
        <div className="row">
          <div className="col-auto">
            <div className="avatar avatar-lg position-relative">
              <img
                src="https://fullstack-react-soft-dashboard.appseed-srv1.com/static/media/team-4.a1e1c29f.jpg"
                alt="profile_image"
                className="w-100 border-radius-lg shadow-sm"
              />
            </div>
          </div>
          <div className="col-auto my-auto p-0">
            <div className="h-100">
              <h6 className="mb-1">Richard Davis</h6>
              <p className="mb-0 font-weight-normal text-xs">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body p-3">
        <div className="row">
          <p className="text-xl">
            Personal profiles are the perfect way for you to grab their
            attention and persuade recruiters to continue reading your CV
            because you’re telling them from the off exactly why they should
            hire you.
          </p>
          <img
            src="https://fullstack-react-soft-dashboard.appseed-srv1.com/static/media/work-space.aef49011.jpeg"
            alt="logo"
          />
          <div className="card-footer d-flex">
            <div className="d-flex px-2" style={{ alignItems: "baseline" }}>
              <Icon.ThumbsUp size={16} />
              <span>150</span>
            </div>
            <div className="d-flex px-2" style={{ alignItems: "baseline" }}>
              <Icon.MessageSquare size={16} />
              <span>150</span>
            </div>
          </div>
          <hr className="css-1pcem6n-MuiDivider-root" />
          <div className="card-footer">
            <div className="row mb-4">
              <div className="col-auto">
                <div className="avatar avatar-lg rounded-circle">
                  <img
                    src="https://fullstack-react-soft-dashboard.appseed-srv1.com/static/media/team-3.b75146da.jpg"
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-sm-10 my-auto p-0">
                <div className="h-100">
                  <h6 className="mb-1">Richard Davis</h6>
                  <p className="mb-0 font-weight-normal text-sm">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves!
                  </p>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-auto">
                <div className="avatar avatar-lg rounded-circle">
                  <img
                    src="https://fullstack-react-soft-dashboard.appseed-srv1.com/static/media/team-5.bba518ed.jpg"
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-sm-10 my-auto p-0">
                <div className="h-100">
                  <h6 className="mb-1">Jessica Stones</h6>
                  <p className="mb-0 font-weight-normal text-sm">
                    Society has put up so many boundaries, so many limitations
                    on what’s right and wrong that it’s almost impossible to get
                    a pure thought out. It’s like a little kid, a little boy.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-auto">
                <div className="avatar avatar-lg rounded-circle">
                  <img
                    src="https://fullstack-react-soft-dashboard.appseed-srv1.com/static/media/team-4.a1e1c29f.jpg"
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-md-9 my-auto p-0">
                <div className="h-100">
                  <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div class="input-group input-group-outline">
                      <textarea
                        type="text"
                        class="form-control"
                        placeholder="Write your comment"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-1">
                <button className="btn btn-outline-info btn-sm mt-2">
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
