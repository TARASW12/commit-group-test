import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OrderListStackParamList} from '../index.tsx';
import {OrderList as OrderListComponent} from '../../components/orderList';
import {StyleSheet, Text} from 'react-native';
import {Order} from '../../../types';
import {useFetchActiveOrders} from '../../hooks/useFetchActiveOrders.ts';

type OrderListNavigationProp = NativeStackNavigationProp<
  OrderListStackParamList,
  'ActiveOrderList'
>;
export const OrderList = () => {
  const navigation = useNavigation<OrderListNavigationProp>();

  const [orders, setOrders] = useState<Order[]>([]);

  const handlePress = (orderId: string) => {
    navigation.navigate('CreateOffer', {orderId});
  };
  useFetchActiveOrders({setOrders});

  return (
    <>
      <Text style={styles.header}>Active Public Orders</Text>

      <OrderListComponent
        buttonText={'Create offer'}
        orders={orders}
        handlePress={handlePress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    paddingHorizontal: 15,
    marginTop: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
