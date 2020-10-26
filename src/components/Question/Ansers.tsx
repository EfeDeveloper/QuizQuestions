import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { AnswersBtn } from "../../utils";

interface AnswersProps {
  answers: boolean[];
  onPress?: () => void;
  answerSelected: (answer: boolean, index: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 44,
  },
});

export default function Answers({ answers, answerSelected }: AnswersProps) {
  return (
    <View style={{ ...styles.container }}>
      {answers.map((_, index) => (
        <Fragment key={index}>
          <AnswersBtn
            answer={answers[index]}
            onPress={() => {
              answerSelected(answers[index], index);
            }}
          />
        </Fragment>
      ))}
    </View>
  );
}
