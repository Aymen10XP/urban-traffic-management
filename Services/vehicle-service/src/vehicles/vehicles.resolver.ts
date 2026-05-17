import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { RecordVehiclePositionInput } from './dto/record-vehicle-position.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclePosition } from './entities/vehicle-position.entity';
import { VehiclesService } from './vehicles.service';

@Resolver(() => Vehicle)
@UseGuards(JwtAuthGuard)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Mutation(() => Vehicle, { description: 'Add a new vehicle' })
  createVehicle(@Args('input') input: CreateVehicleInput) {
    return this.vehiclesService.create(input);
  }

  @Query(() => [Vehicle], { name: 'vehicles', description: 'List all vehicles' })
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Query(() => Vehicle, { name: 'vehicle', description: 'Get a vehicle by ID' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.findOne(id);
  }

  @Query(() => [VehiclePosition], {
    name: 'vehicleMovementHistory',
    description: 'Get the recorded movement history for a vehicle',
  })
  vehicleMovementHistory(@Args('vehicleId', { type: () => Int }) vehicleId: number) {
    return this.vehiclesService.getMovementHistory(vehicleId);
  }

  @Mutation(() => Vehicle, { description: 'Update an existing vehicle' })
  updateVehicle(@Args('input') input: UpdateVehicleInput) {
    return this.vehiclesService.update(input.id, input);
  }

  @Mutation(() => VehiclePosition, {
    description: 'Record a simulated GPS position for a vehicle',
  })
  recordVehiclePosition(@Args('input') input: RecordVehiclePositionInput) {
    return this.vehiclesService.recordPosition(input);
  }

  @Mutation(() => Boolean, { description: 'Delete a vehicle' })
  removeVehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.remove(id);
  }
}
