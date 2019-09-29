import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { formatDistanceToNow } from 'date-fns';

import ButtonRounded from '../button-rounded/ButtonRounded';
import { Ionicons } from '@expo/vector-icons';

const PostHeader = ({ openPost, created_at, created_by, navigation }) => {
  let postOptionsActionSheet = React.useRef(null).current;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12
      }}
    >
      <ActionSheet
        ref={ref => (postOptionsActionSheet = ref)}
        options={['Message Seller', 'Save Post', 'Report Post', 'Cancel']}
        cancelButtonIndex={3}
        destructiveButtonIndex={2}
        onPress={index => {
          if (index === 0) {
            // TODO
          }
        }}
        tintColor="royalblue"
      />
      <View style={{ flex: 1 }}>
        <ButtonRounded
          onPress={() => navigation.navigate('Profile')}
          image={created_by.profile_picture}
          size={32}
          noShadow
        />
      </View>
      <View
        style={{
          flex: 8,
          justifyContent: 'space-between',
          paddingLeft: 4
        }}
      >
        <Text
          style={{
            fontWeight: '600',
            fontSize: 12,
            marginBottom: 2
          }}
        >
          {created_by.first_name} {created_by.last_name}{' '}
          <Text
            style={{
              fontWeight: 'normal',
              color: '#555',
              fontStyle: 'italic'
            }}
          >
            posted {formatDistanceToNow(created_at)} ago
          </Text>
        </Text>
        <Text style={{ fontSize: 12 }}>{created_by.address}</Text>
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <TouchableOpacity onPress={() => postOptionsActionSheet.show()}>
          <View>
            <Ionicons
              name="ios-more"
              color="#333"
              size={24}
              style={{ alignSelf: 'center' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostHeader;
