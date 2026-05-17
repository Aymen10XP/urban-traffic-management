import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendNotificationInput } from './dto/send-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
  ) {}

  async send(input: SendNotificationInput): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      ...input,
      isRead: false,
    });

    return this.notificationsRepository.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationsRepository.find({
      order: { createdAt: 'DESC', id: 'DESC' },
    });
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.findById(id);
    notification.isRead = true;
    return this.notificationsRepository.save(notification);
  }

  async update(id: number, input: UpdateNotificationInput): Promise<Notification> {
    const notification = await this.findById(id);

    if (input.message !== undefined) {
      notification.message = input.message;
    }

    if (input.type !== undefined) {
      notification.type = input.type;
    }

    if (input.isRead !== undefined) {
      notification.isRead = input.isRead;
    }

    return this.notificationsRepository.save(notification);
  }

  async remove(id: number): Promise<boolean> {
    await this.findById(id);
    await this.notificationsRepository.delete(id);
    return true;
  }

  private async findById(id: number): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }
}
