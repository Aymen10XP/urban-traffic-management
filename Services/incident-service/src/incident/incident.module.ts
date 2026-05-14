import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentResolver } from './incident.resolver';

@Module({
  providers: [IncidentResolver, IncidentService],
})
export class IncidentModule {}
