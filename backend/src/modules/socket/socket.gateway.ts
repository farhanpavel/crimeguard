import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*" // Adjust this for security in production
  }
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("subscribeTopic")
  handleSubscription(@MessageBody() topic: string) {
    console.log(`Client subscribed to topic: ${topic}`);
  }

  sendMessage(topic: string, data: any) {
    this.server.emit(topic, data);
  }
}
