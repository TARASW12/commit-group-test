import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Offer} from '../../types';
import {OFFERS_COLLECTION, ORDERS_COLLECTION} from "../../api/collections";

export const useFetchOffers = (
  orderId: string,
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>,
) => {
  useEffect(() => {
    if (!orderId) return;

    const unsubscribe = firestore()
      .collection(ORDERS_COLLECTION)
      .doc(orderId)
      .collection(OFFERS_COLLECTION)
      .onSnapshot(
        querySnapshot => {
          const offersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOffers(offersData as Offer[]);
        },
        error => {
          console.error('❌ Error fetching offers:', error);
        },
      );

    return () => {
      unsubscribe();
    };
  }, [orderId, setOffers]);
};
