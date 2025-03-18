import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as React from 'react';
import {MyTabBar} from '../components/tabBar';
import {Order} from './order';
import {OrderList} from './orderList';
import {Rating} from './rating';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from '../context/authContext.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateOffer} from './orderList/createOffer.tsx';
import {Offers} from './rating/offers.tsx';

export type RootStackParamList = {
  Order: undefined;
  OrderList: undefined;
  Rating: undefined;
};

export type OrderListStackParamList = {
  ActiveOrderList: undefined;
  CreateOffer: {orderId: string};
};
export type OfferListStackParamList = {
  UserOrderList: undefined;
  OfferList: {orderId: string};
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const OrderListStack = createNativeStackNavigator<OrderListStackParamList>();
const OffersListStack = createNativeStackNavigator<OfferListStackParamList>();
export const OrderListScreen = () => {
  return (
    <OrderListStack.Navigator screenOptions={{headerShown: false}}>
      <OrderListStack.Screen name="ActiveOrderList" component={OrderList} />
      <OrderListStack.Screen name="CreateOffer" component={CreateOffer} />
    </OrderListStack.Navigator>
  );
};

export const OffersListScreen = () => {
  return (
    <OffersListStack.Navigator screenOptions={{headerShown: false}}>
      <OffersListStack.Screen name="UserOrderList" component={Rating} />
      <OffersListStack.Screen name="OfferList" component={Offers} />
    </OffersListStack.Navigator>
  );
};

function RootStack() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <MyTabBar {...props} />}
          screenOptions={{headerShown: false}}>
          <Tab.Screen name="Order" component={Order} />
          <Tab.Screen name="OrderList" component={OrderListScreen} />
          <Tab.Screen name="Rating" component={OffersListScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default RootStack;
