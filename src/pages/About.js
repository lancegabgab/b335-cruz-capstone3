import React from 'react';
import { Container } from 'react-bootstrap';
import Banner1 from '../images/banner/Banner1.png';

export default function About() {
 
  const petParadiseHistory = `
    Pet Paradise Toy Shop has a rich history that began in the quaint town of Meadowville in 1985. Founded by the visionary entrepreneur, Emily Harper, the shop initially started as a small, family-owned business dedicated to providing unique and high-quality toys for pets. Emily's passion for animals and her desire to enhance the bond between pets and their owners fueled the growth of Pet Paradise Toy Shop over the years.

    As the shop gained popularity for its exceptional selection of toys, grooming products, and accessories, Pet Paradise expanded its reach beyond Meadowville. The commitment to offering innovative and safe toys for pets of all kinds became the hallmark of the brand. With a focus on customer satisfaction and the well-being of furry companions, Pet Paradise Toy Shop has evolved into a beloved destination for pet owners seeking not only entertainment for their pets but also a trusted source for pet care advice. Today, Pet Paradise Toy Shop stands as a testament to Emily Harper's dedication, and it continues to thrive as a cherished establishment that brings joy to both pets and their human companions.
  `;
  const bannerStyle = {
    height: '55vh', 
    width: '100%',     
    display: 'block',
    margin: 'auto',
  };

  return (
    <Container className="my-5">
      <h1 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
        About Pet Paradise
      </h1>
      <img src={Banner1} alt="Pet Paradise Banner" style={bannerStyle} />
      <p className="text-center bg-dark text-white mt-3 p-3" style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#555' }}>{petParadiseHistory}</p>
    </Container>
  );
}
