import axios, { AxiosRequestConfig } from 'axios';
import { DestinationModel } from '../Models/DestinationModel';
import { appConfig } from '../Utils/AppConfig';
import { Public } from '@mui/icons-material';

class DestinationService {
  //Get all destinations from backend: --asaf
  public async getAllDestinations(): Promise<DestinationModel[]> {
    // fetch them from backend:
    const response = await axios.get<DestinationModel[]>(appConfig.backendUrl + 'destinations');

    const destinations = response.data;

    // Return:
    return destinations;
  }

  //Get one destination by id:
  public async getOneDestination(id: number): Promise<DestinationModel> {
  

    //  - fetch them from backend:
    const response = await axios.get<DestinationModel>(appConfig.backendUrl + 'destinations/' + id);
    const destination = response.data;

    // Return:
    return destination;
  }

  //Add new destination  asaf
  public async addDestination(destination: DestinationModel): Promise<void> {
    // Convert DestinationModel into FormData
    const formData = new FormData();
    formData.append('destination', destination.destination);
    formData.append('description', destination.description);
    formData.append('fromDate', destination.fromDate.toString());
    formData.append('untilDate', destination.untilDate.toString());
    formData.append('price', destination.price.toString());
    if (destination.image) {
      formData.append('image', destination.image);
    }

    // Send destination to backend:
    const options: AxiosRequestConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
    const response = await axios.post<DestinationModel>(appConfig.backendUrl + 'destinations', formData, options);

    // Get back the added destination:
    const addedDestination = response.data;
  }

  //Update destination
  public async updateDestination(destination: DestinationModel): Promise<void> {
    // Convert DestinationModel into FormData because we need to send text + image:
    const formData = new FormData();
    formData.append('destination', destination.destination);
    formData.append('description', destination.description);
    formData.append('fromDate', destination.fromDate.toString());
    formData.append('untilDate', destination.untilDate.toString());
    formData.append('price', destination.price.toString());
    // formData.append('image', destination.imageUrl);
    // formData.append("imageName", destination.imageUrl);

    // Send destination to backend:
    const options: AxiosRequestConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
    const response = await axios.put<DestinationModel>(appConfig.backendUrl + 'destinations', formData, options);

    // Get back the added destination:
    const updateDestination = response.data;
  }

  //   Delete destination :
  public async deleteDestination(id: number): Promise<void> {
    // Delete this destination in backend:
    await axios.delete(appConfig.backendUrl + 'destinations/' + id);
  }

  public async changeLike(destinationId: number) {
    const response = await axios.post(appConfig.backendUrl + 'destinations/' + destinationId + '/changeLike');
    return response.data.changedLike;
  }

  public async filterFutureDestinations(destinations: DestinationModel[]): Promise<DestinationModel[]> {
    const now = new Date();
    return destinations.filter((d) => {
      const fromDate = new Date(d.fromDate);
      return fromDate > now;
    });
  }

  public async filterActiveDestinations(destinations: DestinationModel[]): Promise<DestinationModel[]> {
    const now = new Date();
    return destinations.filter((d) => {
      const fromDate = new Date(d.fromDate);
      const untilDate = new Date(d.untilDate);
      return fromDate <= now && untilDate >= now;
    });
  }
}

export const destinationService = new DestinationService();
