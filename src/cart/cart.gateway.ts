import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CartService } from "./cart.service";
import { Logger } from "@nestjs/common";

@WebSocketGateway({ namespace: "ws/api/v1/cart", cors: true })
export class CartGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly cartService: CartService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const token = client.handshake.auth.token;
    console.log("Bearer Token:", token);
  }

  handleDisconnect(client: Socket) {
    console.log(client.handshake.auth.token);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("addToCart")
  handleAddToCart(
    @ConnectedSocket() _client: Socket,
    @MessageBody() payload: { userId: string; item: any },
  ) {
    Logger.log(payload);
    const updatedCart = []; //this.cartService.addItem(payload.userId, payload.item);
    this.server.emit("cartUpdated", {
      userId: payload.userId,
      cart: updatedCart,
    });
  }
}
