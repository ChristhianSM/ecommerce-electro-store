import { collection, getDocs, query, where } from "firebase/firestore";
import { getHigherOrlowerPrice } from "../helpers/functions";
import { db } from "./firebaseConfig";

export const getDataUser = async () => {
    const querySnapshot = await getDocs(collection(db, "USERS"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
}

export const getDocuments = async (nameCollection) => {
  let data = [];
  const querySnapshot = await getDocs(collection(db, nameCollection));
  querySnapshot.forEach( document => {
    data = [
      ...data, 
      {
        ...document.data(),
        id : document.id
      }]
  })

  return data;
}

export const getDocumentByQuery = async (nameCollection, {key, condition, value}) => {
  let data = [];
  
  const ref = collection(db, nameCollection);

  // Create a query against the collection.
  const q = query(ref, where(key, condition, value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    // doc.data() is never undefined for query doc snapshots
    data = [
      ...data, 
      {
        ...document.data(),
        id : document.id
      }]
  });
  return data;
}

// Funcion para obtener las marcas por categoria
export const getMarcas = async (nameCollection, {key, condition, value}) => {
  let marcas = [];
  const filteredProducts = [];
  
  const ref = collection(db, nameCollection);

  // Create a query against the collection.
  const q = query(ref, where(key, condition, value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    // doc.data() is never undefined for query doc snapshots
    filteredProducts.push(document.data());
    if (!marcas.includes(document.data().marca) && document.data().marca !== null) {
      marcas.push(document.data().marca);
    }
  });

   // Obtenemos la cantidad de productos por marca
   const countProductsMarca = getAmountProducts(marcas, filteredProducts, "marca");

  //  Obtenemos el precio maximo y minimo 
  const higherPrice = getHigherOrlowerPrice("mayor", filteredProducts)
  const lowerPrice = getHigherOrlowerPrice("menor", filteredProducts)
  
  return [countProductsMarca,higherPrice, lowerPrice];
}

// Funcion para obtener las categorias del producto que se busco
export const getCategories = async (query) => {
  const categories = [];
  const products =  await getDocuments("PRODUCTS");
  const filteredProducts = products.filter( product => product.title.toLowerCase().includes(query) || product.marca?.toLowerCase().includes(query))

  filteredProducts.forEach(product => {
    if (!categories.includes(product.type) && product.marca !== null) {
      categories.push(product.type);
    }
  })

  return categories;
}

// Funcion para obtener las marcas del producto que se busco
export const getMarcasForSearch = async (query) => {
  let marcas = [];
  const categories = [];
  const products =  await getDocuments("PRODUCTS");
  const filteredProducts = products.filter( product => product.title.toLowerCase().includes(query) || product.marca?.toLowerCase().includes(query))

  // obtenemos las marcas
  filteredProducts.forEach(product => {
    if (!marcas.includes(product.marca) && product.marca !== null) {
      marcas.push(product.marca);
    }
  })

  // Obtenemos las categorias
  filteredProducts.forEach(product => {
    if (!categories.includes(product.type)) {
      categories.push(product.type);
    }
  })

  // Obtenemos la cantidad de productos por marca
  const countProductsMarca = getAmountProducts(marcas, filteredProducts, "marca");
  const countProductsCategories = getAmountProducts(categories, filteredProducts, "type");

  // Obtenemos el mauor y menor precio de los productos filtrados
  const higherPrice = getHigherOrlowerPrice("mayor", filteredProducts)
  const lowerPrice = getHigherOrlowerPrice("menor", filteredProducts);

  return [countProductsMarca, countProductsCategories, filteredProducts, higherPrice, lowerPrice];
}

const getAmountProducts = (arreglo, filteredProducts, prop) => {
  const countProducts = []
  if (prop === "marca") {
    arreglo.forEach( marca => {
      const count =  filteredProducts.filter( product => product.marca === marca);
      countProducts.push({
        name: marca,
        count: count.length
      })
    })
  }else{
    arreglo.forEach( marca => {
      const count =  filteredProducts.filter( product => product.type === marca);
      countProducts.push({
        name: marca,
        count: count.length
      })
    })
  }
  return countProducts
}