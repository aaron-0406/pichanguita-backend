import { Test, TestingModule } from '@nestjs/testing';
import { FootbalFieldsController } from './footbal-fields.controller';
import { FootbalFieldsService } from './footbal-fields.service';

describe('FootbalFieldsController', () => {
  let controller: FootbalFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FootbalFieldsController],
      providers: [FootbalFieldsService],
    }).compile();

    controller = module.get<FootbalFieldsController>(FootbalFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
