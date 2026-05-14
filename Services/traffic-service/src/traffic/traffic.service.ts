import { Injectable } from '@nestjs/common';
import { CreateTrafficInput } from './dto/create-traffic.input';
import { UpdateTrafficInput } from './dto/update-traffic.input';

@Injectable()
export class TrafficService {
  create(createTrafficInput: CreateTrafficInput) {
    return 'This action adds a new traffic';
  }

  findAll() {
    return `This action returns all traffic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} traffic`;
  }

  update(id: number, updateTrafficInput: UpdateTrafficInput) {
    return `This action updates a #${id} traffic`;
  }

  remove(id: number) {
    return `This action removes a #${id} traffic`;
  }
}
