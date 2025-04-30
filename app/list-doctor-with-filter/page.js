'use client'
import { useEffect, useState } from 'react';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [degreeFilter, setDegreeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [educationFilter, setEducationFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors');
        if (!response.ok) throw new Error('Failed to fetch doctors');
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let result = [...doctors];

    if (degreeFilter) result = result.filter(doc => doc.degree === degreeFilter);
    if (experienceFilter) result = result.filter(doc => doc.experience >= parseInt(experienceFilter));
    if (educationFilter) result = result.filter(doc => doc.education === educationFilter);
    if (countryFilter) result = result.filter(doc => doc.country === countryFilter);

    setFilteredDoctors(result);
  }, [degreeFilter, experienceFilter, educationFilter, countryFilter, doctors]);

  const getUniqueValues = (key) => [...new Set(doctors.map(doc => doc[key]))];

  if (loading) return <p className="text-black">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className='flex items-center justify-center'>
    <div className="p-6 bg-blue-500 text-black">
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

<select className='mx-3 border p-2 text-black' value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)} >
  <option className='mx-5' value="">Min Experience</option>
  {getUniqueValues('experience').sort((a, b) => a - b).map((exp, index) => (
    <option key={`experience-${index}`} value={exp}>{exp}+</option>
  ))}
</select>

<select value={educationFilter} onChange={(e) => setEducationFilter(e.target.value)} className="border p-2 text-black">
  <option value="">All Education</option>
  {getUniqueValues('education').map((edu, index) => (
    <option key={`education-${index}`} value={edu}>{edu}</option>
  ))}
</select>

<select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="border p-2 text-black">
  <option value="">All Countries</option>
  {getUniqueValues('country').map((c, index) => (
    <option key={`country-${index}`} value={c}>{c}</option>
  ))}
</select>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.length === 0 ? (
          <p className="text-black">No doctors found matching your criteria.</p>
        ) : (
          filteredDoctors.map(doc => (
            <div key={doc._id} className="p-4 border rounded shadow text-black bg-white">
              <h2 className="text-xl font-semibold">{doc.name}</h2>
              <p>Experience: {doc.experience} years</p>
              <p>Degree:{doc.education}</p>
              <p>Country: {doc.country}</p>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default DoctorList;
