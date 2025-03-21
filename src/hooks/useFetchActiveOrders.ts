import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Order, OrderStatus} from '../../types';
import {ORDERS_COLLECTION} from "../../api/collections";

interface UseFetchActiveOrdersProps {
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const useFetchActiveOrders = ({
  setOrders,
}: UseFetchActiveOrdersProps) => {
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(ORDERS_COLLECTION)
      .where('status', '==', OrderStatus.Active)
      .onSnapshot(
        querySnapshot => {
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersData as Order[]);
        },
        error => {
          console.error('❌ Error fetching active orders:', error);
        },
      );

    return () => {
      unsubscribe();
    };
  }, [setOrders]);
};
