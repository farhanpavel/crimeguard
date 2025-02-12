import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { MediaModule } from "../media/media.module";
import { CommentModule } from "../comment/comment.module";
import { AdminModule } from "../admin/admin.module";
import { ReportModule } from "../report/report.module";
import { IntelligenceModule } from "../intelligence/intelligence.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    AuthModule,
    AdminModule,
    MediaModule,
    CommentModule,
    ReportModule,
    IntelligenceModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
