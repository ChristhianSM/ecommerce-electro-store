import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './../../assets/images/logo.png'

export const NavBarAuth = () => {
    return (
        <nav className = "bg-black">
            <div className="container mx-auto py-2 flex justify-between items-center">
                <Link to = "/"> 
                    <div className="logo h-14">
                        <img src={Logo} alt="" className = "h-full"/>
                    </div>
                </Link>
            </div>
        </nav>
    )
}
