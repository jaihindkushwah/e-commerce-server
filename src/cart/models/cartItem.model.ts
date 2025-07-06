import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Cart } from "./cart.model";
import { Product } from "src/products/model/product.model";

@Table({
  tableName: "cart_item",
  timestamps: true,
})
export class CartItem extends Model<CartItem> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @ForeignKey(() => Cart)
  @Column({ type: DataType.BIGINT, allowNull: false })
  cart_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.BIGINT, allowNull: false })
  product_id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  quantity: number;
}
