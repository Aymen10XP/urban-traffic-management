import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationResolver, NotificationService, JwtAuthGuard],
})
export class NotificationModule {}
