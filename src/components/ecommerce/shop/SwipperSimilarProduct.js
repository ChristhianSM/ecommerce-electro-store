import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import { Product } from './Product';

export const SwipperSimilarProduct = ({similarProducts}) => {

    SwiperCore.use([ Navigation]);

    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={10}
            slidesPerGroup={2}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
                clickable: true
            }}
            navigation={true}
            className="mySwiper py-4"
        >   
            {
                similarProducts.map( product => {
                    return (
                        <SwiperSlide key= {product.id}>
                            <Product 
                                product = {product}
                            />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}
