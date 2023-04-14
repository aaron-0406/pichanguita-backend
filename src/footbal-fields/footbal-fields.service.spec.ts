import { Test, TestingModule } from '@nestjs/testing';
import { FootbalFieldsService } from './footbal-fields.service';

describe('FootbalFieldsService', () => {
  let service: FootbalFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FootbalFieldsService],
    }).compile();

    service = module.get<FootbalFieldsService>(FootbalFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
