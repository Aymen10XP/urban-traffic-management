import { Injectable, NotFoundException } from '@nestjs/common';
import { Incident, IncidentStatus } from './entities/incident.entity';
import { CreateIncidentInput } from './dto/create-incident.input';
import { UpdateIncidentInput } from './dto/update-incident.input';

@Injectable()
export class IncidentService {
  private incidents: Incident[] = [];
  private idCounter = 1;

  create(input: CreateIncidentInput): Incident {
    const incident: Incident = {
      id: this.idCounter++,
      ...input,
      status: IncidentStatus.SIGNALE,
      createdAt: new Date(),
    };
    this.incidents.push(incident);
    return incident;
  }

  findAll(): Incident[] {
    return this.incidents;
  }

  findOne(id: number): Incident {
    const incident = this.incidents.find((item) => item.id === id);
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  update(id: number, input: UpdateIncidentInput): Incident {
    const incident = this.findOne(id);
    Object.assign(incident, input);
    return incident;
  }

  updateStatus(id: number, status: IncidentStatus): Incident {
    const incident = this.findOne(id);
    incident.status = status;
    return incident;
  }

  remove(id: number): Incident {
    const incident = this.findOne(id);
    this.incidents = this.incidents.filter((item) => item.id !== incident.id);
    return incident;
  }
}
