import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Generated, } from "typeorm";
import { QuizAttempt } from "../../QuizAttempt/entities/quiz-attempt.entity";
import { Question } from "../../Question/entities/question.entity";
import { QuestionVersion } from "../../QuestionVersion/entities/question-version.entity";

@Entity("attempt_answers")
export class AttemptAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated("uuid")
  publicId: string;

  @ManyToOne(() => QuizAttempt, (attempt) => attempt.answers, {
    onDelete: "CASCADE",
  })
  attempt: QuizAttempt;

  @ManyToOne(() => Question)
  question: Question;

  @ManyToOne(() => QuestionVersion)
  questionVersion: QuestionVersion;

  @Column({ type: "json" })
  questionSnapshot: {
    questionText: string;
    answerType: string;
    options?: string[];
  };

  @Column({ type: "json" })
  userAnswer: string | string[];
}