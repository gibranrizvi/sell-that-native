import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  dark,
  spacing,
  noShadow,
  autoCapitalize,
  autoCorrect,
  returnKeyType
}) => {
  return (
    <View
      style={{
        ...styles.textInputView,
        shadowRadius: noShadow ? 0 : 12,
        marginBottom: spacing && 6,
        backgroundColor: dark ? '#444' : 'white'
      }}
    >
      <TextInput
        onChangeText={value => onChangeText(value)}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        numberOfLines={2}
        placeholderTextColor="grey"
        underlineColorAndroid="transparent"
        autoCorrect={autoCorrect}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
        clearButtonMode="unless-editing"
        style={{ ...styles.textInputText, color: dark ? 'white' : 'black' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputView: {
    justifyContent: 'center',
    paddingVertical: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    elevation: 20,
    borderRadius: 6
  },
  textInputText: {
    flex: 1,
    fontSize: 14,
    height: 28
  }
});
