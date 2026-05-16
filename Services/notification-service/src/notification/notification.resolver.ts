import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { SendNotificationInput } from './dto/send-notification.input';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => Notification, {
    description: 'Envoyer une nouvelle notification',
  })
  sendNotification(
    @Args('input') input: SendNotificationInput,
  ): Notification {
    return this.notificationService.send(input);
  }

  @Query(() => [Notification], {
    name: 'notifications',
    description: 'Consulter toutes les notifications',
  })
  findAll(): Notification[] {
    return this.notificationService.findAll();
  }

  @Mutation(() => Notification, {
    description: 'Marquer une notification comme lue',
  })
  markAsRead(
    @Args('id', { type: () => Int }) id: number,
  ): Notification {
    return this.notificationService.markAsRead(id);
  }

  @Mutation(() => Boolean, {
    description: 'Supprimer une notification',
  })
  removeNotification(
    @Args('id', { type: () => Int }) id: number,
  ): boolean {
    return this.notificationService.remove(id);
  }
}
