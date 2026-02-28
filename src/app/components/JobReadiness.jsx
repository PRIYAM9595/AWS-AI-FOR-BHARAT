import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const readinessMetrics = [
  { label: 'Technical Skills', score: 78, color: 'blue' },
  { label: 'System Design', score: 52, color: 'purple' },
  { label: 'Communication', score: 85, color: 'green' },
  { label: 'Leadership', score: 65, color: 'orange' },
];

const jobMatches = [
  { title: 'Senior Frontend Developer', company: 'TechCorp', match: 92, salary: '$120K - $150K' },
  { title: 'Full Stack Engineer', company: 'StartupXYZ', match: 85, salary: '$110K - $140K' },
  { title: 'React Developer', company: 'Innovation Labs', match: 88, salary: '$100K - $130K' },
];

export function JobReadiness() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Card */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Job Readiness Score</h2>
          <p className="text-gray-600 mt-2">How ready are you for your target roles?</p>
        </div>

        {/* Overall score */}
        <div className="mb-12">
          <div className="flex justify-center items-center">
            {/* Background circle */}
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">70%</div>
                <div className="text-gray-600">Ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics breakdown */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Skills Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readinessMetrics.map((metric) => (
              <div key={metric.label} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">{metric.label}</span>
                  <span className="text-lg font-bold text-gray-900">{metric.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`bg-${metric.color}-500 h-2 rounded-full`} style={{ width: `${metric.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job matches */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Top Job Matches</h3>
          <div className="space-y-4">
            {jobMatches.map((job) => (
              <motion.div
                key={job.title}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 hover:shadow-md transition"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-gray-600 text-sm">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{job.match}% Match</div>
                    <p className="text-gray-600 text-sm">{job.salary}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition">
            <Briefcase className="inline mr-2" size={20} />
            Apply to Matched Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
