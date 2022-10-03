import React, { useState, useEffect } from "react";
import Header from "./Components/header";
import NavBar from "./Components/navbar";
import Footer from "./Components/footer";
import Post from "./Components/post";
import * as Icon from "react-feather";
import CreateNews from "./Components/create-news";
import API from "./api";
import { toast } from "react-toastify";

function HomePage() {
  document.title = "Home page";
  const size = 5;
  const [isPost, setIsPost] = useState(false);
  const [posts, setPost] = useState([]);
  const [editID, setEditID] = useState(0);
  const [user, setUser] = useState({
    id: "",
    full_name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    birth_date: "",
    department_id: "",
    url_avata: "",
    working_date: "",
    position_id: "",
    department_name: "",
    position_name: "",
    month: "",
    value: "",
  });
  const onOpenPost = () => {
    setEditID(0);
    setIsPost(!isPost);
  };

  useEffect(() => {
    getNews(0);
    getProfile();
  }, []);

  const getProfile = async () => {
    await API.getAPIData("/get-profile.php").then((res) => {
      if (res.success) {
        setUser(res.data);
      } else {
        toast.error(res.message);
      }
    });
  };

  const getNews = async (offset) => {
    await API.getAPIData(`/get-news.php?size=${size}&offset=${offset}`).then(
      (res) => {
        if (res.success) {
          setPost(res.data);
        } else {
          toast.error("Internal server error!");
        }
      }
    );
  };

  const onConfirmPost = () => {
    onOpenPost();
    getNews(0);
  };

  const onEditPost = (id) => {
    onOpenPost();
    setEditID(id);
  };

  return (
    <section>
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Home" />
        <div className="container-fluid px-2 px-md-4">
          {/* <div
            className="page-header min-height-300 border-radius-xl mt-4"
            style={{
              backgroundImage:
                'url("https://fullstack-react-soft-dashboard.appseed-srv1.com/static/media/curved0.d146ec6e.jpg")',
            }}
          ></div> */}
          <div className="card card-body mx-3 mx-md-4 ">
            {/* mt-n6 */}
            <div className="row gx-4 mb-2">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src={"/images/" + user.url_avata}
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">{user.full_name}</h5>
                  <p className="mb-0 font-weight-normal text-sm">
                    {user.department_name} / {user.position_name}
                  </p>
                </div>
              </div>
              <div className="col-auto my-auto">
                <button
                  className="btn btn-outline-info btn-sm mt-2"
                  onClick={() => onOpenPost()}
                >
                  <span>
                    <Icon.Plus /> Create News
                  </span>
                </button>
              </div>
              {/* <button
                className="btn btn-outline-info display-mone-mobile"
                onClick={() => onOpenPost()}
                style={{
                  position: "absolute",
                  right: "12px",
                  width: "23px",
                  bottom: "-6px",
                  padding: "0px",
                }}
              >
                <span>
                  <Icon.Plus size={10} />
                </span>
              </button> */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 mb-4">
              {posts.map((value, index) => {
                return (
                  <Post
                    key={index}
                    data={value}
                    onEditPost={onEditPost}
                    user_id={user.id}
                  />
                );
              })}
            </div>
            <div className="col-md-4 mb-4 display-mone-mobile">
              <div className="card mt-4">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0 txt-linear-gradient-gr text-xl">
                        Digital Marketing
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="row">
                    <p>
                      A group of people who collectively are responsible for all
                      of the work necessary to produce working, validated
                      assets.
                    </p>
                    {/* <hr className="css-1pcem6n-MuiDivider-root" /> */}
                    {/* <span className="badge badge-sm bg-gradient-success">
                      MARKETING TEAM
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <CreateNews
          visible={isPost}
          onClose={onOpenPost}
          onConfirm={onConfirmPost}
          id={editID}
        />
      </main>
    </section>
  );
}

export default HomePage;
