import { Youtube, BookOpen, Code2, ExternalLink, Clock, Star } from 'lucide-react';

const resources = [
  {
    title: 'Advanced JavaScript Patterns',
    type: 'youtube',
    author: 'Matt Pocock',
    duration: '2h 15m',
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
  },
  {
    title: 'Node.js Microservices Architecture',
    type: 'course',
    author: 'Udemy',
    duration: '12h 30m',
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
  },
  {
    title: 'Build a Real-time Chat App',
    type: 'project',
    author: 'GitHub',
    duration: '4h',
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
  },
];

const typeConfig = {
  youtube: { icon: Youtube, color: 'red', label: 'Video' },
  course: { icon: BookOpen, color: 'blue', label: 'Course' },
  project: { icon: Code2, color: 'green', label: 'Project' },
};

export function LearningResources() {
  return (
    <div className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">
            Recommended Resources
          </h2>
          <p className="text-slate-400 mb-6">
            Curated for your learning path
          </p>
          <button className="text-blue-400 hover:text-blue-300">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource) => {
            const config = typeConfig[resource.type];
            const Icon = config.icon;

            return (
              <div key={resource.title} className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-750 transition-colors">
                {/* Thumbnail */}
                <img src={resource.thumbnail} alt={resource.title} className="w-full h-40 object-cover" />

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {resource.title}
                  </h3>

                  <p className="text-sm text-slate-400 mb-3">
                    {resource.author}
                  </p>

                  <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {resource.duration}
                    </span>

                    <span className="flex items-center gap-1">
                      <Star size={16} fill="currentColor" />
                      {resource.rating}
                    </span>
                  </div>

                  <span className="inline-block px-3 py-1 bg-slate-700 text-xs font-medium text-white rounded">
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            Explore More Resources
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
