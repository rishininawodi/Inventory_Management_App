import React from "react";
// import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
        <img src={logo} alt="Logo" width={75} height={75} />
          {/* <RiProductHuntLine size={50} /> */}
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Complete Inventory Tracking Solution</h2>
          <p>
          An advanced inventory management system designed to efficiently control and manage products in your warehouse in real time. Our integrated solution streamlines operations, enhancing productivity and helping your business grow.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="15K" text="Active Items" /><br/>
            <NumberText num="25K" text="Satisfied Users" />
            <NumberText num="600+" text="Trusted Partners" />
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Inventory"  height="350px"/>
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
