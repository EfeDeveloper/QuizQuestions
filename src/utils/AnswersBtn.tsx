import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";
import { Theme, Text } from "../components/theme";
const { width } = Dimensions.get("window");

interface AnswerButtonProps {
  answer?: boolean;
  clicked?: number | boolean;
  correct?: boolean;
  variant?: "default" | "button";
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderColor: "#ffff",
    borderWidth: 1,
  },
});

const AnswersBtn = ({ variant, answer, onPress }: AnswerButtonProps) => {
  const theme = useTheme<Theme>();
  const backgroundColor =
    variant === "button" ? theme.colors.button : theme.colors.primary;
  const color = variant === "button" ? theme.colors.button : theme.colors.white;

  return (
    <RectButton
      {...{ onPress }}
      style={{
        ...styles.container,
        width: width * 0.9,
        backgroundColor,
      }}
    >
      <Text style={{ color }} variant="button" textAlign="center">
        {answer}
      </Text>
    </RectButton>
  );
};

AnswersBtn.defaultProps = { variant: "default" };

export default AnswersBtn;
