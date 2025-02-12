import { Module } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ReportController } from "./report.controller";
import { SocketGateway } from "../socket/socket.gateway";

@Module({
  controllers: [ReportController],
  providers: [ReportService, SocketGateway]
})
export class ReportModule {}
