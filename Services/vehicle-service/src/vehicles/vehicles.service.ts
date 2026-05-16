import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { Vehicle, VehicleStatus } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  private vehicles: Vehicle[] = [];
  private idCounter = 1;

  create(createVehicleInput: CreateVehicleInput): Vehicle {
    const vehicle: Vehicle = {
      id: this.idCounter++,
      ...createVehicleInput,
      status: createVehicleInput.status || VehicleStatus.ACTIVE,
    };
    this.vehicles.push(vehicle);
    return vehicle;
  }

  findAll(): Vehicle[] {
    return this.vehicles;
  }

  findOne(id: number): Vehicle {
    const vehicle = this.vehicles.find((v) => v.id === id);
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  update(id: number, updateVehicleInput: UpdateVehicleInput): Vehicle {
    const vehicle = this.findOne(id);
    
    if (updateVehicleInput.licensePlate !== undefined) vehicle.licensePlate = updateVehicleInput.licensePlate;
    if (updateVehicleInput.make !== undefined) vehicle.make = updateVehicleInput.make;
    if (updateVehicleInput.model !== undefined) vehicle.model = updateVehicleInput.model;
    if (updateVehicleInput.year !== undefined) vehicle.year = updateVehicleInput.year;
    if (updateVehicleInput.status !== undefined) vehicle.status = updateVehicleInput.status;
    
    return vehicle;
  }

  remove(id: number): boolean {
    const initialLength = this.vehicles.length;
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
    return this.vehicles.length < initialLength;
  }
}
