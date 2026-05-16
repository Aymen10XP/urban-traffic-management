import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Mutation(() => Vehicle, { description: 'Ajouter un nouveau véhicule' })
  createVehicle(@Args('input') input: CreateVehicleInput) {
    return this.vehiclesService.create(input);
  }

  @Query(() => [Vehicle], { name: 'vehicles', description: 'Consulter tous les véhicules' })
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Query(() => Vehicle, { name: 'vehicle', description: 'Consulter un véhicule par ID' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.findOne(id);
  }

  @Mutation(() => Vehicle, { description: 'Mettre à jour un véhicule existant' })
  updateVehicle(@Args('input') input: UpdateVehicleInput) {
    return this.vehiclesService.update(input.id, input);
  }

  @Mutation(() => Boolean, { description: 'Supprimer un véhicule' })
  removeVehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.remove(id);
  }
}
