// src/customer-address/dto/update-customer-address.dto.ts
import { PartialType } from "@nestjs/mapped-types";
import { CreateCustomerAddressDto } from "./create-user-address.dto";

export class UpdateCustomerAddressDto extends PartialType(
  CreateCustomerAddressDto,
) {}
