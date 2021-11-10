import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { LoginScreen } from "../components/auth/LoginScreen";
import { PerfilScreen } from "../components/auth/PerfilScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { HomeScreen } from "../components/ecommerce/HomeScreen";
import { Products } from "../components/ecommerce/Products";
import { ProductScreen } from "../components/ecommerce/ProductScreen";
import { ShoppingCartScreen } from "../components/ecommerce/ShoppingCartScreen";
import AuthContext from "../context/auth/AuthContext";
import { auth } from "../firebase/firebaseConfig";

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
    }, [])
    return (
        <Router>
            <div className = "bg-white h-full">
                <Switch>
                    <Route exact path = "/login" component = {LoginScreen}/>
                    <Route exact path = "/register" component = {RegisterScreen}/>
                    <Route exact path = "/perfil" component = {PerfilScreen}/>
                    <Route  exact path = "/" component = {HomeScreen}/>
                    <Route  exact path = "/shoppingCart" component = {ShoppingCartScreen}/>
                    <Route  exact path = "/products/:category" component = {Products}/>
                    <Route  exact path = "/products/:category/:nameProduct" component = {ProductScreen}/>
                    <Redirect to = "/"/>
                </Switch>
            </div>
        </Router>
    )
}
