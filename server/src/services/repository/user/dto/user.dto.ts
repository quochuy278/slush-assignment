import { IsEmail, IsNotEmpty, IsString, isEmail } from "class-validator";

export type UserDto = {
  id: number;
  public_id: string;
  name: string;
  email: string;
  hash: string;
};

export class ValidatedUser {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class ValidateSignUpUser extends ValidatedUser {
  @IsString()
  @IsNotEmpty() // Optional if you want to enforce a non-empty email
  name!: string;
}
