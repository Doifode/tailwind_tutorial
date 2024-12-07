import React from 'react';
import aboutusvid from '../../assets/aboutus.mp4';

const About = () => {
  return (
    <div className="container py-5">
      {/* Video Section */}
      <div className="aboutusvid mb-4">
        <video className="videoTag" autoPlay loop muted style={{ width: '100%', height: 'auto' }}>
          <source src={aboutusvid} type="video/mp4" />
        </video>
      </div>

      {/* Mission Statement */}
      <h1 className="text-center mb-4">Our Mission</h1>
      <p className="fs-4 text-center">
        Our mission is to simplify the way information is shared in today’s fast-paced digital world. We strive to provide a user-friendly,
        <br /> efficient, and reliable QR code generation service that empowers our users to share their knowledge and resources effortlessly.
      </p>
    </div>
  );
};

export default About;
