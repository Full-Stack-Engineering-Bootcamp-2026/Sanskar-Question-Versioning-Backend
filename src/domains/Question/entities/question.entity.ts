import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Column, Generated } from "typeorm";
import { User } from "../../User/entities/user.entity";
import { QuestionVersion } from "../../QuestionVersion/entities/question-version.entity";
import { QuizQuestion } from "../../QuizQuestion/entities/quiz-question.entity";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated("uuid")
  publicId: string;

  @ManyToOne(() => User, (user) => user.questions)
  createdBy: User;

  @OneToMany(() => QuestionVersion, (version) => version.question)
  versions: QuestionVersion[];

  @OneToMany(() => QuizQuestion, (qq) => qq.question)
  quizQuestions: QuizQuestion[];

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}