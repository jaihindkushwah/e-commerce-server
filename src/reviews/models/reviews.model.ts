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
import { Product } from "src/products/model/product.model";
import { User } from "src/users/models/user.model";

@Table({
  tableName: "product_review",
  timestamps: true,
})
export class ProductReview extends Model<ProductReview> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Product)
  @Column({ type: DataType.BIGINT, allowNull: false })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  review: string;
}
