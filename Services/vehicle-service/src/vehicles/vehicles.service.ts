import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { RecordVehiclePositionInput } from './dto/record-vehicle-position.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { Vehicle, VehicleStatus } from './entities/vehicle.entity';
import { VehiclePosition } from './entities/vehicle-position.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(VehiclePosition)
    private readonly vehiclePositionsRepository: Repository<VehiclePosition>,
  ) {}

  async create(createVehicleInput: CreateVehicleInput): Promise<Vehicle> {
    const existingVehicle = await this.vehiclesRepository.findOne({
      where: { licensePlate: createVehicleInput.licensePlate },
    });

    if (existingVehicle) {
      throw new ConflictException(`Vehicle with plate ${createVehicleInput.licensePlate} already exists`);
    }

    const vehicle = this.vehiclesRepository.create({
      ...createVehicleInput,
      status: createVehicleInput.status || VehicleStatus.ACTIVE,
    });

    const savedVehicle = await this.vehiclesRepository.save(vehicle);
    return this.findOne(savedVehicle.id);
  }

  async findAll(): Promise<Vehicle[]> {
    const vehicles = await this.vehiclesRepository.find({
      relations: { positionHistory: true },
      order: { id: 'ASC' },
    });

    return vehicles.map((vehicle) => this.sortPositionHistory(vehicle));
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({
      where: { id },
      relations: { positionHistory: true },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return this.sortPositionHistory(vehicle);
  }

  async update(id: number, updateVehicleInput: UpdateVehicleInput): Promise<Vehicle> {
    const vehicle = await this.findOne(id);

    if (
      updateVehicleInput.licensePlate &&
      updateVehicleInput.licensePlate !== vehicle.licensePlate
    ) {
      const existingVehicle = await this.vehiclesRepository.findOne({
        where: { licensePlate: updateVehicleInput.licensePlate },
      });

      if (existingVehicle) {
        throw new ConflictException(`Vehicle with plate ${updateVehicleInput.licensePlate} already exists`);
      }
    }

    Object.assign(vehicle, updateVehicleInput);
    await this.vehiclesRepository.save(vehicle);
    return this.findOne(id);
  }

  async recordPosition(input: RecordVehiclePositionInput): Promise<VehiclePosition> {
    await this.findOne(input.vehicleId);

    const position = this.vehiclePositionsRepository.create({
      vehicleId: input.vehicleId,
      latitude: input.latitude,
      longitude: input.longitude,
    });

    return this.vehiclePositionsRepository.save(position);
  }

  async getMovementHistory(vehicleId: number): Promise<VehiclePosition[]> {
    await this.findOne(vehicleId);

    return this.vehiclePositionsRepository.find({
      where: { vehicleId },
      order: { recordedAt: 'ASC', id: 'ASC' },
    });
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);
    await this.vehiclesRepository.delete(id);
    return true;
  }

  private sortPositionHistory(vehicle: Vehicle): Vehicle {
    if (vehicle.positionHistory) {
      vehicle.positionHistory = [...vehicle.positionHistory].sort(
        (left, right) => left.recordedAt.getTime() - right.recordedAt.getTime(),
      );
    }

    return vehicle;
  }
}
