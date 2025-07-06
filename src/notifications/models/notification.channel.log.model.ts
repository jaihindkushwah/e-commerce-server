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
import { Notification } from "./notification.model";
import { NotificationChannelType } from "src/common/constants/enum";

@Table({
  tableName: "notification_channel_log",
  timestamps: true,
})
export class NotificationChannelLog extends Model<NotificationChannelLog> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT })
  declare id: number;

  @ForeignKey(() => Notification)
  @Column({ type: DataType.BIGINT })
  notification_id: number;

  @BelongsTo(() => Notification)
  notification: Notification;

  @Column({
    type: DataType.ENUM(...Object.values(NotificationChannelType)),
    allowNull: false,
  })
  channel: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  sent_at: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  error_msg: string;
}
