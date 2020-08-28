import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import Toolbar from "./CameraToolbar";
import Gallery from "./CameraGallery";
import useStatusBar from "../hooks/useStatusBar";

const CameraScreen = (props) => {
  useStatusBar("dark-content");

  camera = null;

  const [captures, setCaptures] = useState([]);
  const [capturing, setCapturing] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // default back camera
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  // default flash off
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

  const handleCaptureIn = () => {
    setCapturing(true);
  };

  const handleCaptureOut = () => {
    if (capturing) {
      setCapturing(false);
    }
  };

  const handleShortCapture = async () => {
    const photoData = await camera.takePictureAsync();
    handleCaptureOut();
    setCaptures([photoData, ...captures]);
    MediaLibrary.saveToLibraryAsync(photoData.uri);
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      const libraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(
        cameraStatus.status == "granted" && libraryStatus.status == "granted"
      );
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>Access to camera has been denied.</Text>;
  }
  return (
    <React.Fragment>
      <View>
        <Camera
          type={cameraType}
          flashMode={flashMode}
          style={styles.screen}
          ref={(camera) => (this.camera = camera)}
        />
      </View>

      {captures.length > 0 && <Gallery captures={captures} />}

      <Toolbar
        capturing={capturing}
        flashMode={flashMode}
        cameraType={cameraType}
        setFlashMode={setFlashMode}
        setCameraType={setCameraType}
        onCaptureIn={handleCaptureIn}
        onCaptureOut={handleCaptureOut}
        onShortCapture={handleShortCapture}
      />
    </React.Fragment>
  );
};

//For getting full screen style of camera page
const { width: winWidth, height: winHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  screen: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

export default CameraScreen;
