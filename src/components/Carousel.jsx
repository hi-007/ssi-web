import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel1 from '@/assets/img/Carousel1.png'
import Carousel2 from '@/assets/img/Carousel2.png'
import Carousel3 from '@/assets/img/Carousel3.png'

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

  };

  return (
    <Slider {...settings}>
      <div>
        <img src={Carousel1} alt="Image 1" />
      </div>
      <div>
        <img src={Carousel2} alt="Image 2" />
      </div>
      <div>
        <img src={Carousel3} alt="Image 3" />
      </div>
    </Slider>
  );
};

export default Carousel;
