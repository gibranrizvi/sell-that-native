import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import layout from '../../constants/layout';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = layout.window;

export default ({ uri, pickImage, openCamera, onDeletePress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity onPress={pickImage}>
          <View
            style={{
              padding: 16
            }}
          >
            <MaterialIcons name="photo-library" size={32} color="#333" />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          borderRadius: 0,
          padding: 16,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          shadowColor: 'black',
          shadowOpacity: 0.2,
          elevation: 20
        }}
      >
        {!!uri && (
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              zIndex: 1
            }}
          >
            <TouchableOpacity onPress={onDeletePress}>
              <View
                style={{
                  paddingLeft: 8,
                  paddingRight: 8
                }}
              >
                <Ionicons name="ios-close" size={36} color="#333" />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <Image
          source={
            !uri ? require('../../../assets/images/robot-prod.png') : { uri }
          }
          style={{
            borderRadius: width / 4 - 21,
            height: width / 2 - 42,
            width: width / 2 - 42,
            resizeMode: 'cover'
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity onPress={openCamera}>
          <View
            style={{
              padding: 16
            }}
          >
            <MaterialIcons name="photo-camera" size={32} color="#333" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
