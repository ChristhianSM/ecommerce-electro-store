import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getDataUser = async () => {
    const querySnapshot = await getDocs(collection(db, "USERS"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
}
