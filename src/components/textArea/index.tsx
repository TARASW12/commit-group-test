import {StyleSheet, TextInput} from 'react-native';
import React from 'react';

interface InputProps {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
}

export const TextArea: React.FC<InputProps> = ({
  value,
  placeholder,
  onChangeText,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline
      numberOfLines={4}
      style={styles.textArea}
    />
  );
};
const styles = StyleSheet.create({
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
});
