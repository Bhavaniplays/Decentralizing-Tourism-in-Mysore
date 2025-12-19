
import React, { useState, useEffect } from 'react';
import { Artisan } from '../types';
import { Heart, Share2, MapPin, Sparkles } from 'lucide-react';
import { getArtisanStory } from '../services/geminiService';

interface FeedItemProps {
  item: Artisan;
}

const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [aiStory, setAiStory] = useState<string>('');
  const [loadingStory, setLoadingStory] = useState(false);

  const fetchStory = async () => {
    setLoadingStory(true);
    const story = await getArtisanStory(item.name, item.craft);
    setAiStory(story || '');
    setLoadingStory(false);
  };

  useEffect(() => {
    // Optional: fetch on mount or wait for user action
    // fetchStory();
  }, []);

  return (
    <div className="bg-white mb-3 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded uppercase tracking-wider">
            {item.category}
          </span>
          <span className="text-gray-400 text-xs">•</span>
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <MapPin size={12} /> {item.location}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">
          {item.name}: {item.craft}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>

        {aiStory ? (
          <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100 italic text-purple-800 text-sm">
            <Sparkles size={14} className="inline mr-1 mb-1 text-purple-500" />
            {aiStory}
          </div>
        ) : (
          <button 
            onClick={fetchStory}
            disabled={loadingStory}
            className="mb-4 text-xs font-medium text-purple-600 flex items-center gap-1 hover:text-purple-800 transition-colors"
          >
            <Sparkles size={14} /> 
            {loadingStory ? 'Generating heritage story...' : 'Get AI Story'}
          </button>
        )}

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex gap-4">
            <button 
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span className="text-xs font-medium">Save</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500">
              <Share2 size={20} />
              <span className="text-xs font-medium">Share</span>
            </button>
          </div>
          <div className="flex gap-1">
            {item.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
