import React from 'react';
import {ActivityIndicator, Button, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
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
      <Button
        title="📸🎥 Select photo or video"
        onPress={selectMedia}
        accessibilityLabel="Select media"
      />

      <View style={styles.previewContainer}>
        {mediaUri && mediaType === 'video' && (
          <Video
            source={{uri: mediaUri}}
            style={styles.media}
            controls
            paused
            resizeMode="contain"
          />
        )}
        {mediaUri && mediaType === 'image' && (
          <FastImage source={{uri: mediaUri}} style={styles.media} />
        )}
      </View>

      {uploading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#0000ff"
        />
      )}

      <Button
        title="⬆️ Create order"
        onPress={uploadOrder}
        disabled={uploading}
        accessibilityLabel="Upload order"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  previewContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  media: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  activityIndicator: {
    marginTop: 10,
  },
});

export default UploadMedia;
