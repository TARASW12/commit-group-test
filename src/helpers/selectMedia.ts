import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import React from 'react';

interface SelectMediaParams {
  setMediaType: React.Dispatch<React.SetStateAction<'video' | 'image' | null>>;
  setMediaUri: React.Dispatch<React.SetStateAction<string | null>>;
}

export const selectMedia = ({setMediaUri, setMediaType}: SelectMediaParams) => {
  const options: ImageLibraryOptions = {
    mediaType: 'mixed',
    quality: 0.8,
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('Користувач скасував вибір медіа');
    } else if (response.errorMessage) {
      console.error('Помилка вибору медіа:', response.errorMessage);
    } else {
      const asset = response.assets?.[0];
      if (asset?.uri) {
        setMediaUri(asset.uri);
        setMediaType(asset.type?.startsWith('video') ? 'video' : 'image');
      }
    }
  });
};

export const getMedia = (mediaType: string) =>
  mediaType === 'video' ? 'mp4' : 'jpg';
