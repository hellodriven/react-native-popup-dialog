// @flow

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import type { OverlayProps } from '../type';

class Overlay extends Component<OverlayProps> {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#000',
      opacity: new Animated.Value(0),
      animationDuration: 2000,
      visible: false,
      useNativeDriver: true,
      onPress: () => { },
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { visible, useNativeDriver, animationDuration: duration } = prevProps;
    if (visible !== this.props.visible) {
      const toValue = this.props.visible ? this.props.opacity : 0;
      Animated.timing(this.state.opacity, {
        toValue,
        duration,
        useNativeDriver,
      }).start();
    }

  }

  render() {
    const { onPress, pointerEvents, backgroundColor } = this.props;
    const opacity = this.state.opacity

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
