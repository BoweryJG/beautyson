import React, { useState } from 'react';
import './MusicEducation.css';

const MusicEducation = () => {
  const [activeTab, setActiveTab] = useState('schools');

  const musicSchools = [
    {
      id: 1,
      name: "Berklee College of Music",
      location: "Boston, MA | Valencia, Spain",
      specialty: "Music Production, Technology & Innovation",
      highlight: "World's first Music Technology & Computation Graduate Program at MIT partnership",
      programs: [
        "Music Production, Technology & Innovation (Master's)",
        "Music Education with Autism Concentration",
        "Electronic Music Production",
        "Music Business & Technology"
      ],
      notableAlumni: [
        "Charlie Puth - Grammy-nominated producer",
        "Matt Schaeffer - Grammy-winning engineer (Kendrick Lamar, SZA)",
        "Quincy Jones - Legendary producer"
      ],
      admissionInfo: {
        acceptance: "50%",
        requirements: "Audition, Portfolio, GPA not strictly required",
        tuition: "$50,000/year"
      },
      innovations: [
        "37 world-class recording studios",
        "AI-powered composition tools",
        "Virtual reality music performance labs",
        "Autism-friendly accessible arts programs"
      ]
    },
    {
      id: 2,
      name: "MIT Music Technology & Computation",
      location: "Cambridge, MA",
      specialty: "AI Music & Advanced Computing",
      highlight: "Brand new 2025 Master's program combining music with cutting-edge AI",
      programs: [
        "Master of Applied Science (MAS) in Music Technology",
        "Music Information Retrieval",
        "AI Composition Systems",
        "Interactive Music Systems"
      ],
      notableAlumni: [
        "Tod Machover - Creator of Guitar Hero technology",
        "Barry Vercoe - Pioneer of computer music"
      ],
      admissionInfo: {
        acceptance: "15%",
        requirements: "Engineering/Music background, Portfolio, Strong Math",
        tuition: "$55,000/year"
      },
      innovations: [
        "AI-powered composition engines",
        "Neural network music generation",
        "Brain-computer music interfaces",
        "Quantum computing for sound synthesis"
      ]
    },
    {
      id: 3,
      name: "Stanford CCRMA",
      location: "Stanford, CA",
      specialty: "Computer Research in Music & Acoustics",
      highlight: "Leading research center since 1970s, pioneering digital music technology",
      programs: [
        "MA in Music, Science & Technology",
        "PhD in Computer Music",
        "Music Cognition & Perception",
        "Digital Audio Signal Processing"
      ],
      notableAlumni: [
        "Max Mathews - Father of computer music",
        "John Chowning - Pioneer of FM synthesis"
      ],
      admissionInfo: {
        acceptance: "20%",
        requirements: "Strong technical background, Music portfolio, Research proposal",
        tuition: "$58,000/year"
      },
      innovations: [
        "Revolutionary FM synthesis technology",
        "Spatial audio research",
        "Machine learning for music analysis",
        "Real-time interactive music systems"
      ]
    },
    {
      id: 4,
      name: "Full Sail University",
      location: "Winter Park, FL",
      specialty: "Music Production & Audio Technology",
      highlight: "Accelerated programs with industry-standard equipment and real-world focus",
      programs: [
        "Music Production Bachelor's",
        "Audio Arts with Music Production",
        "Music Business",
        "Live Sound Engineering"
      ],
      notableAlumni: [
        "Grammy-winning engineers and producers",
        "Major label music executives",
        "Live sound engineers for world tours"
      ],
      admissionInfo: {
        acceptance: "47%",
        requirements: "High school diploma, Portfolio recommended",
        tuition: "$42,000/year"
      },
      innovations: [
        "Project-based learning approach",
        "Industry mentorship programs",
        "Professional studio environments",
        "Real-world client projects"
      ]
    },
    {
      id: 5,
      name: "NYU Steinhardt Music Technology",
      location: "New York, NY",
      specialty: "Music Technology & Interactive Media",
      highlight: "Located in the heart of NYC's music scene with industry connections",
      programs: [
        "Music Technology Master's",
        "PhD in Music Technology",
        "Interactive Media Arts",
        "Music Business & Technology"
      ],
      notableAlumni: [
        "Leading music software developers",
        "Grammy-winning mixing engineers",
        "Music technology entrepreneurs"
      ],
      admissionInfo: {
        acceptance: "35%",
        requirements: "Portfolio, Technical skills demonstration, Interview",
        tuition: "$52,000/year"
      },
      innovations: [
        "Creative experimentation emphasis",
        "Industry partnerships",
        "Music software development",
        "Interactive installation art"
      ]
    }
  ];

  const onlinePlatforms = [
    {
      id: 1,
      name: "Berklee Online",
      description: "World's largest online music education provider",
      features: [
        "75,000+ students from 144 countries",
        "Interactive online courses",
        "Real-time collaboration tools",
        "Industry-standard software training"
      ],
      courses: [
        "Music Production Specialization",
        "Electronic Music Production",
        "Music Business Fundamentals",
        "Songwriting & Composition"
      ]
    },
    {
      id: 2,
      name: "MasterClass Music",
      description: "Learn from legendary artists and producers",
      features: [
        "Celebrity instructor-led courses",
        "High-quality video production",
        "Downloadable resources",
        "Community interaction"
      ],
      courses: [
        "Timbaland's Beatmaking & Production",
        "Deadmau5's Electronic Music",
        "Hans Zimmer's Film Scoring",
        "Alicia Keys' Songwriting"
      ]
    },
    {
      id: 3,
      name: "Coursera Music Programs",
      description: "University-level courses from top institutions",
      features: [
        "Peer collaboration",
        "Certificate programs",
        "Financial aid available",
        "Mobile learning apps"
      ],
      courses: [
        "Music Production Specialization",
        "Music Technology",
        "Audio Engineering",
        "Music Business"
      ]
    },
    {
      id: 4,
      name: "Soundfly",
      description: "Modern music education for the digital age",
      features: [
        "Mentor-guided learning",
        "Industry-focused curriculum",
        "Project-based courses",
        "Artist development programs"
      ],
      courses: [
        "Advanced Ableton Live",
        "Music Theory for Producers",
        "Mixing & Mastering",
        "Artist Branding"
      ]
    }
  ];

  const cuttingEdgeTech = [
    {
      id: 1,
      name: "AI Composition Tools",
      description: "Revolutionary AI platforms transforming music creation",
      tools: [
        "AIVA - AI composer for film & games",
        "Endless AI - Real-time music generation",
        "Boomy - AI-powered song creation",
        "Amper Music - AI music composition"
      ],
      applications: [
        "Automated composition assistance",
        "Real-time accompaniment",
        "Style transfer and remix",
        "Personalized music generation"
      ]
    },
    {
      id: 2,
      name: "Virtual Reality Music Education",
      description: "Immersive learning environments for music education",
      tools: [
        "VR PianoVision - Virtual piano learning",
        "Apple Vision Pro music apps",
        "Oculus Music experiences",
        "Spatial audio composition"
      ],
      applications: [
        "Virtual instrument practice",
        "Immersive music theory",
        "Virtual concert experiences",
        "3D audio mixing"
      ]
    },
    {
      id: 3,
      name: "Machine Learning Analytics",
      description: "Data-driven insights for music education and creation",
      tools: [
        "Music Information Retrieval",
        "Automatic music transcription",
        "Emotion recognition in music",
        "Personalized learning algorithms"
      ],
      applications: [
        "Adaptive learning systems",
        "Performance analysis",
        "Music recommendation engines",
        "Real-time feedback systems"
      ]
    },
    {
      id: 4,
      name: "Autism-Friendly Technology",
      description: "Specialized tools for inclusive music education",
      tools: [
        "Kindermusik Special Needs Kits",
        "Music Together inclusive programs",
        "Sensory-friendly music apps",
        "Adaptive music interfaces"
      ],
      applications: [
        "Sensory regulation through music",
        "Visual music learning aids",
        "Simplified interfaces",
        "Social skill development"
      ]
    }
  ];

  const renderSchools = () => (
    <div className="schools-grid">
      {musicSchools.map(school => (
        <div key={school.id} className="school-card">
          <div className="school-header">
            <h3 className="school-name">{school.name}</h3>
            <div className="school-location">{school.location}</div>
            <div className="school-specialty">{school.specialty}</div>
          </div>
          
          <div className="school-highlight">
            <div className="highlight-badge">🚀 Latest Innovation</div>
            <p>{school.highlight}</p>
          </div>

          <div className="school-section">
            <h4>🎓 Programs</h4>
            <ul>
              {school.programs.map((program, index) => (
                <li key={index}>{program}</li>
              ))}
            </ul>
          </div>

          <div className="school-section">
            <h4>⭐ Notable Alumni</h4>
            <ul>
              {school.notableAlumni.map((alumni, index) => (
                <li key={index}>{alumni}</li>
              ))}
            </ul>
          </div>

          <div className="school-section">
            <h4>📊 Admission Info</h4>
            <div className="admission-stats">
              <div className="stat">
                <span className="stat-label">Acceptance Rate:</span>
                <span className="stat-value">{school.admissionInfo.acceptance}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Requirements:</span>
                <span className="stat-value">{school.admissionInfo.requirements}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Tuition:</span>
                <span className="stat-value">{school.admissionInfo.tuition}</span>
              </div>
            </div>
          </div>

          <div className="school-section">
            <h4>🔬 Innovations</h4>
            <ul>
              {school.innovations.map((innovation, index) => (
                <li key={index}>{innovation}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOnlinePlatforms = () => (
    <div className="platforms-grid">
      {onlinePlatforms.map(platform => (
        <div key={platform.id} className="platform-card">
          <div className="platform-header">
            <h3 className="platform-name">{platform.name}</h3>
            <p className="platform-description">{platform.description}</p>
          </div>

          <div className="platform-section">
            <h4>✨ Features</h4>
            <ul>
              {platform.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="platform-section">
            <h4>🎵 Popular Courses</h4>
            <ul>
              {platform.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTechnology = () => (
    <div className="tech-grid">
      {cuttingEdgeTech.map(tech => (
        <div key={tech.id} className="tech-card">
          <div className="tech-header">
            <h3 className="tech-name">{tech.name}</h3>
            <p className="tech-description">{tech.description}</p>
          </div>

          <div className="tech-section">
            <h4>🛠️ Tools & Platforms</h4>
            <ul>
              {tech.tools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>

          <div className="tech-section">
            <h4>💡 Applications</h4>
            <ul>
              {tech.applications.map((app, index) => (
                <li key={index}>{app}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  const renderInspiration = () => (
    <div className="inspiration-section">
      <div className="inspiration-card">
        <h3>🎯 Your Path to Musical Excellence</h3>
        <p>
          Hey Beau! The world of music education is evolving faster than ever. With AI composition tools, 
          virtual reality learning environments, and programs specifically designed for different learning styles 
          (including autism-friendly approaches), there's never been a better time to dive deep into music technology.
        </p>
        
        <div className="path-suggestions">
          <h4>🚀 Recommended Path for You:</h4>
          <ol>
            <li>
              <strong>Start with Online Exploration:</strong> Try MasterClass or Berklee Online courses 
              to explore different aspects of music production and technology.
            </li>
            <li>
              <strong>Build Your Portfolio:</strong> Create projects using AI tools like AIVA or Boomy 
              to understand how technology can enhance your classical music passion.
            </li>
            <li>
              <strong>Consider Summer Programs:</strong> Look into Berklee's summer programs or 
              Full Sail's teen camps to get hands-on experience.
            </li>
            <li>
              <strong>Plan for Higher Education:</strong> Consider programs like MIT's new Music Technology 
              program or Berklee's specialized tracks that combine your interests.
            </li>
          </ol>
        </div>

        <div className="motivation-quote">
          <blockquote>
            "Music is the universal language of mankind, and technology is making it more accessible 
            and expressive than ever before. Your generation will be the first to truly harness AI, 
            VR, and advanced computing to create music that previous generations could only dream of."
          </blockquote>
        </div>

        <div className="next-steps">
          <h4>🎼 Next Steps:</h4>
          <ul>
            <li>Research virtual reality music apps for your interests</li>
            <li>Experiment with AI composition tools to enhance your classical compositions</li>
            <li>Connect with autism-friendly music programs in your area</li>
            <li>Start building a digital portfolio of your musical projects</li>
            <li>Consider learning programming languages used in music technology (Python, Max/MSP)</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="music-education">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">🎓 Music Education & Technology</h2>
          <p className="section-description">
            Discover cutting-edge music education programs, innovative technology, and your path to musical excellence
          </p>
        </div>

        <div className="education-tabs">
          <button 
            className={`tab-button ${activeTab === 'schools' ? 'active' : ''}`}
            onClick={() => setActiveTab('schools')}
          >
            🏫 Top Schools
          </button>
          <button 
            className={`tab-button ${activeTab === 'online' ? 'active' : ''}`}
            onClick={() => setActiveTab('online')}
          >
            💻 Online Platforms
          </button>
          <button 
            className={`tab-button ${activeTab === 'technology' ? 'active' : ''}`}
            onClick={() => setActiveTab('technology')}
          >
            🔬 Cutting-Edge Tech
          </button>
          <button 
            className={`tab-button ${activeTab === 'inspiration' ? 'active' : ''}`}
            onClick={() => setActiveTab('inspiration')}
          >
            🌟 Your Path
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'schools' && renderSchools()}
          {activeTab === 'online' && renderOnlinePlatforms()}
          {activeTab === 'technology' && renderTechnology()}
          {activeTab === 'inspiration' && renderInspiration()}
        </div>
      </div>
    </div>
  );
};

export default MusicEducation;