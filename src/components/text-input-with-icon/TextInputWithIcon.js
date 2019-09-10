import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({
  value,
  onChangeText,
  onFocus,
  placeholder,
  secureTextEntry,
  icon,
  shadow,
  onClear
}) => {
  return (
    <View style={[styles.textInputView, { shadowOpacity: shadow && 0.2 }]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Ionicons name={icon} size={24} color="grey" />
      </View>
      <View style={{ flex: 7 }}>
        <TextInput
          disabled
          onChangeText={value => onChangeText(value)}
          value={value}
          onFocus={onFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInputText}
          returnKeyType="search"
        />
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <TouchableOpacity onPress={onClear}>
          <View style={{ width: 36, alignItems: 'center' }}>
            <Ionicons name="ios-close" size={32} color="grey" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    elevation: 20,
    borderRadius: 6
  },
  textInputText: {
    flex: 1,
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
    height: 32
  }
});
