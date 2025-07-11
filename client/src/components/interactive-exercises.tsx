import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { quizQuestions } from "@/data/sound-examples";
import { CheckCircle, XCircle, BarChart3, Clock, Target } from "lucide-react";

export function InteractiveExercises() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isAnswered = answeredQuestions.includes(currentQuestion);
  const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correct;

  const handleAnswerSelect = (value: string) => {
    if (isAnswered) return;
    setSelectedAnswer(value);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswered) return;
    
    const timeSpent = Date.now() - startTime;
    setQuestionTimes([...questionTimes, timeSpent]);
    
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowResult(false);
      setStartTime(Date.now());
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer("");
      setShowResult(false);
      setStartTime(Date.now());
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuestionTimes([]);
    setStartTime(Date.now());
  };

  const averageTime = questionTimes.length > 0 
    ? Math.round(questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length / 1000)
    : 0;

  const masteryLevel = Math.round((score / quizQuestions.length) * 100);

  const isQuizComplete = answeredQuestions.length === quizQuestions.length;

  return (
    <section id="exercises" className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral">
          Interactive Exercises
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Logarithmic Scale Quiz</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Progress:</span>
                  <Progress value={progress} className="w-32" />
                  <span className="text-sm text-muted-foreground">
                    {currentQuestion + 1}/{quizQuestions.length}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {!isQuizComplete ? (
                <div className="space-y-6">
                  <Card className="bg-blue-50">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-primary mb-4">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </h4>
                      <p className="text-gray-700 mb-6">
                        {quizQuestions[currentQuestion].question}
                      </p>
                      
                      <RadioGroup 
                        value={selectedAnswer} 
                        onValueChange={handleAnswerSelect}
                        disabled={isAnswered}
                        className="space-y-3"
                      >
                        {quizQuestions[currentQuestion].options.map((option) => (
                          <div 
                            key={option.value}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              isAnswered
                                ? option.value === quizQuestions[currentQuestion].correct
                                  ? 'bg-green-100 border border-green-300'
                                  : option.value === selectedAnswer
                                  ? 'bg-red-100 border border-red-300'
                                  : 'bg-white'
                                : 'hover:bg-white cursor-pointer'
                            }`}
                          >
                            <RadioGroupItem 
                              value={option.value} 
                              id={option.value}
                              disabled={isAnswered}
                            />
                            <Label 
                              htmlFor={option.value}
                              className={`flex-1 cursor-pointer ${isAnswered ? 'cursor-default' : ''}`}
                            >
                              {option.text}
                            </Label>
                            {isAnswered && option.value === quizQuestions[currentQuestion].correct && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                            {isAnswered && option.value === selectedAnswer && option.value !== quizQuestions[currentQuestion].correct && (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {showResult && (
                    <Card className={`${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {isCorrect ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {quizQuestions[currentQuestion].explanation}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-between">
                    <Button 
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    <div className="flex gap-2">
                      {!isAnswered && (
                        <Button 
                          onClick={handleSubmitAnswer}
                          disabled={!selectedAnswer}
                        >
                          Submit Answer
                        </Button>
                      )}
                      {isAnswered && currentQuestion < quizQuestions.length - 1 && (
                        <Button onClick={handleNextQuestion}>
                          Next Question
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Quiz Complete!</h3>
                  <p className="text-gray-600">
                    Great job! You've completed all the questions.
                  </p>
                  <Button onClick={resetQuiz} className="mx-auto">
                    Take Quiz Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Statistics */}
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-secondary" />
                Your Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-green-600" />
                        <span className="text-2xl font-bold text-green-800">
                          {score}/{quizQuestions.length}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">Correct Answers</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-800">
                          {averageTime}s
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">Average Time</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center">
                  <Card className="bg-purple-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                        <span className="text-2xl font-bold text-purple-800">
                          {masteryLevel}%
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">Mastery Level</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {masteryLevel >= 80 && (
                <div className="mt-6 text-center">
                  <Badge className="bg-green-100 text-green-800 px-4 py-2">
                    🎉 Excellent Understanding!
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
