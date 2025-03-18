import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TextArea} from '../../components/textArea';
import {BottomSheet} from '../../components/bottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {UploadMedia} from '../../components/uploadMedia';
import storage from '@react-native-firebase/storage';
import {getMedia, selectMedia} from '../../helpers/selectMedia';
import {useAuth} from '../../context/authContext';
import {OrderStatus} from '../../../types';
import {addOrder} from '../../../api/orders';

export const Order: React.FC = () => {
  const {uid} = useAuth();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'video' | 'image' | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    bottomSheetModalRef.current?.dismiss();
  };

  const uploadOrder = async () => {
    if (!mediaUri || !description || !category || !mediaType) {
      Alert.alert('Помилка', 'Заповніть усі поля');
      return;
    }

    setUploading(true);
    const fileExtension = getMedia(mediaType);
    const fileName = `${mediaType}s/${Date.now()}.${fileExtension}`;
    const reference = storage().ref(fileName);

    try {
      const task = reference.putFile(mediaUri);
      task.on('state_changed', taskSnapshot => {
        console.log(
          `📤 Завантаження: ${taskSnapshot.bytesTransferred} / ${taskSnapshot.totalBytes}`,
        );
      });

      await task;
      const url = await reference.getDownloadURL();

      await addOrder({
        category,
        description,
        mediaUrl: url,
        mediaType,
        userId: uid,
        status: OrderStatus.Active,
      });

      Alert.alert('✅ Успіх', 'Заявку збережено у Firebase!');
      setDescription('');
      setCategory('');
      setMediaUri(null);
      setMediaType(null);
    } catch (error) {
      Alert.alert('❌ Помилка', 'Не вдалося завантажити медіафайл.');
    }

    setUploading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>📝 Опис проблеми:</Text>
      <TextArea
        placeholder="Опишіть проблему детально..."
        value={description}
        onChangeText={setDescription}
      />
      <BottomSheet
        handlePresentModalPress={handlePresentModalPress}
        bottomSheetModalRef={bottomSheetModalRef}
        handleSelect={handleSelectCategory}
        selected={category}
      />
      <UploadMedia
        uploadOrder={uploadOrder}
        mediaType={mediaType}
        uploading={uploading}
        mediaUri={mediaUri}
        selectMedia={() => selectMedia({setMediaType, setMediaUri})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
});
