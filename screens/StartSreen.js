import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Picker,
  Switch,
  TouchableOpacity,
  Slider,
} from "react-native";

import { DefText } from "../components";

export const StartScreen = ({ startGame }) => {
  const [size, setSize] = useState(7);
  const [hardness, setHardness] = useState("medium");
  const [isMineSweeper, setIsMineSwiper] = useState(false);

  const changeHardness = (v) => setHardness(v);
  const changeIsMineSwiper = (v) => setIsMineSwiper(v);
  const sizeInputHandler = (v) => setSize(v);

  const resetSizeHandler = () => {
    setSize(7);
    setHardness("medium");
    setIsMineSwiper(false);
  };

  const startBtnHandler = () => {
    startGame({ size, hardness, isMineSweeper });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}>
        <View style={styles.container}>
          <View style={styles.card}>
            <DefText weight="bold" style={styles.mainHeading}>
              Setup game
            </DefText>

            <DefText weight="bold" style={styles.heading}>
              Set Size
            </DefText>
            <DefText style={styles.sizeValue}>{size}</DefText>
            <Slider
              value={size}
              onValueChange={sizeInputHandler}
              step={1}
              minimumValue={4}
              maximumValue={10}
            />

            <DefText weight="bold" style={styles.heading}>
              Set Hardness
            </DefText>
            <Picker selectedValue={hardness} onValueChange={changeHardness}>
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
            </Picker>

            <DefText weight="bold" style={styles.heading}>
              Set Mode
            </DefText>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => changeIsMineSwiper(false)}>
                <View style={styles.modeLabel}>
                  <Text>Memory</Text>
                </View>
              </TouchableOpacity>
              <Switch
                value={isMineSweeper}
                onValueChange={changeIsMineSwiper}
              />
              <TouchableOpacity onPress={() => changeIsMineSwiper(true)}>
                <View style={{ ...styles.modeLabel, alignItems: "flex-end" }}>
                  <Text>Minesweeper</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.row, marginTop: 25 }}>
              <View style={styles.buttonWrapper}>
                <Button title="Reset" onPress={resetSizeHandler} />
              </View>
              <View style={styles.buttonWrapper}>
                <Button title="Start" onPress={startBtnHandler} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 30,
    width: "50%",
    minWidth: 340,
    maxWidth: "95%",
    borderRadius: 10,
    justifyContent: "center",
  },
  mainHeading: {
    textAlign: "center",
    fontSize: 26,
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  sizeValue: {
    textAlign: "center",
    fontSize: 16,
  },
  field: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderStyle: "solid",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    width: "48%",
  },
  modeLabel: {
    width: 100,
  },
});
