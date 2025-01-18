'use client';

import { useState } from 'react';

export default function Home() {
  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setResume(event.target.files[0]);
    }
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!resume || !skills) return;

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('skills', skills);

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error('Error submitting resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl space-y-8 transform transition hover:scale-105 duration-500">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 drop-shadow-lg">CV Evaluator</h1>
        <p className="text-center text-lg text-gray-600">Upload your resume and list required skills to get an evaluation!</p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="resume" className="block text-lg font-medium text-gray-800">Upload Resume (PDF):</label>
            <input
              type="file"
              id="resume"
              onChange={handleFileChange}
              accept=".pdf"
              required
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="skills" className="block text-lg font-medium text-gray-800">Required Skills (comma-separated):</label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={handleSkillsChange}
              required
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 text-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-700 to-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
          >
            {loading ? 'Evaluating...' : 'Evaluate'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 text-center">Evaluation Result</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mt-6">
              <p className="text-lg">
                <span className="font-semibold text-gray-900">Name:</span> {result.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-900">Experience:</span> {result.experience} years
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-900">Graduation Year:</span> {result.graduation_year}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-900">Criteria Match:</span> {result.criteria_match}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
