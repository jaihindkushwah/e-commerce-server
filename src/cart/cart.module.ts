import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { CartGateway } from "./cart.gateway";

@Module({
  providers: [CartService, CartGateway],
  controllers: [CartController],
})
export class CartModule {
  constructor() {}
}
