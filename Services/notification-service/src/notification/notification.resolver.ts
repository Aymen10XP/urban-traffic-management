import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { SendNotificationInput } from './dto/send-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';

@Resolver(() => Notification)
@UseGuards(JwtAuthGuard)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => Notification, {
    description: 'Send a new notification',
  })
  sendNotification(@Args('input') input: SendNotificationInput) {
    return this.notificationService.send(input);
  }

  @Query(() => [Notification], {
    name: 'notifications',
    description: 'List all notifications',
  })
  findAll() {
    return this.notificationService.findAll();
  }

  @Mutation(() => Notification, {
    description: 'Mark a notification as read',
  })
  markAsRead(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.markAsRead(id);
  }

  @Mutation(() => Notification, {
    description: 'Update a notification',
  })
  updateNotification(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateNotificationInput,
  ) {
    return this.notificationService.update(id, input);
  }

  @Mutation(() => Boolean, {
    description: 'Delete a notification',
  })
  removeNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.remove(id);
  }
}
