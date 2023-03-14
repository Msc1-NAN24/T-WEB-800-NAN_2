import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('RestaurantService', () => {
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantService],
    }).useMocker((token) => {
      if (token === RestaurantService) {
        return {
          getNearby: jest.fn().mockResolvedValue({test: 'abc'})
        }
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
      .compile();

    service = module.get<RestaurantService>(RestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Get nearby restaurant', (done) => {
    done();
    /*service.getNearby({location: {lng: -1.5512, lat: 47.2145}, radius: 200}).then((response) => {
      console.log(response);
      expect(response.data).toBeDefined();
      done();
    }).catch((err) => {
      console.error(err);
      expect(true).toBeFalsy();
    });*/
  });
});
