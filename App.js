import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import openSans from "./assets/fonts/OpenSans-Regular.ttf";
import openSansBold from "./assets/fonts/OpenSans-Bold.ttf";

import { StartScreen, GameScreen } from "./screens";

const loadFonts = () => {
  return Font.loadAsync({
    openSans,
    openSansBold,
  });
};

export default function App() {
  const [loaded, setLoaded] = useState(false);
  // State for current screen identification
  const [status, setStatus] = useState("start");
  // Grid size =)
  const [gameSettings, setGameSettings] = useState(3);

  // Create handler which provide data needed for start
  const startGame = (setting) => {
    setStatus("game");
    setGameSettings(setting);
  };

  const backToStart = () => {
    setStatus("start");
  };

  if (!loaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setLoaded(true)}
        onError={() => console.log("Something wrong")}
      />
    );
  }

  // Define which screen will be rendered
  let currentScreen = <StartScreen startGame={startGame} />;
  if (status === "game") {
    currentScreen = <GameScreen {...gameSettings} backToStart={backToStart} />;
  }

  // Render
  return <View style={styles.container}>{currentScreen}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
});
