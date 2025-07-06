import { Module } from "@nestjs/common";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Notification } from "./models/notification.model";
import { NotificationChannelLog } from "./models/notification.channel.log.model";

@Module({
  imports: [SequelizeModule.forFeature([Notification, NotificationChannelLog])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
