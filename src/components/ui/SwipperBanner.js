import React from 'react'
import Laptop from './../../assets/images/banner-laptops.jpg';
import Accesorios from './../../assets/images/banner-accesorios.jpg';
import Celulares from './../../assets/images/banner-celulares.jpg';
import LaptopGamer from './../../assets/images/banner-laptops-gamer.jpg';
import Tablets from './../../assets/images/banner-tablet.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { Link } from 'react-router-dom';

export const SwipperBanner = () => {

    SwiperCore.use([ Navigation, EffectFade, Autoplay]);
    
    return (
    <div className = "mt-40 max-w-full mx-auto">
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            effect={"fade"}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
            pagination={{
            clickable: true
            }}
            navigation={true}
            className="mySwiper"
        >
           <SwiperSlide className = "cursor-pointer">
                <Link to = "/products/laptop">
                    <img src={Laptop} alt="laptop"  className = "mx-auto object-contain"/>
                </Link>
           </SwiperSlide>
           <SwiperSlide className = "cursor-pointer">
               <Link to = "/products/celular">
                    <img src={Celulares} alt="celulares" className = "mx-auto" />
               </Link>
           </SwiperSlide>
           <SwiperSlide className = "cursor-pointer">
                <Link to = "/products/laptop">
                    <img src={LaptopGamer} alt="laptop-gamer" className = "mx-auto" />
                </Link>
           </SwiperSlide>
           <SwiperSlide className = "cursor-pointer">
                <Link to = "/products/tablet">
                    <img src={Tablets} alt="tablets"  className = "mx-auto"/>
                </Link>
           </SwiperSlide>
           <SwiperSlide className = "cursor-pointer">
                <Link to = "/products/accesorios">
                    <img src={Accesorios} alt="accesorios" className = "mx-auto"/>
                </Link>
           </SwiperSlide>
        </Swiper>
    </div>
    )
}
