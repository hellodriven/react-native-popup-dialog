// @flow

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import type { OverlayProps } from '../type';

class Overlay extends Component<OverlayProps> {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#000',
      opacity: 0.5,
      animationDuration: 2000,
      visible: false,
      useNativeDriver: true,
      onPress: () => { },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, useNativeDriver, animationDuration: duration } = prevState;
    if (visible !== nextProps.visible) {
      const toValue = nextProps.visible ? nextProps.opacity : 0;
      Animated.timing(prevState.opacity, {
        toValue,
        duration,
        useNativeDriver,
      }).start();
    }

    return nextProps;
  }

  opacity = new Animated.Value(0)

  render() {
    const { onPress, pointerEvents, backgroundColor } = this.props;
    const { opacity } = this;

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor,
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          onPress={onPress}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    );
  }
}

export default Overlay;
