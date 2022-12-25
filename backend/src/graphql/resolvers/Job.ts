import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import Job from "../../entity/Job";
import { isAuth } from "../middleware";
import { GlobalResponse, TCtx } from "../types";

@ObjectType()
class JobResponse extends GlobalResponse {
  @Field(() => Job, { nullable: true })
  job?: Job;
}

@ObjectType()
class JobsResponse extends GlobalResponse {
  @Field(() => [Job], { nullable: true })
  jobs?: Job[];
}

@InputType()
class CreateJobInput {
  @Field()
  type: string;

  @Field()
  address: string;

  @Field()
  contact: number;

  @Field()
  experience: string;

  @Field()
  start: string;

  @Field()
  end: string;

  @Field()
  available: boolean;

  @Field()
  sampleCharges: string;

  @Field()
  extraInfo: string;
}

@Resolver(Job)
export default class JobResolver {
  @Mutation(() => JobResponse)
  @UseMiddleware(isAuth)
  async createJob(
    @Arg("input") input: CreateJobInput,
    @Ctx() { req }: TCtx
  ): Promise<JobResponse> {
    const job = await Job.create({ ...input, user: { id: req.uid } }).save();
    return { status: "SUCCESS", job };
  }

  @Query(() => JobsResponse)
  @UseMiddleware(isAuth)
  async getJobByType(
    @Arg("type") type: string,
    @Ctx() { req }: TCtx
  ): Promise<JobsResponse> {
    const query = Job.createQueryBuilder("j")
      .leftJoinAndSelect("j.user", "ju")
      .where("ju.id <> :uid AND j.available = 1", {
        uid: req.uid,
        timestamp: new Date(),
      });
    if (type !== "All") query.andWhere("j.type = :type", { type: type });
    const jobs = await query.orderBy("j.points", "DESC").getMany();
    return { status: "SUCCESS", jobs };
  }

  @Query(() => JobResponse)
  @UseMiddleware(isAuth)
  async getJob(
    @Arg("id") id: string,
    @Ctx() { req }: TCtx
  ): Promise<JobResponse> {
    let job = await Job.findOne(id, { relations: ["user"] });
    if (req.uid !== job.user.id && !job.available) job = null;
    return { status: "SUCCESS", job };
  }
}
