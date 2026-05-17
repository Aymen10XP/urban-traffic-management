import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclePosition } from './entities/vehicle-position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, VehiclePosition])],
  providers: [VehiclesResolver, VehiclesService, JwtAuthGuard],
})
export class VehiclesModule {}
