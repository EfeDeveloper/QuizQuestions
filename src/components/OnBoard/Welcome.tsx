import React from "react";
import { Dimensions, Image } from "react-native";
import Constants from "expo-constants";

// Utilidades de navegación
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { OnBoardingRoutes } from "../Navigation";
import { AppStackRoutes } from "../../../App";

import { verticalScale, moderateScale } from "react-native-size-matters";
import Animated from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
const { height, width } = Dimensions.get("window");

export const welcomeAssets = require("../../../assets/imag/question.png");

// Utilidades
import theme, { Box, Text } from "../themes";
import { Button } from "../../utils";
import QuizContainer from "../Question/QuizContainer";

interface WelcomeProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<OnBoardingRoutes, "Welcome">,
    StackNavigationProp<AppStackRoutes, "Question">
  >;
}

const Welcome = ({ navigation }: WelcomeProps) => {
  return (
    <QuizContainer>
      <Box flex={1} backgroundColor="white" justifyContent="flex-start">
        <Box height={height * 0.5} justifyContent="center" alignItems="center">
          <Box
            height={verticalScale(250)}
            width={moderateScale(250)}
            backgroundColor="white"
            alignItems="center"
            justifyContent="center"
            padding="m"
          >
            <Image
              source={welcomeAssets}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
          </Box>
        </Box>
        <Animated.View
          style={{
            backgroundColor: theme.colors["primary"],
            height: 500 + height,
            width: width * 2,
            borderRadius: 1000,
            position: "absolute",
            alignSelf: "center",
            top: 0.52 * height,
          }}
        />

        <Animated.View
          style={{
            backgroundColor: theme.colors["primary"],
            height: height * 0.35,
            width: width,
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text variant="title" marginBottom="m" textAlign="center">
            Quiz App
          </Text>

          <Text
            variant="body"
            color="white"
            textAlign="center"
            marginBottom="m"
          >
            Bienvenido(a) demuestra tus conocimientos en tecnología con esta
            simple trivia de 10 preguntas, donde responderás si un enunciado es
            falso o verdadero.
          </Text>

          <Button
            variant="primary"
            label="Iniciar"
            onPress={() => navigation.navigate("Question")}
          />
        </Animated.View>
      </Box>
      <StatusBar backgroundColor={theme.colors["primary"]} style="light" />
    </QuizContainer>
  );
};

export default Welcome;
