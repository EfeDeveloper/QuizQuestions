import React from "react";
import { Dimensions } from "react-native";
import { Box, Text } from "../theme";
const { width } = Dimensions.get("window");

interface QuestionSlideProps {
  question: string;
  questionNr: number;
}

export default function QuestionSlide({ question, questionNr }: QuestionSlideProps) {
  return (
    <Box {...{ width }}
      alignItems="center"
      padding="m">
      <Text
        variant="title"
        fontSize={40}
        marginTop="m"
      >
        Pregunta Numero {questionNr}
      </Text>

      <Text
        variant="body"
        color="white"
        marginTop="xl"
        textAlign="center"
      >
        {question}
      </Text>
    </Box>
  );
}
