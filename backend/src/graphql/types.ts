import { Request, Response } from "express";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Error {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class GlobalResponse {
  @Field(() => String)
  status: "SUCCESS" | "ERROR";

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}

export type AuthPayload = {
  uid?: string;
};

export type TCtx = {
  req: Request & AuthPayload;
  res: Response;
};

export type TSampleCharge = {
  sample: string;
  charge: number;
};
