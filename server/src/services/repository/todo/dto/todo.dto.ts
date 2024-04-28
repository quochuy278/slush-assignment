import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export type TodoDto = {
  id: number;
  public_id: string;
  name: string;
  description: string;
  created_at: string;
  ready: boolean;
  user_id: number;
};

export class ValidatedTodo {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsBoolean()
  @IsNotEmpty()
  ready!: boolean;
}
