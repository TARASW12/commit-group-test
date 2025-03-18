import firestore from '@react-native-firebase/firestore';

interface RatingData {
  orderId: string;
  offerId: string;
  providerId: string;
  stars: number;
  comment: string;
}

export const addRating = async (ratingData: RatingData) => {
  try {
    await firestore()
      .collection('ratings')
      .add(ratingData);
    return true;
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};
