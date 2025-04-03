import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// First, define the new sections as components
const SkillsSection = ({ skills }) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Skills</h2>
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillList.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CertificationsSection = ({ certifications }) => {
  if (!certifications?.length) return null;

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Certifications
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="font-bold dark:text-white">{cert.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{cert.issuer}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {cert.issueDate}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Portfolio({ data }) {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={data.basicInfo.profileImage || "/default-avatar.png"}
              alt={data.basicInfo.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            <div>
              <h1 className="text-4xl font-bold">{data.basicInfo.name}</h1>
              <p className="text-xl mt-2">{data.basicInfo.headline}</p>
              <p className="mt-2">{data.basicInfo.location}</p>
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="hover:text-primary-200 transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="#"
                  className="hover:text-primary-200 transition-colors"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="#"
                  className="hover:text-primary-200 transition-colors"
                >
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">About</h2>
        <p className="text-gray-600 dark:text-gray-300">{data.about}</p>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-bold dark:text-white">{exp.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {exp.duration}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Education</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.education.map((edu, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="font-bold dark:text-white">{edu.school}</h3>
              <p className="text-gray-600 dark:text-gray-300">{edu.degree}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {edu.duration}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section - Using the new component */}
      <SkillsSection skills={data.skills} />

      {/* Certifications Section - Using the new component */}
      <CertificationsSection certifications={data.certifications} />
    </div>
  );
}
