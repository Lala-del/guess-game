import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";

import { EndGameModal } from "./EndGameModal";

export const GameScreen = ({ size, hardness, isMineSweeper, backToStart }) => {
  const [grid, setGrid] = useState(prepareGrid(size));
  const [openedCount, setOpenedCount] = useState(0);
  const [openedSecretCount, setOpenedSecretCount] = useState(0);
  const [endGameModalVisible, setEndGameModalVisible] = useState(false);

  const [isOpenedForRemember, setIsOpenedForRemember] = useState(
    !isMineSweeper
  );
  const openedTimer = useRef(null);

  const openedLimit = Math.floor(((size * size) / 100) * 90);
  const isLimitPassed = openedCount >= openedLimit;
  const isWin = Math.floor((size * size) / 2) === openedSecretCount;

  const getCellSize = () => {
    const { width, height } = Dimensions.get("window");
    const isPortrait = height > width;
    const targetSize = isPortrait ? width : height;
    console.log("getCellSize");
    return (targetSize - 100) / size;
  };
  const [cellSize, setCellSize] = useState(getCellSize());

  const cellPressHandler = (y, x) => {
    if (!grid[y][x].opened && !isLimitPassed) {
      setGrid((grid) => {
        const updatedGrid = [...grid];
        updatedGrid[y] = [...updatedGrid[y]];
        updatedGrid[y][x] = { ...updatedGrid[y][x], opened: true };

        return updatedGrid;
      });
      setOpenedCount((count) => count + 1);

      if (grid[y][x].secret) {
        setOpenedSecretCount((count) => count + 1);
      }
      setEndGameModalVisible(openedCount + 1 >= openedLimit);
    }
  };

  const resetGame = () => {
    setGrid(prepareGrid(size));
    setOpenedCount(0);
    setOpenedSecretCount(0);
    setEndGameModalVisible(false);

    setIsOpenedForRemember(true);
    closeForRemembering();
  };

  const closeForRemembering = () => {
    if (openedTimer.current) {
      clearTimeout(openedTimer.current);
    }
    openedTimer.current = setTimeout(() => {
      setIsOpenedForRemember(false);
    }, 2000);
  };

  useEffect(() => {
    closeForRemembering();
  }, []);

  useEffect(() => {
    const updateCellSize = () => {
      setCellSize(getCellSize());
    };
    Dimensions.addEventListener("change", updateCellSize);

    return () => Dimensions.removeEventListener("change", updateCellSize);
  }, []);

  return (
    <View style={styles.container}>
      <Text>GameScreen</Text>
      <Text>
        {openedCount}/{openedSecretCount}/{openedLimit}
      </Text>
      <Text>{isLimitPassed ? (isWin ? "Win" : "Lose") : "inProcess"}</Text>
      <View style={styles.grid}>
        {grid.map((row, y) => (
          <View style={styles.row} key={y}>
            {row.map(({ opened, secret }, x) => (
              <TouchableOpacity
                activeOpacity={0.5}
                key={x}
                onPress={() => cellPressHandler(y, x)}
              >
                <View
                  style={{
                    ...styles.cell,
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: chooseColor(
                      opened || isOpenedForRemember,
                      secret
                    ),
                  }}
                ></View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.buttons}>
        <Button title="Back" onPress={backToStart} />
        <Button title="Reset" onPress={resetGame} />
      </View>

      <EndGameModal
        visible={endGameModalVisible}
        isWin={isWin}
        close={resetGame}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    borderColor: "black",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "grey",
  },
  buttons: {
    width: 300,
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-around",
  },
});

function prepareGrid(size) {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push({ opened: false, secret: false });
    }
    grid.push(row);
  }

  const secretsTotal = Math.floor((size * size) / 2);
  let secretsCount = 0;

  while (secretsCount < secretsTotal) {
    const randY = randomInt(0, size - 1);
    const randX = randomInt(0, size - 1);
    const target = grid[randY][randX];

    if (!target.secret) {
      target.secret = true;
      secretsCount++;
    }
  }

  return grid;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function chooseColor(opened, secret) {
  let color = "grey";
  if (opened) {
    if (secret) {
      color = "green";
    } else {
      color = "white";
    }
  }
  return color;
}
