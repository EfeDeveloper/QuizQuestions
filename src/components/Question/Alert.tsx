import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button } from "../../utils";
import { Box, Text } from "../theme";
import Well from "../IconsSvg/Well";
import Wrong from "../IconsSvg/Wrong";
import { moderateScale } from "react-native-size-matters";
import Animated, { interpolate } from "react-native-reanimated";
const { height, width } = Dimensions.get("window");


interface FinishedAlertProps {
  finished: Animated.Node<number>;
  onRestart: () => void;
  userAnswers: any | undefined;
}

const FinishedAlert = ({
  finished,
  onRestart,
  userAnswers,
}: FinishedAlertProps) => {
  const [percent, setPercent] = useState<number | any>();
  const [correctCount, setCorrectCount] = useState<number>(0);

  const opacity = interpolate(finished, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const zIndex = interpolate(finished, {
    inputRange: [0, 1],
    outputRange: [0, 2],
  });

  const calculaterScore = () => {
    let correct = 0;
    for (const el of userAnswers) {
      if (el.answerIsCorrect) {
        correct++;
      }
    }
    setCorrectCount(correct);
    const got = (correct / 100) * 10;
    const percentage = got * 100;
    setPercent(percentage);
  };

  useEffect(() => {
    calculaterScore();
  }, [userAnswers]);

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#00000090",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        zIndex,
      }}
    >
      <Box
        height={moderateScale(height * 0.7)}
        width={moderateScale(width * 0.85)}
        alignItems="center"
      >
        <Box
          backgroundColor="white"
          height={moderateScale(120)}
          width={moderateScale(360)}
          position="absolute"
          zIndex={1}
          justifyContent="center"
          alignItems="center"
          top={moderateScale(12)}
        >
          {percent > 50 ? <Well /> : <Wrong />}
        </Box>
        <Box height={height * 0.15}></Box>
        <Box
          flex={1}
          alignItems="center"
          style={{ paddingTop: 120 }}
          padding="xl"
          backgroundColor="white"
        >
          <Text
            variant="title"
            fontSize={moderateScale(25)}
            marginBottom="s"
            color="black"
            textAlign="center"
          >
            {percent > 50 ? "Felicidades tu puntaje es de:" : "Lo lamento tupuntaje es de:"}
          </Text>

          <Text
            variant="title"
            color={percent > 50 ? "green" : "danger"}
            textAlign="center"
            marginBottom="m"
          >
            {percent}%
          </Text>

          <Text
            variant="body"
            fontWeight="600"
            color="black"
            textAlign="center"
            marginBottom="m"
          >
            El quiz se ha completado con exito.
          </Text>

          <Text
            color="black"
            variant="body"
            textAlign="center"
            marginBottom="m"
            fontSize={14}
          >
            Has contestado {userAnswers.length} preguntas de las cuales{" "} {correctCount} son correctas.
          </Text>

          <Button onPress={onRestart} variant="button" label="Volver" />
        </Box>
      </Box>
    </Animated.View>
  );
};

export default FinishedAlert;