import React from 'react';
import 'bootstrap'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';

export default function Home() {
  return (
    <React.Fragment>
      <div className="homeBanner">
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../images/banner/Banner1.png" class="d-block w-100" alt="Banner1">
                </div>
                <div class="carousel-item">
                    <img src="..." class="d-block w-100" alt="Banner2">
                </div>
                <div class="carousel-item">
                    <img src="" class="d-block w-100" alt="Banner3">
                </div>
                <div class="carousel-item">
                    <img src="" class="d-block w-100" alt="Banner4">
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}
