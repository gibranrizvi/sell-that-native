import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.textInputView}>
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
        style={styles.textInputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
    marginVertical: 8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
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
