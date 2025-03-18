import React, {useMemo} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';

interface RatingProps {
  stars: number;
  setStars: (value: number) => void;
  ratingComment: string;
  setRatingComment: (value: string) => void;
  onConfirm: () => void;
}

const ACTIVE_STAR_COLOR = '#FFD700';
const INACTIVE_STAR_COLOR = '#ccc';

export const FeedBack: React.FC<RatingProps> = ({
  stars,
  setStars,
  ratingComment,
  setRatingComment,
  onConfirm,
}) => {
  const starElements = useMemo(
    () =>
      Array.from({length: 5}).map((_, i) => (
        <Text
          key={i}
          style={[
            styles.star,
            {color: i < stars ? ACTIVE_STAR_COLOR : INACTIVE_STAR_COLOR},
          ]}
          onPress={() => setStars(i + 1)}
          accessibilityLabel={`Оцінка ${i + 1}`}
          accessible>
          ★
        </Text>
      )),
    [stars, setStars],
  );

  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingLabel}>Оцініть (1-5):</Text>
      <View style={styles.starsContainer}>{starElements}</View>
      <TextInput
        style={styles.commentInput}
        placeholder="Ваш коментар"
        value={ratingComment}
        onChangeText={setRatingComment}
        multiline
      />
      <Pressable
        style={styles.confirmButton}
        onPress={onConfirm}
        accessibilityRole="button">
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
});
