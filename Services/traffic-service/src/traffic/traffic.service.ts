import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrafficZoneInput } from './dto/create-traffic-zone.input';
import { MeasureTrafficDensityInput } from './dto/measure-traffic-density.input';
import { UpdateTrafficZoneInput } from './dto/update-traffic-zone.input';
import { CongestionLevel, TrafficZone } from './entities/traffic-zone.entity';

@Injectable()
export class TrafficService {
  constructor(
    @InjectRepository(TrafficZone)
    private readonly trafficZonesRepository: Repository<TrafficZone>,
  ) {}

  async create(input: CreateTrafficZoneInput): Promise<TrafficZone> {
    const existingZone = await this.trafficZonesRepository.findOne({
      where: { name: input.name },
    });

    if (existingZone) {
      throw new ConflictException(`Traffic zone ${input.name} already exists`);
    }

    const zone = this.trafficZonesRepository.create({
      ...input,
      congestionLevel: this.calculateCongestionLevel(input.density),
    });

    return this.trafficZonesRepository.save(zone);
  }

  async findAll(): Promise<TrafficZone[]> {
    return this.trafficZonesRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<TrafficZone> {
    const zone = await this.trafficZonesRepository.findOne({
      where: { id },
    });

    if (!zone) {
      throw new NotFoundException(`Traffic zone with ID ${id} not found`);
    }

    return zone;
  }

  async findCongestedZones(): Promise<TrafficZone[]> {
    return this.trafficZonesRepository.find({
      where: { congestionLevel: CongestionLevel.ELEVE },
      order: { density: 'DESC', id: 'ASC' },
    });
  }

  async update(id: number, input: UpdateTrafficZoneInput): Promise<TrafficZone> {
    const zone = await this.findOne(id);

    if (input.name && input.name !== zone.name) {
      const existingZone = await this.trafficZonesRepository.findOne({
        where: { name: input.name },
      });

      if (existingZone) {
        throw new ConflictException(`Traffic zone ${input.name} already exists`);
      }
    }

    Object.assign(zone, input);
    if (input.density !== undefined) {
      zone.congestionLevel = this.calculateCongestionLevel(input.density);
    }

    return this.trafficZonesRepository.save(zone);
  }

  async measureDensity(input: MeasureTrafficDensityInput): Promise<TrafficZone> {
    const zone = await this.findOne(input.zoneId);
    zone.density = input.density;
    zone.congestionLevel = this.calculateCongestionLevel(input.density);
    return this.trafficZonesRepository.save(zone);
  }

  async remove(id: number): Promise<TrafficZone> {
    const zone = await this.findOne(id);
    await this.trafficZonesRepository.delete(id);
    return zone;
  }

  private calculateCongestionLevel(density: number): CongestionLevel {
    if (density <= 30) {
      return CongestionLevel.FAIBLE;
    }

    if (density <= 70) {
      return CongestionLevel.MOYEN;
    }

    return CongestionLevel.ELEVE;
  }
}
