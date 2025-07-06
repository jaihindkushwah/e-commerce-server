// if you have sql databases then you can use entity. this one more close to meaningful for it.

import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Column,
  ForeignKey,
  Default,
  CreatedAt,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: "user_address",
  timestamps: false,
})
export class UserAddress extends Model<UserAddress> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  user_id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  full_name: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  phone: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  address_line1: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  address_line2?: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  city: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  state: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  postal_code: string;

  @Default("India")
  @Column({ type: DataType.STRING(255), allowNull: false })
  country: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_default: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE })
  created_at: Date;
}
