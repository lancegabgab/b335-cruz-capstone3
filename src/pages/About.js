import React from 'react';

export default function About() {
  const About = () => {
    // Function to display information about the web app
    console.log("This is the about page of Pet Paradise.");
    // You can include additional logic or content here.
  };

  // Invented history about Pet Paradise web app
  const petParadiseHistory = `
    Welcome to Pet Paradise, where the journey began with a simple idea - to create a virtual haven for pet lovers around the world. Our story dates back to 2018, when a group of passionate animal enthusiasts came together with a shared vision.

    In the early days, Pet Paradise started as a small community forum, where pet owners exchanged tips, shared adorable pictures, and sought advice from fellow members. As the community grew, so did our ambitions.

    In 2020, we embarked on a mission to enhance the pet ownership experience. We envisioned a comprehensive platform that not only connects pet lovers but also offers valuable resources, tools, and services. After months of dedicated development, Pet Paradise emerged as a feature-rich web app designed to cater to the diverse needs of pet owners.

    Today, Pet Paradise is a one-stop destination for everything related to pets. Whether you're seeking expert advice on pet care, discovering the latest pet trends, or connecting with like-minded individuals, our platform is here to make your journey as a pet parent more enjoyable.

    We believe in the power of community, the joy of sharing, and the unconditional love that pets bring into our lives. Join us in the Pet Paradise family, where every wag, meow, chirp, or purr is celebrated!

    Cheers to the past, present, and future of Pet Paradise - where the love for pets knows no bounds.
  `;

  return (
    <div>
      <h1 className="my-5 text-center">About Pet Paradise</h1>
      <p>{petParadiseHistory}</p>
    </div>
  );
}