import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { TrafficResolver } from './traffic.resolver';
import { TrafficService } from './traffic.service';
import { TrafficZone } from './entities/traffic-zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficZone])],
  providers: [TrafficResolver, TrafficService, JwtAuthGuard],
})
export class TrafficModule {}
