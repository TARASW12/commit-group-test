import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export const OrderStatus = {
  Active: 'active',
  Done: 'done',
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];
export interface Order {
  id: string;
  category: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  status: OrderStatusType;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}

export interface Offer {
  id: string;
  price: number;
  date: FirebaseFirestoreTypes.Timestamp;
  comment: string;
  providerId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}
