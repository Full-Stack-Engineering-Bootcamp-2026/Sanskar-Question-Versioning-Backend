import { Entity, PrimaryGeneratedColumn, ManyToOne, } from "typeorm";
import { Quiz } from "../../Quiz/entities/quiz.entity";
import { Question } from "../../Question/entities/question.entity";

@Entity("quiz_questions")
export class QuizQuestion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizQuestions, {
    onDelete: "CASCADE",
  })
  quiz: Quiz;

  @ManyToOne(() => Question, (question) => question.quizQuestions, {
    onDelete: "CASCADE",
  })
  question: Question;
}