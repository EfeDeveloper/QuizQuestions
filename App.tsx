import * as React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LoadAssets, theme } from "./src/components";
import { OnBoardingNavigator } from "./src/components/OnBoard";
import { QuestionNavigator } from "./src/components/Question";

import { welcomeAssets } from "./src/components/OnBoard/Welcome";

const assets: number[] = [welcomeAssets];

const fonts = {
  "Gotham-Bold": require("./assets/fonts/Gotham-Bold.otf"),
  "Gotham-Medium": require("./assets/fonts/Gotham-Medium.ttf"),
  "Gotham-Black": require("./assets/fonts/Gotham-Black.otf"),
};

export type AppStackRoutes = {
  OnBoarding: undefined;
  Question: undefined;
};

const AppStack = createStackNavigator<AppStackRoutes>();

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
     <LoadAssets {...{ assets, fonts }}>
        <SafeAreaProvider>
          <AppStack.Navigator headerMode="none" initialRouteName="OnBoarding">
            <AppStack.Screen
              name="OnBoarding"
              component={OnBoardingNavigator}
            />
            <AppStack.Screen name="Question" component={QuestionNavigator} />
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
      <StatusBar />
    </ThemeProvider>
  );
}
