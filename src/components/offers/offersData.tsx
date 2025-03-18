import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface OffersDataProps {
  providerId: string;
  price: number;
  normalDate: string;
  comment: string;
}

export const OffersData: React.FC<OffersDataProps> = ({
  providerId,
  price,
  normalDate,
  comment,
}) => {
  return (
    <>
      <Text style={styles.offerText}>{`Provider - ${providerId}`}</Text>
      <Text style={styles.offerText}>{`Price - ${price} $`}</Text>
      <Text style={styles.offerText}>{`Date - ${normalDate}`}</Text>
      <Text style={styles.offerText}>{`Comment - ${comment}`}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  offerText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
});
