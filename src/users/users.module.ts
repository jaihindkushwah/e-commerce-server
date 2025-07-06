import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./service/users.service";
import { UsersController } from "./controllers/users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UserAddress } from "./models/user.address.model";
import { AuthModule } from "./auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserAddress]),
    forwardRef(() => AuthModule), // 👈 use forwardRef if circular dependency exists
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // 👈 Needed by AuthModule
})
export class UsersModule {}
