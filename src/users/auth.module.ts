import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { NotificationsModule } from "src/notifications/notifications.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    NotificationsModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || "default_jwt_secret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
