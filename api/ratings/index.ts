import firestore from '@react-native-firebase/firestore';
import {RATINGS_COLLECTION} from "../collections";

interface RatingData {
  orderId: string;
  offerId: string;
  providerId: string;
  stars: number;
  comment: string;
}

export const addRating = async (ratingData: RatingData) => {
  try {
    await firestore().collection(RATINGS_COLLECTION).add(ratingData);
    return true;
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};
