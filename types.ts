
export interface Artisan {
  id: string;
  name: string;
  craft: string;
  location: string;
  coordinates: { lat: number; lng: number };
  description: string;
  imageUrl: string;
  category: 'Artisan' | 'Hidden Gem' | 'Workshop' | 'Eatery';
  tags: string[];
}

export type AppTab = 'Feed' | 'Map' | 'Artisans' | 'Profile';
