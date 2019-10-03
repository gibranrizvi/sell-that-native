import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import layout from '../../constants/layout';
import ButtonRounded from '../button-rounded/ButtonRounded';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = layout.window;

const LikesModal = ({ likes, navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const { navigate } = navigation;

  let scrollViewRef = React.useRef(null).current;
  let scrollOffset = null;

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {likes.length > 0 && (
          <Text
            style={{
              fontSize: 12,
              color: '#555',
              marginBottom: 4,
              fontStyle: 'italic'
            }}
          >
            {likes.length}{' '}
            {likes.length === 1 ? 'person likes this' : 'people like this'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Modal component */}
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationInTiming={300}
        animationOut="slideOutDown"
        animationOutTiming={300}
        backdropTransitionOutTiming={0}
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        propagateSwipe
        swipeDirection="down"
        swipeThreshold={200}
        scrollTo={position => scrollViewRef.scrollTo(position)}
        scrollOffset={scrollOffset}
        style={{
          justifyContent: 'flex-end',
          margin: 0
        }}
      >
        <View style={{ height: height / 1.5, justifyContent: 'flex-end' }}>
          <View
            style={{
              height: height / 1.5 - 40,
              backgroundColor: 'white',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            }}
          >
            {/* White bar */}
            <View
              style={{
                position: 'absolute',
                top: -10,
                alignSelf: 'center',
                height: 4,
                width: 86,
                borderRadius: 2,
                backgroundColor: 'white'
              }}
            />
            {/* Modal header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 12,
                paddingHorizontal: 8
              }}
            >
              <View style={{ flex: 1 }} />
              <View
                style={{
                  flex: 8,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500'
                  }}
                >
                  Likes
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="ios-close" size={32} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              ref={ref => (scrollViewRef = ref)}
              // TODO try this without state
              onScroll={({ nativeEvent }) =>
                (scrollOffset = nativeEvent.contentOffset.y)
              }
              scrollEventThrottle={16}
              style={{ marginVertical: 8, height: height / 2 }}
            >
              {likes.map(({ liked_by }, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    borderColor: '#CCCCCC'
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <ButtonRounded
                      onPress={() => {
                        setModalVisible(false);
                        return navigate('Profile');
                      }}
                      image={liked_by.profile_picture}
                      size={42}
                      noShadow
                    />
                  </View>
                  <View
                    style={{
                      flex: 8,
                      justifyContent: 'space-between',
                      marginLeft: 12,
                      borderBottomWidth: index === likes.length - 1 ? 0 : 0.4
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        return navigate('Profile');
                      }}
                    >
                      <>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 12,
                            marginBottom: 2
                          }}
                        >
                          {liked_by.first_name} {liked_by.last_name}
                        </Text>
                        {liked_by.address && (
                          <Text style={{ fontSize: 12 }}>
                            {liked_by.address}
                          </Text>
                        )}
                      </>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LikesModal;
