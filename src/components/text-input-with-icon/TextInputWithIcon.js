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
  returnKeyType,
  autoCorrect,
  autoCapitalize,
  multiline,
  numberOfLines,
  noShadow,
  dark,
  spacing,
  disabled,
  onSubmit
}) => {
  return (
    <View
      style={{
        ...styles.container,
        shadowRadius: noShadow ? 0 : 12,
        marginBottom: spacing && 6,
        backgroundColor: dark ? '#444' : '#EEE'
      }}
    >
      <View style={styles.textInputView}>
        <TextInput
          disabled={disabled}
          onChangeText={value => onChangeText(value)}
          value={value}
          onFocus={onFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
          clearButtonMode="unless-editing"
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          multiline={multiline}
          numberOfLines={numberOfLines}
          returnKeyType={returnKeyType}
          style={{ ...styles.textInputText, color: dark ? 'white' : 'black' }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity onPress={onSubmit}>
          <Ionicons name={icon} size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    elevation: 20,
    borderRadius: 6
  },
  textInputView: {
    flex: 9,
    justifyContent: 'center',
    paddingVertical: 4,
    paddingLeft: 4
  },
  textInputText: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: 'grey',
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 14,
    height: 28
  }
});
