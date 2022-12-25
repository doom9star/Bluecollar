import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { TSampleCharge } from "../graphql/types";
import Base from "./Base";
import User from "./User";

@ObjectType()
@Entity("job")
export default class Job extends Base {
  @Field()
  @Column()
  type: string;

  @Field()
  @Column({ type: "text" })
  address: string;

  @Field()
  @Column({ type: "double" })
  contact: number;

  @Field()
  @Column()
  experience: string;

  @Field()
  @Column({ default: true })
  available: boolean;

  @Field()
  @Column({ default: 0 })
  points: number;

  @Field()
  @Column({ default: "BRONZE" })
  league: string;

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  start: Date;

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  end: Date;

  @Field()
  @Column({ type: "text" })
  sampleCharges: string;

  @Field()
  @Column({ type: "text" })
  extraInfo: string;

  @Field(() => User)
  @ManyToOne(() => User, (u) => u.jobs, { onDelete: "CASCADE" })
  user: User;
}
