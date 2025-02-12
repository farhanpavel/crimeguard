import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { MediaModule } from "../media/media/media.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    AuthModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
