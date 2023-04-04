import { Model } from 'mongoose';
import { Travel, TravelDocument } from '../schema/travel.schema';
import { InjectModel } from '@nestjs/mongoose';

export class TravelService {
  constructor(
    @InjectModel(Travel.name) private travelModel: Model<TravelDocument>,
  ) {}

  async getService() {
    return await this.travelModel.find().exec();
  }

  async getServiceByOwner(owner: string) {
    return await this.travelModel.find({ owner }).exec();
  }

  async getServiceByID(id: string) {
    return await this.travelModel.find({ _id: id }).exec();
  }

  async updateTravel(
    id: string,
    update: Partial<Travel>,
  ): Promise<TravelDocument> {
    return await this.travelModel.findOneAndUpdate({ _id: id }, update).exec();
  }

  async deleteTravel(id) {
    return this.travelModel.findOneAndDelete({ _id: id });
  }

  async createTravel(travel: Partial<Travel>) {
    return await this.travelModel.create(travel);
  }
}
