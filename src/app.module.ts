import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersModule } from "./users/users.module";
import { CartModule } from "./cart/cart.module";
import { ProductsModule } from "./products/products.module";
import { NotificationsModule } from "./notifications/notifications.module"; // (MongoDB based)
import { OrdersModule } from "./orders/orders.module";
import { ReviewsModule } from "./reviews/reviews.module";

@Module({
  imports: [
    // Load env variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // MySQL (Relational)
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        dialect: "mysql",
        host: config.get<string>("DB_HOST")!,
        port: parseInt(config.get<string>("DB_PORT")!, 10),
        username: config.get<string>("DB_USERNAME")!,
        password: config.get<string>("DB_PASSWORD")!,
        database: config.get<string>("DB_NAME")!,
        autoLoadModels: true,
        synchronize: true, // Disable in prod
        logging: false,
      }),
      inject: [ConfigService],
    }),

    // MongoDB (Document)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("MONGO_URI"),
      }),
      inject: [ConfigService],
    }),

    // Modules
    UsersModule,
    CartModule,
    ProductsModule,
    NotificationsModule, // ← you can design this with Mongoose
    OrdersModule,
    ReviewsModule,
  ],
})
export class AppModule {}
