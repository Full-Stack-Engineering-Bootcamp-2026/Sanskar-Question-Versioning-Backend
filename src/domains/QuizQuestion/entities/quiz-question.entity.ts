import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Generated, } from "typeorm";
import { Quiz } from "../../Quiz/entities/quiz.entity";
import { Question } from "../../Question/entities/question.entity";

@Entity("quiz_questions")
export class QuizQuestion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  @Generated("uuid")
  publicId: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizQuestions, {
    onDelete: "CASCADE",
  })
  quiz: Quiz;

  @ManyToOne(() => Question, (question) => question.quizQuestions, {
    onDelete: "CASCADE",
  })
  question: Question;
}