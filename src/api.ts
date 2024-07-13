import axios from 'axios';
import { BoodschapProps } from './types/Props';

// const API_URL = 'http://localhost:5000/api/items';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/items';


export const fetchBoodschappenHistory = async (): Promise<BoodschapProps[]> => {
  const response = await axios.get(API_URL);
  console.log('API: Fetched data:', response.data); // Log fetched data
  return response.data;
};

// Function to add a new boodschap to the backend
export const addBoodschapToBackend = async (boodschap: any) => {
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
export const editBoodschapInBackend = async (id: string, updatedBoodschap: any) => {
  try {
    console.log('API: Updating data for ID:', id, updatedBoodschap);
    const response = await axios.put(`${API_URL}/${id}`, updatedBoodschap);
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

// Function to undo boodschappen in the backend
export const undoBoodschappenInBackend = async (prevBoodschappen:BoodschapProps[]) => {
  try {
    console.log('API: Reverting to previous state:', prevBoodschappen);
    const response = await axios.post(`${API_URL}/undo`, { prevBoodschappen });
    return response.data;
  } catch (error) {
    console.error('API: Error undoing boodschappen:', error);
    throw error;
  }
};