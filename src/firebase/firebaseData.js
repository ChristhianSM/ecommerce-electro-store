import { collection, getDocs, query, where } from "firebase/firestore";
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
  
  const ref = collection(db, nameCollection);

  // Create a query against the collection.
  const q = query(ref, where(key, condition, value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    // doc.data() is never undefined for query doc snapshots
    if (!marcas.includes(document.data().marca)) {
      marcas.push(document.data().marca);
    }
  });
  return marcas;
}
