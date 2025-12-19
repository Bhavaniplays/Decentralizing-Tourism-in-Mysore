
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Artisan } from '../types';
import { MYSORE_ARTISANS } from '../constants';
import { Info, MapPin } from 'lucide-react';

const MapView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('background', '#e5e7eb');

    svg.selectAll('*').remove();

    // Mock "Map" Grid
    const g = svg.append('g');

    // Drawing some streets/blocks for aesthetic
    for(let i=0; i<width; i+=100) {
      g.append('line').attr('x1', i).attr('y1', 0).attr('x2', i).attr('y2', height).attr('stroke', '#d1d5db').attr('stroke-width', 0.5);
    }
    for(let i=0; i<height; i+=100) {
      g.append('line').attr('x1', 0).attr('y1', i).attr('x2', width).attr('y2', i).attr('stroke', '#d1d5db').attr('stroke-width', 0.5);
    }

    // Centering the view around a mock center of Mysore
    const projection = d3.geoMercator()
      .center([76.65, 12.30])
      .scale(250000)
      .translate([width / 2, height / 2]);

    // Plotting Artisans
    MYSORE_ARTISANS.forEach((artisan) => {
      const [x, y] = projection([artisan.coordinates.lng, artisan.coordinates.lat]) || [0,0];
      
      const marker = g.append('g')
        .attr('class', 'cursor-pointer transition-transform duration-300 hover:scale-125')
        .on('click', () => setSelectedArtisan(artisan));

      marker.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 10)
        .attr('fill', '#ef4444')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

      marker.append('text')
        .attr('x', x + 15)
        .attr('y', y + 5)
        .text(artisan.name)
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .attr('fill', '#1f2937')
        .attr('style', 'pointer-events: none;');
    });

  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-140px)] bg-gray-100">
      <div className="absolute top-4 left-4 right-4 z-10 bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <MapPin size={16} className="text-red-500" /> Artisan Trail Explorer
        </h2>
        <p className="text-[10px] text-gray-500">Discover Mysore's treasures geographically. Tap a red marker.</p>
      </div>

      <div className="w-full h-full overflow-hidden">
        <svg ref={svgRef} className="w-full h-full"></svg>
      </div>

      {selectedArtisan && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-in slide-in-from-bottom-full duration-300">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{selectedArtisan.category}</span>
              <h3 className="font-bold text-gray-900">{selectedArtisan.name}</h3>
            </div>
            <button onClick={() => setSelectedArtisan(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{selectedArtisan.description}</p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors">
              Get Directions
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-gray-50">
              <Info size={14} /> Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
