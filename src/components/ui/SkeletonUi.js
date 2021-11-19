import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const SkeletonUi = () => {

    const number = [1,2,3,4,5,6,7,8];
    return (
        <>  
            {
                number.map( item => {
                    return (
                        <div className = "flex flex-col justify-center" key = {item}>
                            <Skeleton
                                height = {300}
                            />
                            <div className = "mt-2">
                                <Skeleton
                                    height = {20}
                                    count = {3}
                                />
                            </div>
                            <div className = "flex ">
                                <Skeleton 
                                    
                                />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
