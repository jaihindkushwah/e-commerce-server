export enum Role {
  User = "user",
  Admin = "admin",
  SuperAdmin = "superadmin",
}

export enum NotificationChannelType {
  SMS = "sms",
  WhatsApp = "whatsapp",
  Email = "email",
}

export enum NotificationType {
  ORDER_PLACED = "order_placed",
  ORDER_SHIPPED = "order_shipped",
  ORDER_DELIVERED = "order_delivered",
  ORDER_CANCELLED = "order_cancelled",
  PAYMENT_SUCCESS = "payment_success",
  PAYMENT_FAILED = "payment_failed",
  REFUND_INITIATED = "refund_initiated",
  PROMOTION = "promotion",
  ACCOUNT_UPDATE = "account_update",
  CART_REMINDER = "cart_reminder",
  REVIEW_REQUEST = "review_request",
  SUPPORT_RESPONSE = "support_response",
}

export enum OrderStatus {
  Pending = "Pending",
  Failed = "Failed",
  Completed = "Completed",
}
