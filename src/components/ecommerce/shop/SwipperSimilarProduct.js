import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import { Product } from './Product';

export const SwipperSimilarProduct = ({similarProducts}) => {

    SwiperCore.use([Pagination, Navigation]);

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={20}
            slidesPerGroup={3}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
            clickable: true
            }}
            navigation={true}
            className="mySwiper"
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
