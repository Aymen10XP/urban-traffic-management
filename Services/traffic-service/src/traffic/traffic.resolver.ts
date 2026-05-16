import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TrafficService } from './traffic.service';
import { TrafficZone } from './entities/traffic-zone.entity';
import { CreateTrafficZoneInput } from './dto/create-traffic-zone.input';
import { UpdateTrafficZoneInput } from './dto/update-traffic-zone.input';

@Resolver(() => TrafficZone)
export class TrafficResolver {
  constructor(private readonly trafficService: TrafficService) { }

  @Mutation(() => TrafficZone, {
    description: 'Créer une nouvelle zone de circulation',
  })
  createTrafficZone(
    @Args('input') input: CreateTrafficZoneInput,
  ): TrafficZone {
    return this.trafficService.create(input);
  }

  @Query(() => [TrafficZone], {
    name: 'trafficZones',
    description: 'Afficher toutes les zones de trafic',
  })
  findAll(): TrafficZone[] {
    return this.trafficService.findAll();
  }

  @Query(() => TrafficZone, {
    name: 'trafficZone',
    description: 'Afficher une zone de trafic par ID',
  })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): TrafficZone {
    return this.trafficService.findOne(id);
  }

  @Mutation(() => TrafficZone, {
    description: 'Modifier une zone de trafic existante',
  })
  updateTrafficZone(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateTrafficZoneInput,
  ): TrafficZone {
    return this.trafficService.update(id, input);
  }

  @Mutation(() => TrafficZone, {
    description: 'Supprimer une zone de trafic',
  })
  removeTrafficZone(
    @Args('id', { type: () => Int }) id: number,
  ): TrafficZone {
    return this.trafficService.remove(id);
  }
}