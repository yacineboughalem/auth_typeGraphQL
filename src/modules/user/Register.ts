import { Resolver, Query, Mutation, Arg } from "type-graphql";

import bcrypt from "bcryptjs";
import { User } from "../../entities/User";
import { RegisterInput } from "./register/RegisterInput";
import { validate } from "class-validator";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello frontYnova!";
  }

  // @FieldResolver()
  // async name(@Root() parent: User) {
  //   return `${parent.firstName} ${parent.lastName}`
  // }



  // @Mutation(() => User)
  // async register(@Arg("data")
  // {
  //   email,
  //   firstName,
  //   lastName,
  //   password,
  //   isActive
  // }: RegisterInput): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(password, 12);

  //   const user = await User.create({
  //     firstName,
  //     lastName,
  //     email,
  //     password: hashedPassword,
  //     isActive
  //   }).save();

  //   return user;
  // }

  @Mutation(() => User)
  async register(
    @Arg("data") data: RegisterInput
  ): Promise<User> {
    // try {
    // Validate input data using class-validator
    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    // Check if user with provided email already exists
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("Email address already in use.");
    }

    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create new user instance
    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      isActive: data.isActive,
    }).save();

    return user;
    // } catch (error) {
    //   console.error("Registration error:", error);
    //   throw new Error("Failed to register user. Please check your input.");
    // }
  }

}