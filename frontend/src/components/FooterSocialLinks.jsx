import React from "react";
// import { NavLink } from "react-router-dom";
import {
  FaInstagramSquare,
  FaLinkedin,
  FaFacebookSquare,
  FaGithubSquare,
  FaGooglePlusSquare,
  FaTwitterSquare,
} from "react-icons/fa";
const FooterSocialLinks = () => {
  return (
    <>
      <div className="container ">
        <footer className="text-center text-lg-start text-white    ">
          <section className="d-flex justify-content-around p-3">
            {/* left */}
            <div>
              <h6>Follow Us</h6>
            </div>
            {/* left */}
            {/*right */}
            <div className="footer-social">
              <a className="parent-icons" id="Insta" href="#">
                <FaInstagramSquare className="social-icons" />
              </a>
              <a className="parent-icons" id="Facebook" href="#">
                <FaFacebookSquare className="social-icons" />
              </a>
              <a className="parent-icons" id="Github" href="#">
                <FaGithubSquare className="social-icons" />
              </a>
              <a className="parent-icons" id="Linkedin" href="#">
                <FaLinkedin className="social-icons" />
              </a>
              <a className="parent-icons" id="Google" href="#">
                <FaGooglePlusSquare className="social-icons" />
              </a>
              <a className="parent-icons" id="Twitter" href="#">
                <FaTwitterSquare className="social-icons" />
              </a>
            </div>
            {/* right */}
          </section>
        </footer>
      </div>
    </>
  );
};

export default FooterSocialLinks;