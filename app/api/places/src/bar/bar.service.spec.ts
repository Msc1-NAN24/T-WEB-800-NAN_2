import { Test, TestingModule } from '@nestjs/testing';
import { BarService } from './bar.service';
import {BarController} from "./bar.controller";

describe('BarService', () => {
  let service: BarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarService],
      controllers: [BarController],
    }).compile();

    service = module.get<BarService>(BarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
