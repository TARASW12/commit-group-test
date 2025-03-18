import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Offer} from '../../types';

export const useFetchOffers = (
  orderId: string,
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>,
) => {
  useEffect(() => {
    if (!orderId) return; // Якщо orderId не заданий, підписка не створюється

    const unsubscribe = firestore()
      .collection('orders')
      .doc(orderId)
      .collection('offers')
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
