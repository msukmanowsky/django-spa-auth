import * as yup from "yup";

export const userSchema = yup
  .object({
    id: yup.number().positive().defined(),
    username: yup.string().defined(),
    email: yup.string().email().defined(),
    first_name: yup.string().defined(),
    last_name: yup.string().defined(),
    date_joined: yup.date().defined(),
  })
  .defined();
export type User = yup.InferType<typeof userSchema>;
