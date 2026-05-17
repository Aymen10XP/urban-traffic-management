import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncidentInput } from './dto/create-incident.input';
import { UpdateIncidentInput } from './dto/update-incident.input';
import { Incident, IncidentStatus } from './entities/incident.entity';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentsRepository: Repository<Incident>,
  ) {}

  async create(input: CreateIncidentInput): Promise<Incident> {
    const incident = this.incidentsRepository.create({
      ...input,
      status: IncidentStatus.SIGNALE,
    });

    return this.incidentsRepository.save(incident);
  }

  async findAll(): Promise<Incident[]> {
    return this.incidentsRepository.find({
      order: { createdAt: 'DESC', id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Incident> {
    const incident = await this.incidentsRepository.findOne({
      where: { id },
    });

    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }

    return incident;
  }

  async update(id: number, input: UpdateIncidentInput): Promise<Incident> {
    const incident = await this.findOne(id);
    Object.assign(incident, input);
    return this.incidentsRepository.save(incident);
  }

  async updateStatus(id: number, status: IncidentStatus): Promise<Incident> {
    const incident = await this.findOne(id);
    incident.status = status;
    return this.incidentsRepository.save(incident);
  }

  async remove(id: number): Promise<Incident> {
    const incident = await this.findOne(id);
    await this.incidentsRepository.delete(id);
    return incident;
  }
}
