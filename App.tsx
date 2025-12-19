
import React, { useState, useEffect } from 'react';
import { AppTab } from './types';
import { MYSORE_ARTISANS, CATEGORIES } from './constants';
import FeedItem from './components/FeedItem';
import MapView from './components/MapView';
// Fixed: Added MapPin to the imports list from lucide-react
import { Home, Map, Users, User, Search, Menu, Bell, Sparkles, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('Feed');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = selectedCategory === 'All' 
    ? MYSORE_ARTISANS 
    : MYSORE_ARTISANS.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-gray-50 border-x border-gray-200 shadow-xl relative overflow-x-hidden">
      {/* Top Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}>
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
          <button className="p-2 -ml-2 text-gray-700">
            <Menu size={20} />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-black tracking-tight text-gray-900">
              MYSORE<span className="text-red-600">HUB</span>
            </h1>
          </div>
          <div className="flex gap-3 text-gray-700">
            <button className="p-2"><Search size={20} /></button>
            <button className="p-2 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        {activeTab === 'Feed' && (
          <div className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-2 bg-white border-b border-gray-100">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                  ? 'bg-gray-900 text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="w-full">
        {activeTab === 'Feed' && (
          <div className="p-0">
            {/* AI Highlight Banner */}
            <div className="bg-gradient-to-r from-orange-400 to-rose-400 p-4 mb-3 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest opacity-90 mb-1">
                  <Sparkles size={12} /> Heritage Daily
                </div>
                <h2 className="font-bold text-sm">Discover "Kala" - The Hidden Soul of Mysore</h2>
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur px-3 py-1 rounded text-xs font-bold transition-colors">
                Read Story
              </button>
            </div>

            {filteredItems.map(item => (
              <FeedItem key={item.id} item={item} />
            ))}
            
            <div className="p-8 text-center text-gray-400 text-sm">
              You're all caught up with the artisans.
            </div>
          </div>
        )}

        {activeTab === 'Map' && <MapView />}

        {activeTab === 'Artisans' && (
          <div className="p-4 grid grid-cols-2 gap-4">
            {MYSORE_ARTISANS.map(item => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img src={item.imageUrl} className="h-32 w-full object-cover" alt={item.name} />
                <div className="p-3">
                  <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{item.craft}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Profile' && (
          <div className="flex flex-col items-center justify-center pt-20 px-10 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg">
              <img src="https://picsum.photos/seed/user/200" alt="Avatar" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Mysore Explorer</h2>
            <p className="text-sm text-gray-500 mb-6 italic">Support local, travel authentic.</p>
            <div className="w-full grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="text-lg font-bold">12</div>
                <div className="text-[10px] text-gray-400 uppercase">Visits</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="text-lg font-bold">5</div>
                <div className="text-[10px] text-gray-400 uppercase">Saves</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="text-lg font-bold">340</div>
                <div className="text-[10px] text-gray-400 uppercase">Points</div>
              </div>
            </div>
            <button className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors">
              Impact Dashboard
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between z-50">
        <button 
          onClick={() => setActiveTab('Feed')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'Feed' ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Home size={22} strokeWidth={activeTab === 'Feed' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Feed</span>
        </button>
        <button 
          onClick={() => setActiveTab('Map')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'Map' ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Map size={22} strokeWidth={activeTab === 'Map' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Map</span>
        </button>
        <button 
          onClick={() => setActiveTab('Artisans')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'Artisans' ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Users size={22} strokeWidth={activeTab === 'Artisans' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Explore</span>
        </button>
        <button 
          onClick={() => setActiveTab('Profile')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'Profile' ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <User size={22} strokeWidth={activeTab === 'Profile' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Me</span>
        </button>
      </nav>

      {/* Floating Action for Map (visible on feed) */}
      {activeTab === 'Feed' && (
        <button 
          onClick={() => setActiveTab('Map')}
          className="fixed bottom-24 right-4 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 md:right-[calc(50%-200px)]"
        >
          <MapPin size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
