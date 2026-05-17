import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CreateIncidentInput } from './dto/create-incident.input';
import { UpdateIncidentInput } from './dto/update-incident.input';
import { Incident, IncidentStatus } from './entities/incident.entity';
import { IncidentService } from './incident.service';

@Resolver(() => Incident)
@UseGuards(JwtAuthGuard)
export class IncidentResolver {
  constructor(private readonly incidentService: IncidentService) {}

  @Mutation(() => Incident, {
    description: 'Declare a new traffic incident',
  })
  createIncident(@Args('input') input: CreateIncidentInput) {
    return this.incidentService.create(input);
  }

  @Query(() => [Incident], {
    name: 'incidents',
    description: 'List all incidents',
  })
  findAll() {
    return this.incidentService.findAll();
  }

  @Query(() => Incident, {
    name: 'incident',
    description: 'Get an incident by ID',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.incidentService.findOne(id);
  }

  @Mutation(() => Incident, {
    description: 'Update an existing incident',
  })
  updateIncident(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateIncidentInput,
  ) {
    return this.incidentService.update(id, input);
  }

  @Mutation(() => Incident, {
    description: 'Update the status of an incident',
  })
  updateIncidentStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => IncidentStatus }) status: IncidentStatus,
  ) {
    return this.incidentService.updateStatus(id, status);
  }

  @Mutation(() => Incident, {
    description: 'Delete an incident',
  })
  removeIncident(@Args('id', { type: () => Int }) id: number) {
    return this.incidentService.remove(id);
  }
}
