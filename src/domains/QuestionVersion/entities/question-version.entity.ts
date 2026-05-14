import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, } from "typeorm";
import { Question } from "../../Question/entities/question.entity";
import { QuestionOption } from "../../QuestionOption/entities/question-option.entity";
import { AttemptAnswer } from "../../AttemptAnswer/entities/attempt-answer.entity";
enum AnswerType {
  SINGLE_SELECT = "SINGLE_SELECT",
  MULTI_SELECT = "MULTI_SELECT",
  TEXT = "TEXT",
}

@Entity("question_versions")
export class QuestionVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.versions, {
    onDelete: "CASCADE",
  })
  question: Question;

  @Column()
  versionNumber: number;

  @Column("text")
  questionText: string;

  @Column({
    type: "enum",
    enum: AnswerType,
  })
  answerType: AnswerType;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => QuestionOption, (option) => option.questionVersion, {
    cascade: true,
  })
  options: QuestionOption[];

  @OneToMany(() => AttemptAnswer, (answer) => answer.questionVersion)
  attemptAnswers: AttemptAnswer[];

  @CreateDateColumn()
  createdAt: Date;
}