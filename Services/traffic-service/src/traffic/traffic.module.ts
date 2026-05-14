import { Module } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { TrafficResolver } from './traffic.resolver';

@Module({
  providers: [TrafficResolver, TrafficService],
})
export class TrafficModule {}
