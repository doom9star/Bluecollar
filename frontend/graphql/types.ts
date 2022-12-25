export enum StatusType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum JobType {
  DRIVER = "DRIVER",
  MECHANIC = "MECHANIC",
  PLUMBER = "PLUMBER",
}

export enum ExperienceType {
  BELOW1 = "< 1",
  BETWEEN1TO2 = "1 - 2",
  BETWEEN2TO5 = "2 - 5",
  ABOVE5 = "> 5",
}

export const Leagues: { [k: string]: { required: number; color: string } } = {
  BRONZE: { required: 200, color: "brown" },
  SILVER: { required: 500, color: "gray" },
  GOLD: { required: 1000, color: "gold" },
  PLATINUM: { required: 2500, color: "purple" },
  DIAMOND: { required: 5000, color: "green" },
};
