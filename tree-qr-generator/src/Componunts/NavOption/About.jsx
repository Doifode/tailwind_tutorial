import React from 'react'
import aboutusvid from '../../assets/aboutus.mp4'

const About = () => {
  return (
    <div>
      <div className='aboutusvid'>
      <video className='videoTag' autoPlay loop muted>
        <source src={aboutusvid} type='video/mp4' />
       </video>
      </div>
      <h1>Our Mission</h1><br />
      <p>Our mission is to simplify the way information is shared in today’s fast-paced digital world. We strive to provide a user-friendly,
        <br /> efficient, and reliable QR code generation service that empowers our users to share their knowledge and resources effortlessly.</p>
    </div>
  )
}

export default About