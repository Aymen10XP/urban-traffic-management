import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { IncidentResolver } from './incident.resolver';
import { IncidentService } from './incident.service';
import { Incident } from './entities/incident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
  providers: [IncidentResolver, IncidentService, JwtAuthGuard],
})
export class IncidentModule {}
