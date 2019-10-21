// Example taken from Expo - https://docs.expo.io/versions/latest/sdk/camera/

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

/* Import App and Camera Permissions */
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraExample extends React.Component {
  
  /* Use state to track camera preview type and app permissions */
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  /* When the component has mounted ask for camera permissions */
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  /* Render a different view according to permissions state */
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      /* Awaiting for permissions */
      return <View />;
    } else if (hasCameraPermission === false) {
      /* Camera permissions have not been granted */
      return <Text>No access to camera</Text>;
    } else {
      /* Camera permissions granted */
      return (
        <View style={{ flex: 1 }}>
          {/* Create a camera preview of some type */}
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              {/* Touchable to toggle camera preview */}
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  /* Toggle camera preview, i.e. use front or back camera */
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> 
                  Flip
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}