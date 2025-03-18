import firestore from '@react-native-firebase/firestore';
import {OFFERS_COLLECTION, ORDERS_COLLECTION} from "../collections";

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
    .collection(ORDERS_COLLECTION)
    .doc(orderId)
    .collection(OFFERS_COLLECTION)
    .add(offerData);
};
