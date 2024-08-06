import axios, { AxiosRequestConfig } from "axios"
import { DestinationModel } from "../Models/DestinationModel";
import { appConfig } from "../Utils/AppConfig";
import { destinationActions, store } from "../Redux/store";
import { deleteDestination } from "../Redux/reducers";

class DestinationService {

  //Get all destinations from backend: --asaf
  public async getAllDestinations(): Promise<DestinationModel[]> {
    
    // If we have destinations in the global state - return them, without fetching from server:
    if (store.getState().destinations) return store.getState().destinations;

    // We don't have destinations in the global state - fetch them from backend:
    const response = await axios.get<DestinationModel[]>(appConfig.destinationsUrl);
   
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
//    if (store.getState().destinations) return store.getState().destinations;

    // We don't have destinations in the global state - fetch them from backend:
    const response = await axios.get<DestinationModel>(appConfig.destinationsUrl + id);
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
    if (destination.imageUrl) {
      formData.append('image', destination.imageUrl[0]);
    }

    // Send destination to backend:
    const options: AxiosRequestConfig = {headers: { 'Content-Type': 'multipart/form-data' }};
    const response = await axios.post<DestinationModel>(appConfig.destinationsUrl, formData, options);

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
    formData.append('image', destination.imageUrl[0]);
    // formData.append("imageName", destination.imageUrl)

    // Send destination to backend:
    const options: AxiosRequestConfig = {headers: { 'Content-Type': 'multipart/form-data' }};
    const response = await axios.post<DestinationModel>(`${appConfig.destinationsUrl}/${destination.id}`, formData, options);

    // Don't add that destination to redux if global state is empty:
    if (!store.getState().destinations) return;

    // Get back the added destination:
    const updateDestination = response.data;
    // updateDestination.fromDate = new Date(updateDestination.fromDate);
    // updateDestination.untilDate = new Date(updateDestination.untilDate);

    // Send update destination to global state:
    const action = destinationActions.addDestination(updateDestination);
    store.dispatch(action);
  }

  //   Delete destination :
  public async deleteDestination(id: number): Promise<void> {
    // Delete this destination in backend:
    await axios.delete("appConfig.destinationsUrl" + id);

    // Delete this destination also in redux global state:
    // const action: DestinationsAction = { type: DestinationsActionType.DeleteDestination, payload: id };
    // store.dispatch(action); // Redux will call destinationReducer to perform this action.
  }
}


export const destinationService = new DestinationService();
