import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FootbalFieldsService } from './footbal-fields.service';
import { CreateFootbalFieldDto } from './dto/create-footbal-field.dto';
import { UpdateFootbalFieldDto } from './dto/update-footbal-field.dto';

@Controller('api/v0/footbal-fields')
export class FootbalFieldsController {
  constructor(private readonly footbalFieldsService: FootbalFieldsService) {}

  @Post()
  create(@Body() createFootbalFieldDto: CreateFootbalFieldDto) {
    return this.footbalFieldsService.create(createFootbalFieldDto);
  }

  @Get()
  findAll() {
    return this.footbalFieldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.footbalFieldsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFootbalFieldDto: UpdateFootbalFieldDto,
  ) {
    return this.footbalFieldsService.update(+id, updateFootbalFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.footbalFieldsService.remove(+id);
  }
}
