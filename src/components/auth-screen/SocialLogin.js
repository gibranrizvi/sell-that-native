import React from 'react';
import { Text, View } from 'react-native';

import ButtonWithIcon from '../button-with-icon/ButtonWithIcon';

export default ({
  googleSignIn,
  facebookSignIn,
  buttonText,
  googleLoading,
  facebookLoading
}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          color: '#999',
          alignSelf: 'center',
          fontStyle: 'italic'
        }}
      >
        - or -
      </Text>
      <ButtonWithIcon
        onPress={googleSignIn}
        loading={googleLoading}
        buttonText={`${buttonText} with Google`}
        icon="google"
        color="orangered"
      />
      <ButtonWithIcon
        onPress={facebookSignIn}
        loading={facebookLoading}
        buttonText={`${buttonText} with Facebook`}
        icon="facebook"
        color="royalblue"
      />
    </View>
  );
};
