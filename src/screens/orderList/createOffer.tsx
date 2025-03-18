import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Pressable,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {OrderListStackParamList} from '../index';
import {useAuth} from '../../context/authContext';
import {TextArea} from '../../components/textArea';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {addOfferToOrder} from '../../../api/offers';

type CreateOfferRouteProp = RouteProp<OrderListStackParamList, 'CreateOffer'>;

type CreateOfferNavigationProp = NativeStackNavigationProp<
  OrderListStackParamList,
  'ActiveOrderList'
>;

export const CreateOffer: React.FC = () => {
  const {orderId} = useRoute<CreateOfferRouteProp>().params;
  const navigation = useNavigation<CreateOfferNavigationProp>();
  const {uid} = useAuth();

  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleSubmitOffer = async () => {
    if (!price || !date || !comment) {
      Alert.alert('Помилка', 'Будь ласка, заповніть усі поля');
      return;
    }
    setLoading(true);
    try {
      await addOfferToOrder({
        orderId,
        offerData: {price, date, comment, providerId: uid},
      });
      setPrice('');
      setDate(new Date());
      setComment('');
      navigation.navigate('ActiveOrderList');
    } catch (error) {
      console.error('Error submitting offer:', error);
      Alert.alert('Помилка', 'Не вдалося відправити пропозицію');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Pressable onPress={showDatePicker}>
        <View pointerEvents="none">
          <TextInput
            editable={false}
            placeholder="Date"
            value={date.toLocaleDateString()}
            style={styles.input}
          />
        </View>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TextArea
        placeholder="Comment"
        value={comment}
        onChangeText={setComment}
      />
      <Button
        title="Confirm Offer"
        onPress={handleSubmitOffer}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
