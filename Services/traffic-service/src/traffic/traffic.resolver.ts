import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TrafficService } from './traffic.service';
import { Traffic } from './entities/traffic.entity';
import { CreateTrafficInput } from './dto/create-traffic.input';
import { UpdateTrafficInput } from './dto/update-traffic.input';

@Resolver(() => Traffic)
export class TrafficResolver {
  constructor(private readonly trafficService: TrafficService) {}

  @Mutation(() => Traffic)
  createTraffic(@Args('createTrafficInput') createTrafficInput: CreateTrafficInput) {
    return this.trafficService.create(createTrafficInput);
  }

  @Query(() => [Traffic], { name: 'traffic' })
  findAll() {
    return this.trafficService.findAll();
  }

  @Query(() => Traffic, { name: 'traffic' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.trafficService.findOne(id);
  }

  @Mutation(() => Traffic)
  updateTraffic(@Args('updateTrafficInput') updateTrafficInput: UpdateTrafficInput) {
    return this.trafficService.update(updateTrafficInput.id, updateTrafficInput);
  }

  @Mutation(() => Traffic)
  removeTraffic(@Args('id', { type: () => Int }) id: number) {
    return this.trafficService.remove(id);
  }
}
