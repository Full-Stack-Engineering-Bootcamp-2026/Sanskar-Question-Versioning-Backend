import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, } from "typeorm";
import { QuestionVersion } from "../../QuestionVersion/entities/question-version.entity";
@Entity("question_options")
export class QuestionOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated("uuid")
  publicId: string;

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