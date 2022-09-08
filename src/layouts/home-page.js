import Header from "./Components/header";
import NavBar from "./Components/navbar";
import Footer from "./Components/footer";
import Post from "./Components/post";

function HomePage() {
  return (
    <section>
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Home" />
        <div className="container-fluid px-2 px-md-4">
          <div
            className="page-header min-height-300 border-radius-xl mt-4"
            style={{
              backgroundImage:
                'url("https://fullstack-react-soft-dashboard.appseed-srv1.com/static/media/curved0.d146ec6e.jpg")',
            }}
          ></div>
          <div className="card card-body mx-3 mx-md-4 mt-n6">
            <div className="row gx-4 mb-2">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src="https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg"
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">Richard Davis</h5>
                  <p className="mb-0 font-weight-normal text-sm">
                    CEO / Co-Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 mb-4">
              <Post />
              <Post />
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
                    <hr className="css-1pcem6n-MuiDivider-root" />
                    <span class="badge badge-sm bg-gradient-success">
                      MARKETING TEAM
                    </span>
                  </div>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-auto">
                      <div className="avatar avatar-lg">
                        <img
                          src="https://fullstack-react-soft-dashboard.appseed-srv1.com/static/media/logo-slack.d8feb9c5.svg"
                          alt="profile_image"
                          className="w-100 border-radius-lg shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0 txt-linear-gradient-gr text-xl">
                        Slack Meet
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="row">
                    <p>You have an upcoming meet for Marketing Planning</p>
                    <p>Meeting ID: 902-128-281</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </section>
  );
}

export default HomePage;
