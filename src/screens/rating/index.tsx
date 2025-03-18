import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../context/authContext.tsx';
import {OrderList as OrderListComponent} from '../../components/orderList';
import {OfferListStackParamList, OrderListStackParamList} from '../index.tsx';
import {Order} from '../../../types';
import {useFetchClientOrders} from '../../hooks/useFetchClientOrders.ts';

type OrderListNavigationProp = NativeStackNavigationProp<
  OfferListStackParamList,
  'OfferList'
>;
export const Rating: React.FC = () => {
  const {uid} = useAuth();
  const navigation = useNavigation<OrderListNavigationProp>();

  const [myOrders, setMyOrders] = useState<Order[]>([]);

  useFetchClientOrders({setMyOrders, uid});

  const handlePress = (orderId: string) => {
    navigation.navigate('OfferList', {orderId});
  };
  return (
    <View>
      <Text style={styles.header}>My Orders</Text>
      <OrderListComponent
        orders={myOrders}
        handlePress={handlePress}
        buttonText={'Check Offers'}
      />
    </View>
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
