import { Body, Controller, Get, Post } from "@nestjs/common";
import { FirebaseService } from "./firebase.service";

@Controller("firebase")
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get()
  async sayMyName() {
    return await this.firebaseService.sayMyName();
  }
  @Get("test-notification")
  async sendTestNotification() {
    return await this.firebaseService.sendTestNotification();
  }
  @Post("to-token")
  async sendNotificationToToken(
    @Body() body: { token: string; data: any; notification?: any }
  ) {
    return await this.firebaseService.sendNotificationToToken(
      body.token,
      body.data,
      body.notification
    );
  }

  @Post('to-topic')
  async sendNotificationToTopic(
    @Body() body: { topic: string; data: any; notification?: any }
  ) {
    return await this.firebaseService.sendNotificationToTopic(
      body.topic,
      body.data,
      body.notification
    );
  }
}
