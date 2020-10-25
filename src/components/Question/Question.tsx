import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";
import Animated, {
  multiply,
  SpringUtils,
  Value
} from "react-native-reanimated";
import {
  useScrollHandler,
  useValue,
  withSpringTransition
} from "react-native-redash";
import { verticalScale } from "react-native-size-matters";
import { AppStackRoutes } from "../../../App";
import { Button } from "../../Utils";
import {
  grabQuizQuestions, QuestionsDifficulty,


  QuizPropsState, _
} from "../Helper";
import { OnBoardingRoutes } from "../Navigation";
import QuizContainer from "../Question/QuizContainer";
import theme, { Box, Text } from "../themes";
import FinishedAlert from "./Alert";
import Answers from "./Ansers";
import QuestionSlide from "./QuestionSlide";
const { View, ScrollView } = Animated;

//Utilidades
const { height, width } = Dimensions.get("window");


export type currAnswerObjectProps = {
  question: string;
  answer: string;
  answerIsCorrect: boolean;
  correctAnswer: string;
};

interface QuestionsProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<OnBoardingRoutes, "Welcome">,
    StackNavigationProp<AppStackRoutes, "Question">
  >;
}

const Question = ({ navigation }: QuestionsProps) => {
  const { x, scrollHandler } = useScrollHandler();
  const scroll = useRef<Animated.ScrollView>(null);

  const [qloading, setqloading] = useState<boolean>(false);
  const [allQuestions, setAllQuestion] = useState<QuizPropsState[]>([]);
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<
    currAnswerObjectProps[]
  >([]);
  const [score, setScore] = useState<number>(0);
  const [curNum, setCurNum] = useState<number>(0);
  const [TOTAL_QUESTIONS] = useState<number>(10);
  const [quizOver, setQuizOver] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState<boolean>(false);

  const shuffledDifficulty = _([
    QuestionsDifficulty.EASY,
    QuestionsDifficulty.MEDIUM,
    QuestionsDifficulty.HARD,
  ]);

  const answerSelected = (answer: string, index: number) => {
    if (!quizOver) {
      //Verificador de respuesta correcta
      const answerIsCorrect = allQuestions[curNum].correct_answer === answer;

      //Incremento de puntaje si la respuesta es correcta
      if (answerIsCorrect) setScore((currScore) => currScore + 1);

      //Guardado de respuesta actual correcrta seleccionada por el usuario
      const currAnswerOject = {
        question: allQuestions[curNum].question,
        answer,
        answerIsCorrect,
        correctAnswer: allQuestions[curNum].correct_answer,
      };

      setUserSelectedAnswers((curranswers) => [
        ...curranswers,
        currAnswerOject,
      ]);
    }
  };

  const startJob = async () => {
    setqloading(true);
    setQuizOver(false);
    const newQuestions = await grabQuizQuestions(
      TOTAL_QUESTIONS,
      shuffledDifficulty[0]
    );
    setAllQuestion(newQuestions);
    setScore(0);
    setUserSelectedAnswers([]);
    setqloading(false);
  };

  const nextQuestion = () => {
    //Pasar a la siguiente pregunta sin permitir regresar
    if (!quizOver && curNum < allQuestions.length - 1) {
      setCurNum((number) => +1);
    } else {
      setQuizOver(true);
    }
  };

  useEffect(() => {
    if (scroll.current) {
      scroll.current.getNode().scrollResponderScrollTo({
        x: width * curNum,
        animated: true,
      });
    }
  }, [curNum]);

  useEffect(() => {
    if (userSelectedAnswers.length > 0) {
      nextQuestion();
    }
  }, [userSelectedAnswers]);

  useEffect(() => {
    startJob();
  }, []);

  //* Animacion final*//
  const finishedValue = useValue<number>(0);
  useEffect(() => {
    if (quizOver) {
      finishedValue.setValue(1);
    }
  }, [quizOver]);

  const finished = withSpringTransition(finishedValue, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Value(10),
  });

  return (
    <QuizContainer>
      <Box flex={1}>
        {qloading ? (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors["primary"],
            }}
          >
            <Text color="white" variant="body">
              cargando por favor espere...
            </Text>
          </View>
        ) : (
            <Box flex={1}>
              <Box justifyContent="flex-start" flex={1} flexDirection="column">
                <Box
                  height={verticalScale(height * 0.3)}
                  backgroundColor="primary"
                >
                  <ScrollView
                    ref={scroll}
                    horizontal
                    snapToInterval={width}
                    decelerationRate="fast"
                    bounces={false}
                    {...scrollHandler}
                  >
                    {allQuestions.map(({ question }, index) => (
                      <Fragment key={index}>
                        <QuestionSlide
                          {...{ question, index }}
                          questionNr={curNum + 1}
                        />
                      </Fragment>
                    ))}
                  </ScrollView>
                </Box>
                <Box
                  style={{ flex: 1 }}
                  backgroundColor="white"
                  height={0.4 * height}
                  paddingTop="m"
                >
                  <View
                    style={{
                      backgroundColor: theme.colors["white"],
                      width: width * allQuestions.length,
                      flexDirection: "row",
                      transform: [{ translateX: multiply(x, -1) }],
                    }}
                  >
                    {allQuestions.map(({ answers }, index) => (
                      <Fragment>
                        <Answers {...{ answers, answerSelected }} />
                      </Fragment>
                    ))}
                  </View>
                </Box>
                <View
                  style={{
                    width: width * allQuestions.length,
                    backgroundColor: "white",
                    flexDirection: "row",
                    transform: [{ translateX: multiply(x, -1) }],
                  }}
                >
                  {allQuestions.map(({ answers }, index) => {
                    const last = index === allQuestions.length - 1;
                    return (
                      <Fragment key={index}>
                        <View
                          style={{
                            flex: 1,
                            width,
                            justifyContent: "center",
                            padding: 20,
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="primary"
                            label={last ? "Submit" : "next"}
                            onPress={nextQuestion}
                          />
                        </View>
                      </Fragment>
                    );
                  })}
                </View>
              </Box>
            </Box>
          )}
      </Box>
      <Alert
        {...{ FinishedAlert }}
        onRestart={() => {
          finishedValue.setValue(0);
          startJob();
          navigation.navigate("Welcome");
        }}
        userAnswers={userSelectedAnswers}
      />
    </QuizContainer>
  );
};

export default Question;
