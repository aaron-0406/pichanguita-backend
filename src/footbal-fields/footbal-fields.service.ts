import { Injectable } from '@nestjs/common';
import { CreateFootbalFieldDto } from './dto/create-footbal-field.dto';
import { UpdateFootbalFieldDto } from './dto/update-footbal-field.dto';

@Injectable()
export class FootbalFieldsService {
  async create(createFootbalFieldDto: CreateFootbalFieldDto) {
    console.log('first');
  }

  async findAll() {
    return 'message';
  }

  findOne(id: number) {
    return `This action returns a #${id} footbalField`;
  }

  update(id: number, updateFootbalFieldDto: UpdateFootbalFieldDto) {
    return `This action updates a #${id} footbalField`;
  }

  remove(id: number) {
    return `This action removes a #${id} footbalField`;
  }
}
