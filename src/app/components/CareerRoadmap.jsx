import { CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';

const roadmapSteps = [
  {
    title: 'Master TypeScript Advanced Patterns',
    status: 'completed',
    duration: '2 weeks',
    skills: ['Generics', 'Utility Types', 'Decorators'],
    resources: 3,
  },
  {
    title: 'Build Full-Stack Project with Node.js',
    status: 'in-progress',
    duration: '4 weeks',
    skills: ['Express', 'PostgreSQL', 'Authentication'],
    resources: 5,
    progress: 65,
  },
  {
    title: 'Learn System Design Fundamentals',
    status: 'upcoming',
    duration: '6 weeks',
    skills: ['Scalability', 'Load Balancing', 'Caching'],
    resources: 8,
  },
  {
    title: 'AWS Certification Prep',
    status: 'upcoming',
    duration: '8 weeks',
    skills: ['EC2', 'S3', 'Lambda', 'RDS'],
    resources: 12,
  },
];

export function CareerRoadmap() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">AI-Generated Career Roadmap</h2>
          <p className="text-gray-600 mt-2">Personalized learning path to Senior Developer</p>
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-4">AI Optimized</span>
        </div>

        <div className="space-y-6">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="relative">
              {index < roadmapSteps.length - 1 && (
                <div className="absolute left-6 top-16 w-1 h-12 bg-gray-300" />
              )}

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  ) : step.status === 'in-progress' ? (
                    <Clock className="w-12 h-12 text-blue-500" />
                  ) : (
                    <Circle className="w-12 h-12 text-gray-400" />
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.duration}</p>

                  {step.status === 'in-progress' && step.progress && (
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{step.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${step.progress}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-3">
                    {step.skills.map((skill) => (
                      <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 mt-3">{step.resources} curated resources</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition">
          View Full Roadmap
        </button>
      </div>
    </div>
  );
}
