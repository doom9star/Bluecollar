import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";
import { AuthPayload, GlobalResponse, TCtx } from "./types";

export const isAuth: MiddlewareFn<TCtx> = ({ context }, next) => {
  const token = context.req.cookies.token;
  if (!token)
    return new Promise<GlobalResponse>((res) =>
      res({
        status: "ERROR",
        errors: [
          {
            field: "token",
            message: "Token is missing!",
          },
        ],
      })
    );
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload;
    context.req.uid = payload.uid;
    return next();
  } catch {
    return new Promise<GlobalResponse>((res) =>
      res({
        status: "ERROR",
        errors: [
          {
            field: "token",
            message: "Token is corrupted or expired!",
          },
        ],
      })
    );
  }
};

export const isNotAuth: MiddlewareFn<TCtx> = ({ context }, next) => {
  const token = context.req.cookies.token;
  if (token)
    return new Promise<GlobalResponse>((res) =>
      res({
        status: "ERROR",
        errors: [
          {
            field: "token",
            message: "Token is present!",
          },
        ],
      })
    );
  return next();
};
