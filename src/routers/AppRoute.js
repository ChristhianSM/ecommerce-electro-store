import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { LoginScreen } from "../components/auth/LoginScreen";
import { PerfilScreen } from "../components/auth/perfil/PerfilScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { HomeScreen } from "../components/ecommerce/shop/HomeScreen";
import { ContainerProductCategory } from "../components/ecommerce/shop/ContainerProductCategory";
import { ProductScreen } from "../components/ecommerce/shop/ProductScreen";
import { ShoppingCartScreen } from "../components/ecommerce/shoppingCart/ShoppingCartScreen";
import AuthContext from "../context/auth/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { Modal } from "../components/ui/Modal";
import { SearchScreem } from "../components/ecommerce/shop/SearchScreem";
import { Footer } from "../components/ui/Footer";

export const AppRoute = () => {

    const {login, getDataUser} = useContext(AuthContext)

    useEffect(() => {
        auth.onAuthStateChanged( user => {
            if (user) {
                if (user.uid) {
                    login(user.uid, user.displayName);
                    getDataUser(user.uid);
                }
            }
        })
    }, []);

    return (
        <Router>
            <div className = "bg-white h-full overflow-hidden">
                <Switch>
                    <Route exact path = "/login" component = {LoginScreen}/>
                    <Route exact path = "/register" component = {RegisterScreen}/>
                    <Route exact path = "/perfil" component = {PerfilScreen}/>
                    <Route  exact path = "/" component = {HomeScreen}/>
                    <Route  exact path = "/shoppingCart" component = {ShoppingCartScreen}/>
                    <Route  exact path = "/products/:category" component = {ContainerProductCategory}/>
                    <Route  exact path = "/products/:category/:id" component = {ProductScreen}/>
                    <Route  exact path = "/search/:query" component = {SearchScreem}/>
                    <Redirect to = "/"/>
                </Switch>
            </div>

            <Modal />
            <Footer />
        </Router>
    )
}
