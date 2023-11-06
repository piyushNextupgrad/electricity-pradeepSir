import { FaSistrix, FaAlignJustify,FaArrowsToCircle,FaEnvelope,FaRegBell,FaUserTie,FaRegEnvelope,FaGear,FaCircleQuestion,FaArrowRightToBracket } from "react-icons/fa6";
import { useState } from "react";
const Header = () => {

  const [sidebarClass, setsidebarClass] = useState("sidenav-toggled");

  function toggleSidebar(){

    if(sidebarClass=="sidenav-toggled"){
      setsidebarClass("")
      const body = document.querySelector('body')
      body.classList.remove("sidenav-toggled");
    }else{
      setsidebarClass("sidenav-toggled")
      const body = document.querySelector('body')
      body.classList.add("sidenav-toggled");

    }

  }

    return (
      <>
       
<div className="app-header header top-header">
  <div className="container-fluid">
    <div className="d-flex">
      <a className="header-brand" href="/">     
        <img
          src="/logo.png"
          className="header-brand-img desktop-logo"
          alt="logo"
        />
      </a>
      <a
        aria-label="Hide Sidebar"
        className={`app-sidebar__toggle`}
        data-toggle="sidebar"
        href="javascript:void(0)"
        onClick={toggleSidebar}
      ><FaAlignJustify/></a>
      {/* sidebar-toggle*/}
      <form className="form-inline">
        <div className="search-element">
          <input
            type="search"
            className="form-control header-search"
            placeholder="Search…"
            aria-label="Search"
            tabIndex={1}
          />
          <button className="btn btn-primary-color" type="submit">
            <FaSistrix />
          </button>
        </div>
      </form>
      <div className="dropdown  header-setting">
        <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
          <a className="dropdown-item" href="#">
            {" "}
            Multi Pages{" "}
          </a>
          <a className="dropdown-item" href="#">
            {" "}
            Mail Settings{" "}
          </a>
          <a className="dropdown-item" href="#">
            {" "}
            Default Settings{" "}
          </a>
          <a className="dropdown-item" href="#">
            {" "}
            Documentation{" "}
          </a>
          <div className=" text-center p-2 border-top mt-3">
            <a href="#" className="">
              updated
            </a>
          </div>
        </div>
      </div>
      <div className="d-flex order-lg-2 ml-auto">
        <a
          href="#"
          data-toggle="search"
          className="nav-link nav-link-lg d-md-none navsearch"
        >
          <i className="fa fa-search" />
        </a>
        <div className="dropdown   header-fullscreen">
          <a className="nav-link icon full-screen-link" id="fullscreen-button">
            <FaArrowsToCircle />
          </a>
        </div>
        <div className="dropdown header-notify">
          <a className="nav-link icon text-center" data-toggle="dropdown">
            <FaEnvelope />
            <span className="nav-unread bg-danger pulse" />
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow w-300  pt-0">
            <div className="dropdown-header mt-0 pt-0 border-bottom p-4">
              <h5 className="dropdown-title mb-1 font-weight-semibold text-drak">
                Messages
              </h5>
              <p className="dropdown-title-text subtext mb-0 pb-0 ">
                You have 4 unread messages
              </p>
            </div>
            <a href="#" className="dropdown-item d-flex pb-4 pt-4">
              <div
                className="avatar avatar-md  mr-3 d-block cover-image border-radius-4"
                data-image-src="assets/images/5.jpg"
                style={{
                  background: 'url("/5.jpg") center center'
                }}
              >
                <span className="avatar-status bg-green" />
              </div>
              <div>
                <small className="dropdown-text">Madeleine</small>
                <p className="mb-0 fs-13 text-muted">
                  Hey! there I' am available
                </p>
              </div>
            </a>
            <a href="#" className="dropdown-item d-flex pb-4 pt-4">
              <div
                className="avatar avatar-md  mr-3 d-block cover-image border-radius-4"
                data-image-src="/3.jpg"
                style={{
                  background: 'url("/3.jpg") center center'
                }}
              >
                <span className="avatar-status bg-red" />
              </div>
              <div>
                <small className="dropdown-text">Anthony</small>
                <p className="mb-0 fs-13 text-muted ">New product Launching</p>
              </div>
            </a>
            <a href="#" className="dropdown-item d-flex pb-4 pt-4">
              <div
                className="avatar avatar-md  mr-3 d-block cover-image border-radius-4"
                data-image-src="/3.jpg"
                style={{
                  background: 'url("/3.jpg") center center'
                }}
              >
                <span className="avatar-status bg-yellow" />
              </div>
              <div>
                <small className="dropdown-text">Olivia</small>
                <p className="mb-0 fs-13 text-muted">New Schedule Realease</p>
              </div>
            </a>
            <div className="dropdown-divider mt-0" />
            <a href="#" className="dropdown-item text-center">
              See all Messages
            </a>
          </div>
        </div>
        {/* MESSAGE-BOX */}
        <div className="dropdown d-md-flex message">
          <a className="nav-link icon" data-toggle="dropdown">
            <FaRegBell />
            <span className=" bg-success pulse-success " />
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow pt-0">
            <div className="dropdown-header border-bottom p-4 pt-0 mb-3 w-270">
              <div className="d-flex">
                <h5 className="dropdown-title float-left mb-1 font-weight-semibold text-drak">
                  Notifications
                </h5>
                <a
                  href="#"
                  className="fe fe-align-justify text-right float-right ml-auto text-muted"
                />
              </div>
            </div>
            <a href="#" className="dropdown-item d-flex pb-2 pt-2">
              <div className="card box-shadow-0 mb-0">
                <div className="card-body p-3">
                  <div className="notifyimg bg-gradient-primary border-radius-4">
                    <i className="mdi mdi-email-outline" />
                  </div>
                  <div>
                    <div>Message Sent.</div>
                    <div className="small text-muted">3 hours ago</div>
                  </div>
                </div>
              </div>
            </a>
            <a href="#" className="dropdown-item d-flex  pb-2">
              <div className="card box-shadow-0 mb-0 ">
                <div className="card-body p-3">
                  <div className="notifyimg bg-gradient-danger border-radius-4 bg-danger">
                    <i className="fe fe-shopping-cart" />
                  </div>
                  <div>
                    <div> Order Placed</div>
                    <div className="small text-muted">5 hour ago</div>
                  </div>
                </div>
              </div>
            </a>
            <a href="#" className="dropdown-item d-flex pb-2">
              <div className="card box-shadow-0 mb-0">
                <div className="card-body p-3">
                  <div className="notifyimg bg-gradient-success  border-radius-4 bg-success mr-2">
                    <i className="fe fe-airplay" />
                  </div>
                  <div>
                    <div>Your Admin launched</div>
                    <div className="small text-muted">1 daya ago</div>
                  </div>
                </div>
              </div>
            </a>
            <div className=" text-center p-2 border-top mt-3">
              <a href="#" className="">
                View All Notifications
              </a>
            </div>
          </div>
        </div>
        <div className="dropdown ">
          <a
            className="nav-link pr-0 leading-none"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="profile-details mt-2">
              <span className="mr-3 font-weight-semibold">Anna Sthesia</span>
              <small className="text-muted mr-3">Admin</small>
            </div>
            <img
              className="avatar avatar-md brround"
              src="/1.jpg"
              alt="image"
            />
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow w-250">
            <div className="user-profile border-bottom p-3">
              <div className="user-image">
                <img
                  className="user-images"
                  src="/1.jpg"
                  alt="image"
                />
              </div>
              <div className="user-details">
                <h4>Anna Sthesia</h4>
                <p className="mb-1 fs-13 text-muted">AnnaSthesia@gmail.com</p>
              </div>
            </div>
            <a href="#" className="dropdown-item pt-3 pb-3">
              <FaUserTie />{" "}
              My Profile{" "}
            </a>
            <a href="#" className="dropdown-item pt-3 pb-3">
              <FaRegEnvelope />{" "}
              Messages{" "}
              <span className="badge badge-pill badge-success">41</span>
            </a>
            <a href="#" className="dropdown-item pt-3 pb-3">
              <FaGear/>{" "}
              Setting{" "}
            </a>
            <a href="#" className="dropdown-item pt-3 pb-3">
              <FaCircleQuestion/>{" "}
              FAQ{" "}
            </a>
            <a href="#" className="dropdown-item pt-3 pb-3">
              <FaArrowRightToBracket/>
               Sign Out{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>
  );
};

export default Header;
