import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  BelongsTo,
} from "sequelize-typescript";
import { Product } from "./product.model"; // adjust the path as needed

@Table({
  tableName: "product_image",
  timestamps: true,
})
export class ProductImage extends Model<ProductImage> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT })
  declare id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  alt_text: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_primary: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  sort_order: number;
}
