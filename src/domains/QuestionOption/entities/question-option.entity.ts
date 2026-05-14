import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm";
import { QuestionVersion } from "../../QuestionVersion/entities/question-version.entity";
@Entity("question_options")
export class QuestionOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => QuestionVersion,
    (questionVersion) => questionVersion.options,
    {
      onDelete: "CASCADE",
    }
  )
  questionVersion: QuestionVersion;

  @Column()
  optionText: string;
}