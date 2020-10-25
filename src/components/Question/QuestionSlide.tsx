import React from "react";
import { View, Dimensions } from "react-native";
import { Box, Text } from "../themes";
import { questions } from './data';
const { width, height } = Dimensions.get("window");

interface QuestionSlideProps {
  question: string;
  questionNr: number;
}

export default function QuestionSlide({ question, questionNr }: QuestionSlideProps) {
  return (
    <Box {...{ width }} alignItems="center" padding="m">
      <Text variant="title" fontSize={24} marginTop="m">
        Pregunta Numero {questionNr}
      </Text>

      <Text variant="body" color="white" marginTop="xl" textAlign="center">
        {question}
      </Text>
    </Box>
  );
}
