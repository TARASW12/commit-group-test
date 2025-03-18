import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {Order, OrderStatus} from '../../types';

interface useFetchClientOrdersProps {
  setMyOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  uid: string | null;
}

export const useFetchClientOrders = ({
  setMyOrders,
  uid,
}: useFetchClientOrdersProps) => {
  useEffect(() => {
    if (!uid) return;

    const unsubscribe = firestore()
      .collection('orders')
      .where('userId', '==', uid)
      .onSnapshot(
        querySnapshot => {
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMyOrders(ordersData as Order[]);
        },
        error => {
          console.error('❌ Error fetching items:', error);
        },
      );

    return () => {
      unsubscribe();
    };
  }, [uid]);
};
