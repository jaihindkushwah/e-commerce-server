// src/users/dto/create-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from "class-validator";
// import { UserRole } from '../user-role.enum'; // Assuming you defined enum separately

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10,15}$/, {
    message: "Phone must be a valid number",
  })
  phone: string;

  @IsOptional()
  @IsString()
  salt: string;

  @IsOptional()
  @IsString()
  verify_token?: string;

  @IsOptional()
  is_verified?: boolean;

  @IsOptional()
  role?: string; // Can be 'user', 'admin', etc.
}
