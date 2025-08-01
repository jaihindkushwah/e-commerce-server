import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop()
  name: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
