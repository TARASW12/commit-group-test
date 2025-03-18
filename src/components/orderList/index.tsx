import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import {Order, OrderStatus} from '../../../types';

interface Props {
  orders: Order[];
  handlePress: (orderId: string) => void;
  buttonText: string;
}

export const OrderList = ({orders, handlePress, buttonText}: Props) => {
  const renderItem = ({item}: {item: Order}) => (
    <View style={styles.card}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {item.mediaType === 'image' ? (
        <FastImage source={{uri: item.mediaUrl}} style={styles.media} />
      ) : (
        <Video
          source={{uri: item.mediaUrl}}
          style={styles.media}
          controls
          resizeMode="contain"
          paused
        />
      )}

      <View style={styles.actionContainer}>
        {item.status === OrderStatus.Active ? (
          <Pressable onPress={() => handlePress(item.id)} style={styles.button}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Pressable>
        ) : (
          <Text style={styles.doneText}>Order is done</Text>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  actionContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  doneText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OrderList;
