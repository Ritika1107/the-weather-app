import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

const COLLECTION_NAME = 'favoriteLocations';
const MAX_FAVORITES = 10; 

export const addFavoriteLocation = async (location) => {
  try {
<<<<<<< HEAD
   
=======
>>>>>>> fa4f1aa (Added Favorites City Addition)
    const q = query(collection(db, COLLECTION_NAME), 
      where("name", "==", location.name), 
      where("country", "==", location.country)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { success: false, message: "Location already in favorites" };
    }

    const allLocations = await getFavoriteLocations();
    if (allLocations.length >= MAX_FAVORITES) {
      return { success: false, message: "Maximum number of favorites reached" };
    }

    await addDoc(collection(db, COLLECTION_NAME), location);
    return { success: true, message: "Location added to favorites" };
  } catch (error) {
    console.error("Error adding favorite location: ", error);
    return { success: false, message: "Error adding favorite location" };
  }
};

export const getFavoriteLocations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const locations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return locations;
  } catch (error) {
    console.error("Error getting favorite locations: ", error);
<<<<<<< HEAD
    return { success: false, message: "Error retrieving favorite locations" }; // Return error message instead of throwing
=======
    return []; // Return an empty array on error to avoid breaking the app
>>>>>>> fa4f1aa (Added Favorites City Addition)
  }
};

export const removeFavoriteLocation = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return { success: true, message: "Location removed from favorites" };
  } catch (error) {
<<<<<<< HEAD
    console.error("Error removing favorite location: ", error);
    return { success: false, message: "Error removing favorite location" };
  }
};
=======
    console.error("Error removing favorite location:", error);
    return { success: false, message: "Error removing favorite location" };
  }
};
>>>>>>> fa4f1aa (Added Favorites City Addition)
