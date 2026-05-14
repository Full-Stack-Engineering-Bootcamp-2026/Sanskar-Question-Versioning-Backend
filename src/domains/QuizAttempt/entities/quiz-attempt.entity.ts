import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn, Generated, } from "typeorm";
import { Quiz } from "../../Quiz/entities/quiz.entity";
import { User } from "../../User/entities/user.entity";
import { AttemptAnswer } from "../../AttemptAnswer/entities/attempt-answer.entity";
enum AttemptStatus {
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
}

@Entity("quiz_attempts")
export class QuizAttempt {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  @Generated("uuid")
  publicId: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.attempts)
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.attempts)
  user: User;

  @Column()
  attemptNumber: number;

  @Column({
    type: "enum",
    enum: AttemptStatus,
    default: AttemptStatus.IN_PROGRESS,
  })
  status: AttemptStatus;

  @Column({ type: "json" })
  questionVersionMap: {
    questionId: string;
    versionId: string;
  }[];

  @OneToMany(() => AttemptAnswer, (answer) => answer.attempt, {
    cascade: true,
  })
  answers: AttemptAnswer[];

  @CreateDateColumn()
  startedAt: Date;

  @Column({ nullable: true })
  submittedAt: Date;
}