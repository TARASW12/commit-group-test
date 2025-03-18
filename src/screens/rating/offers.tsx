import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {OfferListStackParamList} from '../index.tsx';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Offer, OrderStatus} from '../../../types';
import {useFetchOffers} from '../../hooks/useFetchOffers.ts';
import {addRating} from '../../../api/ratings';
import {updateOrderStatus} from '../../../api/orders';
import {FeedBack} from '../../components/feedback';
import {OffersData} from "../../components/offers/offersData.tsx";

type OfferProps = NativeStackScreenProps<OfferListStackParamList, 'OfferList'>;

type CreateOfferRouteProp = RouteProp<OfferListStackParamList, 'OfferList'>;

type OrderListNavigationProp = NativeStackNavigationProp<
  OfferListStackParamList,
  'UserOrderList'
>;

export const Offers: React.FC<OfferProps> = () => {
  const route = useRoute<CreateOfferRouteProp>();
  const navigation = useNavigation<OrderListNavigationProp>();

  const {orderId} = route.params;

  const [ratingOfferId, setRatingOfferId] = useState<string | null>(null);
  const [stars, setStars] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState<string>('');
  const [offers, setOffers] = useState<Offer[]>([]);

  useFetchOffers(orderId, setOffers);

  const handleOpenRating = (offerId: string) => {
    setRatingOfferId(offerId);
    setStars(0);
    setRatingComment('');
  };

  const handleConfirmRating = async (offerId: string) => {
    if (!ratingComment.trim()) {
      Alert.alert('Помилка', 'Будь ласка, додайте коментар');
      return;
    }
    const ratedOffer = offers.find(o => o.id === offerId);
    if (!ratedOffer) {
      console.error('Офер з таким id не знайдено');
      return;
    }
    try {
      await addRating({
        orderId,
        offerId,
        providerId: ratedOffer.providerId,
        stars,
        comment: ratingComment,
      });

      await updateOrderStatus(orderId, OrderStatus.Done);

      navigation.navigate('UserOrderList');
    } catch (error) {
      console.error('Помилка збереження рейтингу:', error);
      Alert.alert('Помилка', 'Не вдалося зберегти оцінку');
    }
  };
  return (
    <FlatList
      data={offers}
      keyExtractor={item => item.id}
      renderItem={({item: {providerId, price, id, date, comment}}) => {
        const normalDate = date.toDate().toLocaleString();
        return (
          <View style={styles.card}>
            <OffersData providerId={providerId} price={price} normalDate={normalDate} comment={comment} />
            <Pressable
              style={styles.doneButton}
              onPress={() => handleOpenRating(id)}>
              <Text style={styles.doneButtonText}>Виконано</Text>
            </Pressable>
            {ratingOfferId === id && (
              <FeedBack
                stars={stars}
                setStars={setStars}
                ratingComment={ratingComment}
                setRatingComment={setRatingComment}
                onConfirm={() => handleConfirmRating(id)}
              />
            )}
          </View>
        );
      }}
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
  offerText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
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
  doneButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#28a745',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
});
