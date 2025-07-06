import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  constructor() {}
  async sendVerificationEmail(email: string, token: string) {}
  async sendEmail() {}
  async sendSms() {}
  async sendPushNotification() {}
  async sendWhatsAppMessage() {}
}
