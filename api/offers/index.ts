import firestore from '@react-native-firebase/firestore';

interface OfferData {
  price: string;
  date: Date;
  comment: string;
  providerId: string;
}

interface AddOfferParams {
  orderId: string;
  offerData: OfferData;
}

export const addOfferToOrder = async ({orderId, offerData}: AddOfferParams) => {
  return firestore()
    .collection('orders')
    .doc(orderId)
    .collection('offers')
    .add({
      ...offerData,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
};
