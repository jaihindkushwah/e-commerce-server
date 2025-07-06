import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
  Default,
} from "sequelize-typescript";

// Good ✅: declare tells TypeScript “this exists, Sequelize will define it”

@Table({
  tableName: "users",
  timestamps: true,
  indexes: [
    { name: "user_phone_index", fields: ["phone"] },
    { name: "user_verify_token_index", fields: ["verify_token"] },
  ],
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare phone: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare salt: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare is_verified: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  declare verify_token: string;

  @Default("user")
  @Column({ type: DataType.STRING })
  declare role: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare updated_at: Date;
}
