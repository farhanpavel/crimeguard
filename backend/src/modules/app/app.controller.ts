import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { SocketGateway } from "../socket/socket.gateway";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly socketGateway: SocketGateway
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("send-message")
  sendMessage() {
    const topic = "news";
    const message = {
      title: "New Update",
      content: "NestJS WebSockets are awesome!",
      date: new Date().toISOString()
    };

    this.socketGateway.sendMessage(topic, message);
    return { success: true, message: "Message sent to topic: " + topic };
  }
}
