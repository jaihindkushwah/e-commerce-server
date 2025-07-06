// src/orders/models/order.model.ts

import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderStatus } from "src/common/constants/enum";
import { UserAddress } from "src/users/models/user.address.model";
import { User } from "src/users/models/user.model";

@Table({
  tableName: "order",
  timestamps: true,
})
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => UserAddress)
  @Column({ type: DataType.BIGINT, allowNull: true })
  shipping_address_id: number;

  @BelongsTo(() => UserAddress, "shipping_address_id")
  shippingAddress: UserAddress;

  @ForeignKey(() => UserAddress)
  @Column({ type: DataType.BIGINT, allowNull: true })
  billing_address_id: number;

  @BelongsTo(() => UserAddress, "billing_address_id")
  billingAddress: UserAddress;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    allowNull: false,
    defaultValue: OrderStatus.Pending,
  })
  status: OrderStatus;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  payment_method: string;
}
