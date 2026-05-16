import { Injectable, NotFoundException } from '@nestjs/common';
import { Notification, NotificationType } from './entities/notification.entity';
import { SendNotificationInput } from './dto/send-notification.input';

@Injectable()
export class NotificationService {
  private notifications: Notification[] = [];
  private idCounter = 1;

  send(input: SendNotificationInput): Notification {
    const notification: Notification = {
      id: this.idCounter++,
      ...input,
      isRead: false,
      createdAt: new Date(),
    };
    this.notifications.push(notification);
    return notification;
  }

  findAll(): Notification[] {
    return this.notifications;
  }

  markAsRead(id: number): Notification {
    const notification = this.notifications.find((n) => n.id === id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    notification.isRead = true;
    return notification;
  }

  remove(id: number): boolean {
    const initialLength = this.notifications.length;
    this.notifications = this.notifications.filter((n) => n.id !== id);
    return this.notifications.length < initialLength;
  }
}
