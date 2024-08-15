import axios, { AxiosRequestConfig } from 'axios';
import { DestinationModel } from '../Models/DestinationModel';
import { appConfig } from '../Utils/AppConfig';
import { destinationActions, store } from '../Redux/store';
import { deleteDestination } from '../Redux/reducers';
import { Public } from '@mui/icons-material';

class DestinationService {
  //Get all destinations from backend: --asaf
  public async getAllDestinations(): Promise<DestinationModel[]> {
    // If we have destinations in the global state - return them, without fetching from server:
    if (store.getState().destinations) return store.getState().destinations;

    // We don't have destinations in the global state - fetch them from backend:
    const response = await axios.get<DestinationModel[]>(appConfig.backendUrl + 'destinations');

    const destinations = response.data;

    // Init all destinations in the global state:
    const action = destinationActions.initDestinations(destinations);
    store.dispatch(action);

    // Return:
    return destinations;
  }

  //Get one destination by id:
  public async getOneDestination(id: number): Promise<DestinationModel> {
    // If we have destinations in the global state - return them, without fetching from server:
    //  if (store.getState().destinations) return store.getState().destinations;

    // We don't have destinations in the global state - fetch them from backend:
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

    // Don't add that destination to redux if global state is empty:
    if (!store.getState().destinations) return;

    // Get back the added destination:
    const addedDestination = response.data;

    // Send added destination to global state:
    const action = destinationActions.addDestination(addedDestination);
    store.dispatch(action);
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

    // Don't add that destination to redux if global state is empty:
    if (!store.getState().destinations) return;

    // Get back the added destination:
    const updateDestination = response.data;

    // Send update destination to global state:
    const action = destinationActions.updateDestination(updateDestination);
    store.dispatch(action);
  }

  //   Delete destination :
  public async deleteDestination(id: number): Promise<void> {
    // Delete this destination in backend:
    await axios.delete(appConfig.backendUrl + 'destinations' + id);

    // Delete this destination also in redux global state:
    // const action = destinationActions.deleteDestination(id);
    // store.dispatch(action); // Redux will call destinationReducer to perform this action.
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
