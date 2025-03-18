import React from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';

interface RatingProps {
  stars: number;
  setStars: (value: number) => void;
  ratingComment: string;
  setRatingComment: (value: string) => void;
  onConfirm: () => void;
}

export const FeedBack: React.FC<RatingProps> = ({
  stars,
  setStars,
  ratingComment,
  setRatingComment,
  onConfirm,
}) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingLabel}>Оцініть (1-5):</Text>
      <View style={styles.starsContainer}>
        {Array.from({length: 5}).map((_, i) => (
          <Text
            key={i}
            style={[styles.star, {color: i < stars ? '#FFD700' : '#ccc'}]}
            onPress={() => setStars(i + 1)}>
            ★
          </Text>
        ))}
      </View>
      <TextInput
        style={styles.commentInput}
        placeholder="Your Comment"
        value={ratingComment}
        onChangeText={setRatingComment}
        multiline
      />
      <Pressable style={styles.confirmButton} onPress={onConfirm}>
        <Text style={styles.confirmButtonText}>Підтвердити</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  star: {
    fontSize: 40,
    marginHorizontal: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
});
