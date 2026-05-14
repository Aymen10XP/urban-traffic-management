import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IncidentService } from './incident.service';
import { Incident } from './entities/incident.entity';
import { CreateIncidentInput } from './dto/create-incident.input';
import { UpdateIncidentInput } from './dto/update-incident.input';

@Resolver(() => Incident)
export class IncidentResolver {
  constructor(private readonly incidentService: IncidentService) {}

  @Mutation(() => Incident)
  createIncident(@Args('createIncidentInput') createIncidentInput: CreateIncidentInput) {
    return this.incidentService.create(createIncidentInput);
  }

  @Query(() => [Incident], { name: 'incident' })
  findAll() {
    return this.incidentService.findAll();
  }

  @Query(() => Incident, { name: 'incident' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.incidentService.findOne(id);
  }

  @Mutation(() => Incident)
  updateIncident(@Args('updateIncidentInput') updateIncidentInput: UpdateIncidentInput) {
    return this.incidentService.update(updateIncidentInput.id, updateIncidentInput);
  }

  @Mutation(() => Incident)
  removeIncident(@Args('id', { type: () => Int }) id: number) {
    return this.incidentService.remove(id);
  }
}
