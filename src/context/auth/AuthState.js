import { useReducer } from "react"
import { auth, googleAuthProvider, facebookAtuhProvider, db } from "../../firebase/firebaseConfig"
// import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

import { types } from "../../types/types"
import AuthContext from "./AuthContext"
import { authReducer } from "./authReducer"
import { alertAddFavoriteProduct, alertErrorSignIn, alertPassword, alertSuccessSignIn } from "../../helpers/alerts"

const AuthState = ({children}) => {
    const initialState = {
        uid : '',
        name : '',
        lastName: '',
        email: '',
        password : '',
        celphone : '', 
        document : '',
        favoritesProducts : [],
        orders : [],
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    const startLoginEmailPassword = async (email, password) => {
        try {
            const {user} = await auth.signInWithEmailAndPassword(email, password);
            dispatch({
                type: types.login,
                payload : {
                    uid: user.uid,
                    name : user.displayName
                }
            })
            alertSuccessSignIn('Signed in successfully')
            
        } catch (error) {
            alertErrorSignIn(error);
        }
    }
    
    const startLoginGoogle = () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(({user} )=> {
                dispatch({
                    type : types.login,
                    payload : {
                        uid : user.uid,
                        name : user.displayName
                    }
                })
            })
    }

    const startLoginWithFacebook = () => {
        auth.signInWithPopup(facebookAtuhProvider)
            .then(({user} )=> {
                dispatch({
                    type : types.login,
                    payload : {
                        uid : user.uid,
                        name : user.displayName
                    }
                })
            })
    }
    
    const startRegisterWithEmailPasswordName = (email, password, name, lastName) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then( async ({user}) => {
                console.log(user);
                await auth.currentUser.updateProfile({displayName: name})

                dispatch({
                    type: types.login,
                    payload : {
                        uid: user.uid,
                        name : user.displayName,
                    }
                })

                db.collection("USERS").doc(user.uid).set({
                    name,
                    lastName,
                    email, 
                    password,
                    favoritesProducts : [],
                    orders: [],
                })
                alertSuccessSignIn('successfully registered user');
                
            }).catch( error => {
                alertErrorSignIn(error);
            })
    }

    const getDataUser = (userId) => {
        let docRef = db.collection("USERS").doc(userId);

        docRef.get().then((doc) => {
            if (doc.exists) {
                dispatch({
                    type: types.dataUser,
                    payload : {...doc.data()}
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    // Actualizamos los datos del usuario actual 
    const updateDataUser = (dataUser) => {
        const user = auth.currentUser;

        // Creamosun objeto con los datos actualizados del usuario
        const updateUser = {
            ...state,
            ...dataUser
        }
        dispatch({
            type : types.dataUser, 
            payload : updateUser
        })

        // Actualizamos la base de datos con la data nueva
        let usuarioActualizado = db.collection("USERS").doc(user.uid);

        return usuarioActualizado.update({
            ...dataUser
        })
        .then(() => {
            alertPassword("Data User Updated Correctly", 'bottom-end', 'success');
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        })
    }

    // Cambiar de contraseña del usuario
    const updatePasswordUser = (newPassword) => {
        const user = auth.currentUser;

        user.updatePassword(newPassword).then(() => {
            console.log("Se Actualizo con exito");

            // Creamosun objeto con los datos del usuario y la password nueva
            const updateUser = {
                ...state,
                password : newPassword
            }
            dispatch({
                type : types.dataUser, 
                payload : updateUser
            })

            // Actualizamos la base de datos con la password nueva
            let usuarioActualizado = db.collection("USERS").doc(user.uid);

            // Cambiamos la contraseña por la nueva 
            return usuarioActualizado.update({
                password: newPassword
            })
            .then(() => {
                alertPassword("Password Updated Correctly", 'bottom-end', 'success');
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            })
        }).catch((error) => {
            alertPassword(error, 'bottom-end', 'error');
        });
    }

    /* Favoritesproducts */
    const addOrDeleteProductFavorite = (product) => {
        const isRepit = state.favoritesProducts.some( stateProduct => stateProduct.id === product.id);
        if (isRepit) {
            const favoriteProduct = state.favoritesProducts.find( item => item.id === product.id);
            dispatch({
                type: types.favoriteProductDelete,
                payload : favoriteProduct
            })
            alertAddFavoriteProduct("Removiste este producto de favoritos :c")
        }else{
            dispatch({
                type: types.favoriteProductAdd,
                payload : product
            })
            alertAddFavoriteProduct("Producto agregado a favoritos")
        }
    }

    const saveProductsFavoritesFirebase = () => {
        // console.log(state.favoritesProducts);
    }

    const saveOrder = (order) => {

        dispatch({
            type: types.saveOrder,
            payload : order
        })

        const user = auth.currentUser;

        // Actualizamos la base de datos con la data nueva
        let usuarioActualizado = db.collection("USERS").doc(user.uid);

        return usuarioActualizado.update({
            ...state,
            orders: [order,...state.orders]
        })
        .then(() => {
            console.log("Se actualizo correctamente");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        })
    }

    const startLogout = () => {
        auth.signOut()
            .then( () => {

                dispatch({
                    type: types.logout
                })
            })
    }

    const login = (uid, name) => {
 
        dispatch({
            type: types.login,
            payload : {
                uid,
                name
            }
        })
    }

    return (
        <AuthContext.Provider
            value = {{
                state,

                startLoginEmailPassword,
                startLoginGoogle, 
                startLoginWithFacebook,
                startRegisterWithEmailPasswordName,
                getDataUser,
                updateDataUser,
                updatePasswordUser,
                addOrDeleteProductFavorite,
                saveProductsFavoritesFirebase,
                saveOrder,
                startLogout,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState