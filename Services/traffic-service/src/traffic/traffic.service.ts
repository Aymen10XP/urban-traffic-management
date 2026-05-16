import { Injectable, NotFoundException } from '@nestjs/common';
import { TrafficZone, CongestionLevel } from './entities/traffic-zone.entity';
import { CreateTrafficZoneInput } from './dto/create-traffic-zone.input';
import { UpdateTrafficZoneInput } from './dto/update-traffic-zone.input';

@Injectable()
export class TrafficService {
  private zones: TrafficZone[] = [];
  private idCounter = 1;

  create(input: CreateTrafficZoneInput): TrafficZone {
    const zone: TrafficZone = {
      id: this.idCounter++,
      ...input,
      congestionLevel: this.calculateCongestionLevel(input.density),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.zones.push(zone);
    return zone;
  }

  findAll(): TrafficZone[] {
    return this.zones;
  }

  findOne(id: number): TrafficZone {
    const zone = this.zones.find((item) => item.id === id);
    if (!zone) {
      throw new NotFoundException(`Traffic Zone with ID ${id} not found`);
    }
    return zone;
  }

  update(id: number, input: UpdateTrafficZoneInput): TrafficZone {
    const zone = this.findOne(id);
    Object.assign(zone, input);
    
    if (input.density !== undefined) {
      zone.congestionLevel = this.calculateCongestionLevel(zone.density);
    }
    
    zone.updatedAt = new Date();
    return zone;
  }

  remove(id: number): TrafficZone {
    const zone = this.findOne(id);
    this.zones = this.zones.filter((item) => item.id !== id);
    return zone;
  }

  private calculateCongestionLevel(density: number): CongestionLevel {
    if (density <= 30) return CongestionLevel.FAIBLE;
    if (density <= 70) return CongestionLevel.MOYEN;
    return CongestionLevel.ELEVE;
  }
}
