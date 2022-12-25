import jwt from "jsonwebtoken";
import {
  Args,
  ArgsType,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { _24HRS_ } from "../../constants";
import User from "../../entity/User";
import { isAuth, isNotAuth } from "../middleware";
import { GlobalResponse, TCtx } from "../types";

@ArgsType()
class RegisterArgs {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  gender: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  description?: string;
}

@ArgsType()
class LoginArgs {
  @Field()
  nameOrEmail: string;

  @Field()
  password: string;
}

@ObjectType()
class UserResponse extends GlobalResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => UserResponse)
  @UseMiddleware(isAuth)
  async me(@Ctx() { req }: TCtx): Promise<UserResponse> {
    const user = await User.createQueryBuilder("u")
      .leftJoinAndSelect("u.jobs", "uj")
      .where("u.id = :id", { id: req.uid })
      .orderBy("uj.createdAt", "DESC")
      .getOne();
    return { status: "SUCCESS", user };
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isNotAuth)
  async register(
    @Args() args: RegisterArgs,
    @Ctx() { res }: TCtx
  ): Promise<UserResponse> {
    try {
      const user = await User.create(args).save();
      user.jobs = [];
      const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        maxAge: _24HRS_ * 7,
        secure: true,
        sameSite: "none",
        httpOnly: true,
      });
      return { status: "SUCCESS", user };
    } catch (err) {
      const isDuplicate = err.code === "ER_DUP_ENTRY";
      return {
        status: "ERROR",
        errors: [
          {
            field: isDuplicate ? "email" : "general",
            message: isDuplicate
              ? "Already exists!"
              : "Something went wrong, try again later!",
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isNotAuth)
  async login(
    @Args() { nameOrEmail, password }: LoginArgs,
    @Ctx() { res }: TCtx
  ) {
    const isEmail = nameOrEmail.includes("@");
    const user = await User.createQueryBuilder("u")
      .leftJoinAndSelect("u.jobs", "uj")
      .where(`u.${isEmail ? "email" : "name"} = :nameOrEmail`, { nameOrEmail })
      .orderBy("uj.createdAt", "DESC")
      .getOne();
    if (!user)
      return {
        status: "ERROR",
        errors: [
          {
            field: "general",
            message: "Wrong credentials!",
          },
        ],
      };
    if (!(await user.comparePassword(password)))
      return {
        status: "ERROR",
        errors: [
          {
            field: "password",
            message: "Wrong Password!",
          },
        ],
      };
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      maxAge: _24HRS_ * 7,
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });
    return { status: "SUCCESS", user };
  }

  @Mutation(() => GlobalResponse)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { res }: TCtx): Promise<GlobalResponse> {
    res.clearCookie("token", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    return { status: "SUCCESS" };
  }
}
