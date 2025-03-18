import React, {useCallback} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

export const MyTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const handlePress = useCallback(() => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }, [isFocused, navigation, route]);

        const handleLongPress = useCallback(() => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        }, [navigation, route]);

        const labelContent =
          typeof label === 'function'
            ? label({
                focused: isFocused,
                color: isFocused ? 'red' : 'black',
                position: 'below-icon',
                children: route.name,
              })
            : label;

        return (
          <Pressable
            key={route.key}
            onPress={handlePress}
            onLongPress={handleLongPress}
            style={styles.tabButton}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}>
            <Text
              style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
              {labelContent}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 53,
    width: '100%',
    borderRadius: 16,
    shadowRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 14,
    color: 'black',
  },
  tabLabelFocused: {
    fontSize: 16,
    color: 'red',
  },
});
