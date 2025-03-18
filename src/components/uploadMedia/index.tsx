import {ActivityIndicator, Button, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import React from 'react';
import FastImage from 'react-native-fast-image';
interface UploadMediaProps {
  mediaUri: string | null;
  mediaType: 'video' | 'image' | null;
  selectMedia: () => void;
  uploading: boolean;
  uploadOrder: () => void;
}

export const UploadMedia: React.FC<UploadMediaProps> = ({
  mediaUri,
  mediaType,
  selectMedia,
  uploading,
  uploadOrder,
}) => {
  return (
    <View style={styles.container}>
      <Button  title="📸🎥 Select photo or video" onPress={selectMedia} />

      <View style={{alignItems: 'center'}}>
        {mediaUri && mediaType === 'video' && (
          <Video
            source={{uri: mediaUri}}
            style={{width: 200, height: 200}}
            controls
            paused
            resizeMode="contain"
          />
        )}
        {mediaUri && mediaType === 'image' && (
          <FastImage
            source={{uri: mediaUri}}
            style={{width: 200, height: 200}}
          />
        )}
      </View>

      {uploading && (
        <ActivityIndicator
          style={{marginTop: 10}}
          size="large"
          color="#0000ff"
        />
      )}
      <Button
        title="⬆️Create order"
        onPress={uploadOrder}
        disabled={uploading}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 140,
  },

  container: {
    flex: 1,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },

  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#F8F8F8',
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  selector: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
  },
  selectorText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  bottomSheetContent: {
    padding: 16,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  selectedItemText: {
    fontWeight: 'bold',
  },
});
