import React from "react";
import FooterSocialLinks from "./FooterSocialLinks";
import footerTop from "../imgs/footerShape.svg";
import '../css/footer.css';
const Footer = () => {
  return (
    <>
      {/* <Logo/> */}
      <div className="footer-top-shape">
        <img src={footerTop} alt="" />
      </div>
      <div className="cotainer p-5 footer">
        <div className="row row-cols-4   ">
          {/* 1st-row */}
          <div className="col-md-4  ">
          <h5 className="Headings mb-3">Resolize Image Standard</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptate corrupti cumque non facilis quae reprehenderit fugit officiis suscipit beatae accusantium quis.</p>
            
          </div>
          {/* 1st-row */}
          {/* 2nd-row */}
          <div className="col-md-2 ">
          <h5 className="Headings mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                
                <a className="Links-styling" href="#">
                  <li>How It Works</li>
                </a>
                <a className="Links-styling" href="#">
                  <li>Video</li>
                </a>
                <a className="Links-styling" href="#">
                  <li>Faq's</li>
                </a>
                <a className="Links-styling" href="#">
                  <li>Help</li>
                </a>
              </ul>
            
          </div>
          {/* 2nd-row */}
          {/* 3rd-row */}
          <div className="col-md-2  ">
           
            <h5 className="Headings  mb-3"> Privacy</h5>
              <ul className="list-unstyled">
                
                <a className="Links-styling" href="#">
                  <li>Privacy Policy </li>
                </a>
                <a className="Links-styling" href="#">
                  <li>Terms and Conditions</li>
                </a>
                <a className="Links-styling" href="#">
                  <li>Partnership</li>
                </a>
                <a className="Links-styling" href="#">
                  <li>Investment</li>
                </a>
              </ul>
            
          </div>
          {/* 3rd-row */}
          {/* 4rd-row */}
          <div className="col col-md-4  ">
            <section>
              
              <div className="container " style={{padding:"0px"}}>
                
                <div className="flex px-30 service-padding" style={{alignItems:"end", marginBottom:"30px"}}>
                <input type="email" name="subscribe" className="subscribe" placeholder="Enter email..."/> 
                <button className="subscribe-btn">Subscribe</button>
                </div>
              </div>

              <div>
                <FooterSocialLinks />
              </div>
            </section>
          </div>
          {/* 4rd-row */}
        </div>
        <div className="row"></div>
      </div>
    </>
  );
};

export default Footer;