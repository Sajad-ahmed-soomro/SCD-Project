// src/components/HomePage.js
import React from "react";
import "./HomeStyle.css"; // Include styles from your current styles.css
import Logo from "../images/webProject_Logo.png"; // Correctly import the logo
import Login from "../Login"

const HomePage = () => {
  return (
    <div>
      <div className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <h2>Events</h2>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#Home">
              <i className="fas fa-home"></i>Home
            </a>
          </li>
          <li>
            <a href="#show-gallery">
              <i className="fas fa-ticket-alt"></i>Our Events
            </a>
          </li>
          <li>
            <a href="#book-event">
              <i className="fas fa-tools"></i>Services
            </a>
          </li>
          <li>
            <a href="#about-us">
              <i className="fas fa-info-circle"></i>About Us
            </a>
          </li>
          <li>
            <a href="#contact">
              <i className="fas fa-envelope"></i>Contact
            </a>
          </li>
        </ul>
      </div>

      <main className="content">
        <div className="top-bar" style={{ alignItems: "center" }}>
          <img
            src={Logo} // Use the imported logo
            alt="Logo"
            width="100px"
            height="100px"
          />
          <h1 style={{ margin: "5%" }}>SAS Event Management</h1>
          <button
            className="btn login"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
          <button
            className="btn signup"
            onClick={() => (window.location.href = "/register")}
          >
            Sign Up
          </button>
        </div>

        <section className="banner">
          <h1>We are on a mission to bring people together!</h1>
          <p>
            One Window Solution for all. Explore and learn more about what we
            do!
          </p>
          <button className="btn learn-more">Learn More</button>
        </section>

        <section className="welcome-message">
          <h2>Welcome to SAS Event Management!</h2>
          <p>
            Welcome! We are honored to let you know about our expertise,
            activities, and resources for organizing Industrial Fairs, Trade
            Exhibitions, Business Seminars, Conferences, Festivals, and
            Concerts.
          </p>
          <p style={{ fontWeight: "bold" }}>
            MAKE YOUR EVENT COME TO LIFE WITH US!
          </p>
        </section>

        <footer className="footer">
          <p>© Copyright SAS Event Management. All Rights Reserved</p>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
