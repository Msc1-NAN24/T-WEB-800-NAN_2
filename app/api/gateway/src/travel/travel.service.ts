import axios from 'axios';

export class TravelService {
  async get() {
    const { data } = await axios.get(`http://api-travel:3000/travel/`);
    return data;
  }

  async getById(id: string) {
    const { data } = await axios.get(`http://api-travel:3000/travel/${id}`);
    return data;
  }

  async getByOwner(ownerId: string) {
    const { data } = await axios.get(
      `http://api-travel:3000/travel/owner/${ownerId}`,
    );
    return data;
  }

  async create(newTravel: any) {
    const { data } = await axios.post(
      `http://api-travel:3000/travel/`,
      newTravel,
    );
    return data;
  }

  async updateTravel(id: string, update: any) {
    const { data } = await axios.patch(
      `http://api-travel:3000/travel/${id}`,
      update,
    );
    return data;
  }

  async deleteTravel(id: string) {
    const { data } = await axios.delete(`http://api-travel:3000/travel/${id}`);
    return data;
  }
}
