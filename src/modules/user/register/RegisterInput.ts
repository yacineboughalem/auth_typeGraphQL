import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(3, 255, { message: "Lenght first name" })
  firstName: string;

  @Field()
  @Length(3, 255, { message: "Lenght last name" })
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email: string;

  @Field()
  password: string;

  @Field()
  isActive: boolean;
}