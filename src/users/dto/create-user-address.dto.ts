// src/customer-address/dto/create-customer-address.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsPhoneNumber,
} from "class-validator";

export class CreateCustomerAddressDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  full_name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address_line1: string;

  @IsOptional()
  @IsString()
  address_line2?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
}
