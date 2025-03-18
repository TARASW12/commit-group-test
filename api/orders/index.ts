import firestore from '@react-native-firebase/firestore';
import {OrderStatus} from '../../types';

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface OrderData {
  category: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  userId: string;
  status: OrderStatusType;
}

export const addOrder = async (orderData: OrderData) => {
  return firestore()
    .collection('orders')
    .add({
      ...orderData,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
};
export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatusType,
) => {
  try {
    await firestore().collection('orders').doc(orderId).update({
      status,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
