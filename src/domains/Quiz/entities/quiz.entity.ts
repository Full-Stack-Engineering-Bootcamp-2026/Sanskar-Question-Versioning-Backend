import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, } from "typeorm";
import { User } from "../../User/entities/user.entity";
import { QuizQuestion } from "../../QuizQuestion/entities/quiz-question.entity";
import { QuizAttempt } from "../../QuizAttempt/entities/quiz-attempt.entity";

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.quizzes)
  createdBy: User;

  @OneToMany(() => QuizQuestion, (qq) => qq.quiz, {
    cascade: true,
  })
  quizQuestions: QuizQuestion[];

  @OneToMany(() => QuizAttempt, (attempt) => attempt.quiz)
  attempts: QuizAttempt[];

  @CreateDateColumn()
  createdAt: Date;
}