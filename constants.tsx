
import { Artisan } from './types';

export const MYSORE_ARTISANS: Artisan[] = [
  {
    id: '1',
    name: 'Sandalwood Sanctuary',
    craft: 'Master Carving',
    location: 'Gudigar Street, Mysore',
    coordinates: { lat: 12.3023, lng: 76.6521 },
    description: 'Third-generation woodcarvers preserving the aromatic legacy of Mysore Sandalwood.',
    imageUrl: 'https://picsum.photos/seed/sandalwood/800/600',
    category: 'Artisan',
    tags: ['Heritage', 'Aromatic', 'Handmade']
  },
  {
    id: '2',
    name: 'The Weavers of Mysore Silk',
    craft: 'Silk Weaving',
    location: 'KSIC Silk Factory Surroundings',
    coordinates: { lat: 12.2882, lng: 76.6430 },
    description: 'Watch the intricate gold zari being woven into royal silk fabrics in tiny home-based looms.',
    imageUrl: 'https://picsum.photos/seed/silk/800/600',
    category: 'Artisan',
    tags: ['Textile', 'Luxury', 'Authentic']
  },
  {
    id: '3',
    name: 'Lalitha Mahal Foothills',
    craft: 'Hidden Viewpoint',
    location: 'Near Chamundi Hills Base',
    coordinates: { lat: 12.2989, lng: 76.6901 },
    description: 'A quiet, breezy trail used only by locals for sunset views of the Palace.',
    imageUrl: 'https://picsum.photos/seed/view/800/600',
    category: 'Hidden Gem',
    tags: ['Nature', 'Sunset', 'Peaceful']
  },
  {
    id: '4',
    name: 'Malu’s Clay Potteries',
    craft: 'Terracotta Art',
    location: 'Ramakrishna Nagar',
    coordinates: { lat: 12.2855, lng: 76.6200 },
    description: 'Explore the rhythmic spinning of wheels and traditional terracotta firing techniques.',
    imageUrl: 'https://picsum.photos/seed/pottery/800/600',
    category: 'Workshop',
    tags: ['Sustainable', 'Pottery', 'Interactive']
  },
  {
    id: '5',
    name: 'Old Mysore Agarbatti Co.',
    craft: 'Incense Rolling',
    location: 'K.R. Market Lane',
    coordinates: { lat: 12.3061, lng: 76.6508 },
    description: 'The air here smells like a thousand flowers. Witness the traditional hand-rolling of incense sticks.',
    imageUrl: 'https://picsum.photos/seed/incense/800/600',
    category: 'Artisan',
    tags: ['Fragrance', 'Market', 'Local']
  }
];

export const CATEGORIES = ['All', 'Artisan', 'Hidden Gem', 'Workshop', 'Eatery'];
