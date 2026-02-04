import axios from 'axios';
import { Building, CampusBoundary, Category, RouteResponse } from './types';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await API.get('/categories');
  return data;
};

export const getBuildings = async (category?: string, search?: string): Promise<Building[]> => {
  const params: any = {};
  if (category) params.category = category;
  if (search) params.q = search;
  
  const { data } = await API.get('/buildings', { params });
  return data;
};

export const getBuildingDetails = async (id: number): Promise<Building> => {
  const { data } = await API.get(`/buildings/${id}`);
  return data;
};

export const getCampusBoundary = async (): Promise<CampusBoundary> => {
  const { data } = await API.get('/campus-boundary');
  return data;
};

export const getRoute = async (from: [number, number], to: [number, number]): Promise<RouteResponse> => {
  const { data } = await API.get('/route', {
    params: {
      from: `${from[0]},${from[1]}`, // lat,lng
      to: `${to[0]},${to[1]}`,
    },
  });
  return data;
};
