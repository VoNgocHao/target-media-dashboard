import React, { useState, useEffect } from "react";
import Header from "./Components/header";
import NavBar from "./Components/navbar";
import Footer from "./Components/footer";
import Post from "./Components/post";
import * as Icon from "react-feather";
import CreateNews from "./Components/create-news";
import API from "./api";
import { toast } from "react-toastify";
import SubNews from "./Components/sub-news";
import CreateSubNews from "./Components/create-sub-news";

function HomePage() {
  document.title = "Thông tin nội bộ";
  const size = 5;
  const [loading, setLoading] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [isSubNews, setIsSubNews] = useState(false);
  const [subNews, setSubNews] = useState([]);
  const [posts, setPost] = useState([]);
  const [editID, setEditID] = useState(0);
  const [code, setCode] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const [subNewsID, setSubNewsID] = useState("");
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

  const onSubNews = (id) => {
    setSubNewsID(id);
    setIsSubNews(!isSubNews);
  };

  const onConfirmSubNews = () => {
    setIsSubNews(!isSubNews);
    getSubNews();
  };

  useEffect(() => {
    getNews(0);
    getProfile();
    getPermission();
    getSubNews();
    const onScroll = () => {
      if (window.innerHeight + window.scrollY > document.body.scrollHeight) {
        setInnerHeight(window.innerHeight + window.scrollY);
      }
    };
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    getNews(offSet);
  }, [innerHeight]);

  const getProfile = async () => {
    await API.getAPIData("/api/get-profile.php").then((res) => {
      if (res.success) {
        setUser(res.data);
      } else {
        toast.error(res.message);
      }
    });
  };

  const getNews = async (offset) => {
    setLoading(true);
    let offSetPage = offset ? offset : offSet;
    if (offSetPage > 0) {
      offSetPage = offSetPage * size;
    }

    await API.getAPIData(
      `/api/get-news.php?size=${size}&offset=${offSetPage}`
    ).then((res) => {
      if (res.success && res.data.length > 0) {
        setPost([...posts, ...res.data]);
        setOffSet(offSet + 1);
      }
    });
    setLoading(false);
  };
  const onConfirmPost = () => {
    onOpenPost();
    getNews(0);
  };

  const onEditPost = (id) => {
    onOpenPost();
    setEditID(id);
  };

  const getPermission = async () => {
    await API.getAPIData(`/api/get-user-permission.php`).then((res) => {
      if (res.success) {
        const ids = res.data.map((a) => a.code);
        if (ids.length) {
          setCode([...ids]);
        } else {
          setCode([]);
        }
      }
    });
  };

  const getSubNews = async () => {
    await API.getAPIData(`/api/sub-news.php`).then((res) => {
      if (res.success) {
        setSubNews(res.data);
      }
    });
  };

  return (
    <section>
      <NavBar setPmsCode={setCode} />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Thông tin nội bộ" />
        <div className="container-fluid px-2 px-md-4">
          {/* <div
            className="page-header min-height-300 border-radius-xl mt-4"
            style={{
              backgroundImage:
                'url("https://fullstack-react-soft-dashboard.appseed-srv1.com/static/media/curved0.d146ec6e.jpg")',
            }}
          ></div> */}
          <div className="card card-body mt-1">
            {/* mt-n6 */}
            <div className="row gx-4 mb-2">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src={"/api/images/" + user.url_avata}
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
              {code.includes("post_home_page") && (
                <div className="col-auto my-auto">
                  <button
                    className="btn btn-outline-info btn-sm mt-2"
                    onClick={() => onOpenPost()}
                  >
                    <span>
                      <Icon.Plus /> Viết bài
                    </span>
                  </button>
                </div>
              )}
              {code.includes("post_sub_new_home") && (
                <button
                  className="btn btn-outline-info display-mone-mobile"
                  onClick={() => onSubNews()}
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
                </button>
              )}
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
              <div className="mt-3" style={{ minHeight: "100px" }}>
                {loading && <div className="spin-loading"></div>}
              </div>
            </div>
            <div className="col-md-4 mb-4 display-mone-mobile sub-news">
              {subNews.map((data) => {
                return (
                  <SubNews
                    data={data}
                    key={data.id}
                    reload={getSubNews}
                    editSubNewID={onSubNews}
                    permission_code={code}
                  />
                );
              })}
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
        <CreateSubNews
          visible={isSubNews}
          onClose={onSubNews}
          onConfirm={onConfirmSubNews}
          id={subNewsID}
        />
      </main>
    </section>
  );
}

export default HomePage;
