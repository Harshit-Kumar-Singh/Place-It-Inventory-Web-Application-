import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link , Redirect} from "react-router-dom";
import { DiCodeigniter } from "react-icons/di";
import { RiHome4Line } from "react-icons/ri";
import {HiClipboardList} from 'react-icons/hi'
import {AiOutlineNotification,AiTwotoneSave,AiOutlineReload} from "react-icons/ai";
import { BsFillPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import Inventory from "./RightPannel/Inventory";
import Notifications from "./RightPannel/Notifications";
import Print from "./RightPannel/Print";
// import { FiHome} from "react-icons/di";
const menu = [
  {
    id: 1,
    heading: "Inventory",
  },
  {
    id: 2,
    heading: "Notifications",
  },
  {
    id: 3,
    heading: "Print",
  },
];

function App() {
  const [index, setIndex] = useState(0);

  return (
    <Router>
      <Switch>
        <div className="container">
          <LeftPannel />
          <RightPannel index={index} setIndex={setIndex} />
        </div>
      </Switch>
    </Router>
  );
}

export const LeftPannel = () => {
  return (
    <div className="leftpannel">
      <div className="logos">
        <div className="top-icon">
          <HiClipboardList className="icons"></HiClipboardList>
        </div>
        <div className="inner-logos">
          <div>
            <FaHome className="icons" />
            
            <AiOutlineNotification className="icons"></AiOutlineNotification>
          </div>
          <div>
            <AiTwotoneSave className="icons"></AiTwotoneSave>
            <AiOutlineReload className="icons"></AiOutlineReload>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RightPannel = ({ index, setIndex }) => {
  return (
    <div className="rightpannel">
      <Heading index={index} setIndex={setIndex} />
      <div className="main-pages">
        <Route exact path="/">
          <Redirect to = '/Inventory'></Redirect>
        </Route>
        <Route exact path="/Inventory">
          <Inventory />
        </Route>

        <Route exact path="/Notifications">
          <Notifications />
        </Route>

        <Route exact path="/Print">
          <Print />
        </Route>
      </div>
    </div>
  );
};

export const Heading = ({ index, setIndex }) => {
  return (
    <div>
      <div className="heading">
        <div className="menu-btn">
          {menu.map((jobs, idx) => {
            // console.log(index);
            const path = "/" + jobs.heading;
            console.log(path);
            return idx == 0 ? (
              <Link to="/Inventory">
                <p
                  className={`heading-btn ${idx == index && "active-btn"}`}
                  onClick={() => {
                    setIndex(idx);
                  }}
                >
                  {jobs.heading}
                </p>
              </Link>
            ) : idx == 1 ? (
              <Link to="/Notifications">
                <p
                  className={`heading-btn ${idx == index && "active-btn"}`}
                  onClick={() => {
                    setIndex(idx);
                  }}
                >
                  {jobs.heading}
                </p>
              </Link>
            ) : (
              <Link to="/Print">
                <p
                  className={`heading-btn ${idx == index && "active-btn"}`}
                  onClick={() => {
                    setIndex(idx);
                  }}
                >
                  {jobs.heading}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="person-profile">
          <BsFillPersonFill className="icons person-icon" />
          <BsThreeDotsVertical className="icons logout" />
        </div>
      </div>
    </div>
  );
};

export default App;
