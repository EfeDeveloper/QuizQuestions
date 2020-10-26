import React, { ReactElement, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import theme from "../theme";

export interface QuizContainerProps {

 children: ReactNode;
}

export default function QuizContainer({children}: QuizContainerProps) {
  return (
    <SafeAreaView style={{ paddingTop: Constants.statusBarHeight,  flex: 1 }}>
      {children}
      <StatusBar backgroundColor={theme.colors["primary"]} style="light" />
    </SafeAreaView>
  );
}
