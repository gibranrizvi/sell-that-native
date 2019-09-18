import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  dark,
  spacing
}) => {
  return (
    <View
      style={{
        ...styles.textInputView,
        marginBottom: spacing && 6,
        backgroundColor: dark ? '#444' : '#FAFAFA'
      }}
    >
      <TextInput
        onChangeText={value => onChangeText(value)}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="grey"
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="unless-editing"
        style={{ ...styles.textInputText, color: dark ? 'white' : 'black' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    padding: 8,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    elevation: 20,
    borderRadius: 6
  },
  textInputText: {
    flex: 1,
    fontWeight: '500',
    fontSize: 16,
    height: 32
  }
});
