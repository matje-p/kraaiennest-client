import axios from 'axios';
import { Boodschap } from './types/Props';

const API_URL = import.meta.env.VITE_API_URL;


export const fetchBoodschappenHistory = async (): Promise<Boodschap[]> => {
  const response = await axios.get<Boodschap[]>(API_URL);
  console.log('API: Fetched data:', response.data); // Log fetched data
  return response.data;
};

// Function to add a new boodschap to the backend
export const addBoodschapToBackend = async (boodschap: Boodschap) => {
  try {
    console.log('API: Adding new boodschap:', boodschap.id);  
    const response = await axios.post(API_URL, boodschap);
    return response.data;
  } catch (error) {
    console.error('Error adding boodschap:', error);
    throw error;  
  }
};

// Function to edit an existing boodschap
export const editBoodschapInBackend = async (id: string, updatedText: any) => {
  try {
    console.log('API: Updating data for ID:', id, updatedText);
    const response = await axios.put(`${API_URL}/${id}`, updatedText);
    return response.data;
  } catch (error) {
    console.error('API: Error editing boodschap:', error);
    throw error;
  }
};

// Function to delete a boodschap from the backend
export const deleteBoodschapFromBackend = async (id: string) => {
  try {
    console.log('API: Deleting data for ID:', id);
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('API: Error deleting boodschap:', error);
    throw error;
  }
};

// Function to mark a boodschap as done in the backend
export const markBoodschapAsDoneInBackend = async (id: string, userDone: string, newDoneStatus: boolean) => {
  try {
    console.log('API: Toggling "done" for boodschap:', id);
    const response = await axios.patch(`${API_URL}/${id}/done`, { userDone, done: newDoneStatus });
    return response.data;
  } catch (error) {
    console.error('API: Error toggling done:', error);
    throw error;
  }
};

