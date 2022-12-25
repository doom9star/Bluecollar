import { Field, ObjectType } from "type-graphql";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import bcrypt from "bcryptjs";
import Base from "./Base";
import Job from "./Job";

@ObjectType()
@Entity("user")
export default class User extends Base {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  gender: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  description?: string;

  @Field(() => [Job])
  @OneToMany(() => Job, (w) => w.user)
  jobs: Job[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
