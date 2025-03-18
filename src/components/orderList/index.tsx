import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import React from 'react';
import {Order, OrderStatus} from '../../../types';
import FastImage from 'react-native-fast-image';
interface Props {
  orders: Order[];
  handlePress: (orderId: string) => void;
  buttonText: string;
}

export const OrderList = ({orders, handlePress, buttonText}: Props) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      contentContainerStyle={{paddingBottom: 50}}
      renderItem={({item}) => (
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
              paused={true}
            />
          )}
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {item.status === OrderStatus.Active ? (
              <Pressable
                onPress={() => handlePress(item.id)}
                style={styles.button}>
                <Text style={{color: 'white'}}>{buttonText}</Text>
              </Pressable>
            ) : (
              <Text style={styles.text}>{`Order is done`}</Text>
            )}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
  button: {
    paddingVertical: 10,
    alignSelf: 'flex-start',
    width: 'auto',
    paddingHorizontal: 40,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
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
});
