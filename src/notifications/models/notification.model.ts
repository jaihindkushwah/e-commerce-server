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
import { NotificationType } from "src/common/constants/enum";
import { User } from "src/users/models/user.model";

@Table({
  tableName: "notification",
  timestamps: true,
})
export class Notification extends Model<Notification> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.STRING(120))
  title: string;

  @Column(DataType.TEXT)
  message: string;

  @Column(DataType.ENUM(...Object.values(NotificationType)))
  type: string;

  @Column(DataType.BIGINT)
  reference_id: string; // this one is also know as order id or kind of id

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_read: boolean;
}
