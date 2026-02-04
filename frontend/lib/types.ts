export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Building {
  id: number;
  category_id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string | null;
  image_url: string | null;
  category?: Category;
}

export interface CampusBoundary {
  id: number;
  name: string;
  geometry: {
    // Determine if it's BBOX or Polygon based on backend
    southWest?: { lat: number; lng: number };
    northEast?: { lat: number; lng: number };
    type?: string;
    coordinates?: number[][][];
  };
}

export interface RouteResponse {
  routes: Array<{
    geometry: any; // GeoJSON
    duration: number;
    distance: number;
  }>;
}
