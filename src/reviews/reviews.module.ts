import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductReview } from "./models/reviews.model";

@Module({
  imports: [SequelizeModule.forFeature([ProductReview])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
