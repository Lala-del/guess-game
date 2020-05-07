import React from "react";
import { StyleSheet, Modal, View, Text, Button, Image } from "react-native";

import winImg from "../../assets/goal.png";
import loseImg from "../../assets/sad.png";

export const EndGameModal = ({ isWin, close, visible }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.card}>
          <Text>You {isWin ? "Win" : "Lose"}!</Text>
          <Image style={styles.image} source={isWin ? winImg : loseImg} />
          <Button title="Replay" onPress={close} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    padding: 30,
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 15,
  },
});
