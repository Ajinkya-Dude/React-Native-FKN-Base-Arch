import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import theme from '../../theme';

export const Loader = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        elevation: 2,
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <ActivityIndicator size="large" color={'#f76345'} />
    </View>
  );
};

export default Loader;
