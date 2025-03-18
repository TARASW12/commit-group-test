import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export const categories: string[] = [
  'Електрика',
  'Сантехніка',
  'Будівництво',
  'Техніка',
  'Інше',
];

interface BottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handleSelect: (item: string) => void;
  handlePresentModalPress: () => void;
  selected?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  bottomSheetModalRef,
  handleSelect,
  handlePresentModalPress,
  selected,
}) => {
  return (
    <>
      <Text style={styles.label}>🔧 Виберіть категорію:</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={handlePresentModalPress}>
        <Text style={styles.selectorText}>
          {selected || 'Оберіть категорію'}
        </Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['33%', '33%']}
        enablePanDownToClose={true}>
        <BottomSheetView style={styles.contentContainer}>
          {categories.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.item}
              onPress={() => handleSelect(item)}>
              <Text
                style={[
                  styles.itemText,
                  selected === item && styles.selectedItemText,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 140,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  selectedItemText: {
    fontWeight: 'bold',
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
});
