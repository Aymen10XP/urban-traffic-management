import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IncidentService } from './incident.service';
import { Incident, IncidentStatus } from './entities/incident.entity';
import { CreateIncidentInput } from './dto/create-incident.input';
import { UpdateIncidentInput } from './dto/update-incident.input';

@Resolver(() => Incident)
export class IncidentResolver {
  constructor(private readonly incidentService: IncidentService) { }

  @Mutation(() => Incident, {
    description: 'Déclarer un nouvel incident de trafic',
  })
  createIncident(
    @Args('input') input: CreateIncidentInput,
  ): Incident {
    return this.incidentService.create(input);
  }

  @Query(() => [Incident], {
    name: 'incidents',
    description: 'Afficher tous les incidents',
  })
  findAll(): Incident[] {
    return this.incidentService.findAll();
  }

  @Query(() => Incident, {
    name: 'incident',
    description: 'Afficher un incident par ID',
  })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Incident {
    return this.incidentService.findOne(id);
  }

  @Mutation(() => Incident, {
    description: 'Modifier un incident existant',
  })
  updateIncident(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateIncidentInput,
  ): Incident {
    return this.incidentService.update(id, input);
  }

  @Mutation(() => Incident, {
    description: 'Modifier le statut d’un incident',
  })
  updateIncidentStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => IncidentStatus }) status: IncidentStatus,
  ): Incident {
    return this.incidentService.updateStatus(id, status);
  }

  @Mutation(() => Incident, {
    description: 'Supprimer un incident',
  })
  removeIncident(
    @Args('id', { type: () => Int }) id: number,
  ): Incident {
    return this.incidentService.remove(id);
  }
}
