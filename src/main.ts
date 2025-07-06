import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix("api/v1");
  const config = app.get(ConfigService);
  const port = config.get<number>("PORT") || 3000;

  await app.listen(port);
}
bootstrap();
