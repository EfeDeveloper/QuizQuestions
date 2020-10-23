import React from "react";
import { Dimensions, SafeAreaView, Image } from "react-native";
import Constants from "expo-constants";
import { Box } from "../theme";
import { verticalScale, moderateScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

export const welcomeAssets = require("../../../assets/imag/question.png");

const Welcome = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
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

        
      </Box>
    </SafeAreaView>
  );
};

export default Welcome;
