import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CreateTrafficZoneInput } from './dto/create-traffic-zone.input';
import { MeasureTrafficDensityInput } from './dto/measure-traffic-density.input';
import { UpdateTrafficZoneInput } from './dto/update-traffic-zone.input';
import { TrafficZone } from './entities/traffic-zone.entity';
import { TrafficService } from './traffic.service';

@Resolver(() => TrafficZone)
@UseGuards(JwtAuthGuard)
export class TrafficResolver {
  constructor(private readonly trafficService: TrafficService) {}

  @Mutation(() => TrafficZone, {
    description: 'Create a new traffic zone',
  })
  createTrafficZone(@Args('input') input: CreateTrafficZoneInput) {
    return this.trafficService.create(input);
  }

  @Query(() => [TrafficZone], {
    name: 'trafficZones',
    description: 'List all traffic zones',
  })
  findAll() {
    return this.trafficService.findAll();
  }

  @Query(() => TrafficZone, {
    name: 'trafficZone',
    description: 'Get a traffic zone by ID',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.trafficService.findOne(id);
  }

  @Query(() => [TrafficZone], {
    name: 'congestedTrafficZones',
    description: 'List zones currently classified as congested',
  })
  congestedTrafficZones() {
    return this.trafficService.findCongestedZones();
  }

  @Mutation(() => TrafficZone, {
    description: 'Update a traffic zone',
  })
  updateTrafficZone(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateTrafficZoneInput,
  ) {
    return this.trafficService.update(id, input);
  }

  @Mutation(() => TrafficZone, {
    description: 'Measure and store the traffic density for a zone',
  })
  measureTrafficDensity(@Args('input') input: MeasureTrafficDensityInput) {
    return this.trafficService.measureDensity(input);
  }

  @Mutation(() => TrafficZone, {
    description: 'Delete a traffic zone',
  })
  removeTrafficZone(@Args('id', { type: () => Int }) id: number) {
    return this.trafficService.remove(id);
  }
}
