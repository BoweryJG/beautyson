import React, { useState } from 'react';
import './ProfessionalConnect.css';

const ProfessionalConnect = () => {
  const [activeTab, setActiveTab] = useState('internships');

  const internshipPrograms = [
    {
      id: 1,
      title: 'GRAMMY Camp',
      organization: 'GRAMMY Museum',
      location: 'New York',
      ageRange: '14-18',
      duration: '7 days',
      dates: 'July 27 - August 2, 2025',
      description: 'Seven-day non-residential music industry program featuring workshops, clinics, panels, and master classes with top industry professionals.',
      focus: ['Music Industry', 'Recording', 'Performance', 'Media Production'],
      applicationDeadline: 'March 15, 2025',
      website: 'https://grammymuseum.org/education/grammy-camp/',
      cost: '$1,200',
      highlights: ['Forum discussions with industry pros', 'Recording projects', 'Performance opportunities']
    },
    {
      id: 2,
      title: 'Music Production Boot Camp',
      organization: 'Music for All',
      location: 'Various locations',
      ageRange: '14-18',
      duration: '1 week',
      dates: 'Multiple sessions summer 2025',
      description: 'Immersive music production experience with award-winning recording engineers and producers in state-of-the-art facilities.',
      focus: ['Audio Production', 'Studio Recording', 'Music Technology', 'Sound Engineering'],
      applicationDeadline: 'April 1, 2025',
      website: 'https://camp.musicforall.org/musicproduction/',
      cost: '$800-$1,500',
      highlights: ['Professional studio access', 'Award-winning mentors', 'Hands-on production']
    },
    {
      id: 3,
      title: 'Youth Summer Music Production Program',
      organization: '343 Labs',
      location: 'New York City',
      ageRange: '11-17',
      duration: '3 weeks',
      dates: 'June - August 2025',
      description: 'NYC premier music technology summer camp focusing on electronic music production, collaboration, and live performance.',
      focus: ['Electronic Music', 'Music Technology', 'Live Performance', 'Collaboration'],
      applicationDeadline: 'Rolling admissions',
      website: 'https://www.343labs.com/youth-summer-program-nyc/',
      cost: '$1,800',
      highlights: ['Latest technology', 'Peer collaboration', 'Live performance opportunities']
    },
    {
      id: 4,
      title: 'Interlochen Music Production & Engineering',
      organization: 'Interlochen Arts Camp',
      location: 'Michigan',
      ageRange: '13-18',
      duration: '2-6 weeks',
      dates: 'June - August 2025',
      description: 'Master the fundamentals of professional music studio production and engineering with industry-standard equipment.',
      focus: ['Studio Engineering', 'Audio Production', 'Music Technology', 'Live Sound'],
      applicationDeadline: 'February 1, 2025',
      website: 'https://www.interlochen.org/music/camp-programs/high-school/music-production-engineering',
      cost: '$2,500-$6,000',
      highlights: ['Professional studio', 'Industry equipment', 'Various program lengths']
    },
    {
      id: 5,
      title: 'Full Sail Music & Audio Summer Camp',
      organization: 'Full Sail University',
      location: 'Florida',
      ageRange: '13-18',
      duration: '1 week',
      dates: 'Multiple sessions 2025',
      description: 'Learn music production fundamentals with Ableton Live, the software used by award-winning artists worldwide.',
      focus: ['Ableton Live', 'Music Production', 'Audio Technology', 'Creative Process'],
      applicationDeadline: 'Rolling admissions',
      website: 'https://www.fullsaillabs.com/music-production-teens-2025',
      cost: '$1,200',
      highlights: ['Industry software', 'Creative innovation', 'Professional guidance']
    }
  ];

  const youthPrograms = [
    {
      id: 1,
      title: 'Spotify Open Doors Fund',
      organization: 'Spotify & Youth Music',
      type: 'Funding Program',
      ageRange: '13-25',
      description: 'Investment program for youth music spaces and emerging artists, supporting the next generation of music creators.',
      focus: ['Artist Development', 'Music Spaces', 'Community Building', 'Industry Access'],
      applicationPeriod: 'Open applications',
      website: 'https://www.youthmusic.org.uk/',
      benefits: ['Funding support', 'Industry connections', 'Mentorship access']
    },
    {
      id: 2,
      title: 'Apple Music for Artists',
      organization: 'Apple Inc.',
      type: 'Resource Platform',
      ageRange: 'All ages',
      description: 'Comprehensive resources for recording, releasing, and promoting music, plus analytics for understanding your audience.',
      focus: ['Music Distribution', 'Analytics', 'Promotion', 'Industry Education'],
      applicationPeriod: 'Always open',
      website: 'https://artists.apple.com/',
      benefits: ['Free resources', 'Industry insights', 'Promotion tools']
    },
    {
      id: 3,
      title: 'AMP Youth Programs',
      organization: 'AMP Music Lab',
      type: 'Educational Initiative',
      ageRange: '13-18',
      description: 'STEM-focused music programs fostering the intersection of technology and creativity for young producers.',
      focus: ['Music Technology', 'STEM Education', 'Creative Development', 'Career Pathways'],
      applicationPeriod: 'Seasonal programs',
      website: 'https://www.ampmusiclab.com/youth-programs/',
      benefits: ['STEM integration', 'Technology focus', 'Career preparation']
    },
    {
      id: 4,
      title: 'J Dilla Music Tech Grant',
      organization: 'Music Industry Organizations',
      type: 'Grant Program',
      ageRange: '16-25',
      description: 'Supporting career pathways in music technology with focus on underrepresented communities.',
      focus: ['Music Technology', 'Career Development', 'Diversity', 'Professional Skills'],
      applicationPeriod: 'Annual applications',
      website: 'Contact music industry organizations',
      benefits: ['Financial support', 'Career guidance', 'Industry access']
    }
  ];

  const mentorshipPrograms = [
    {
      id: 1,
      title: 'Mix Major Mentorship Program',
      organization: 'Mix Major',
      type: 'Online Mentorship',
      ageRange: '13-18',
      description: 'Weekly live online classes with industry professionals, combining group lessons with individual project work.',
      focus: ['Music Production', 'Industry Skills', 'Project Development', 'Professional Growth'],
      format: 'Weekly online sessions',
      website: 'https://www.mix-major.com/mentorship-program',
      benefits: ['Live instruction', 'Industry events', 'Community access']
    },
    {
      id: 2,
      title: 'American Music Mentorship Program',
      organization: 'U.S. Department of State & Recording Academy',
      type: 'International Program',
      ageRange: '18-25',
      description: 'Global mentorship program connecting emerging artists with established professionals worldwide.',
      focus: ['International Connections', 'Cultural Exchange', 'Professional Development', 'Global Opportunities'],
      format: 'Virtual and in-person',
      website: 'https://www.recordingacademy.com/',
      benefits: ['Global network', 'Cultural exchange', 'Professional connections']
    },
    {
      id: 3,
      title: 'A2IM Mentor Program',
      organization: 'American Association of Independent Music',
      type: 'Industry Mentorship',
      ageRange: '16+',
      description: 'Pairing emerging professionals with industry veterans across all stages of their careers.',
      focus: ['Independent Music', 'Industry Growth', 'Career Development', 'Professional Network'],
      format: 'One-on-one mentoring',
      website: 'https://a2im.org/initiatives/a2im-mentor-program/',
      benefits: ['Industry veteran guidance', 'Career support', 'Professional network']
    },
    {
      id: 4,
      title: 'Soundfly Music Mentors',
      organization: 'Soundfly',
      type: 'Online Mentorship',
      ageRange: 'All ages',
      description: 'Dedicated music mentors providing personalized guidance to help develop your unique musical voice.',
      focus: ['Creative Development', 'Musical Voice', 'Personalized Learning', 'Skill Building'],
      format: 'Online mentoring',
      website: 'https://soundfly.com/mentors',
      benefits: ['Personalized guidance', 'Creative support', 'Skill development']
    }
  ];

  const careerPathways = [
    {
      id: 1,
      category: 'Music Production',
      roles: [
        'Music Producer',
        'Recording Engineer',
        'Mix Engineer',
        'Mastering Engineer',
        'Studio Manager'
      ],
      education: ['Music Production Degree', 'Audio Engineering Certificate', 'Self-taught with portfolio'],
      skills: ['Pro Tools', 'Logic Pro', 'Ableton Live', 'Audio Theory', 'Creative Vision'],
      averageSalary: '$45,000 - $150,000+',
      growth: 'High demand with streaming growth'
    },
    {
      id: 2,
      category: 'Music Technology',
      roles: [
        'Audio Software Developer',
        'Music App Developer',
        'Sound Designer',
        'DSP Engineer',
        'Music Technology Researcher'
      ],
      education: ['Computer Science', 'Music Technology', 'Audio Engineering', 'Mathematics'],
      skills: ['Programming', 'DSP', 'Audio Algorithms', 'User Interface Design', 'Music Theory'],
      averageSalary: '$70,000 - $180,000+',
      growth: 'Rapidly expanding field'
    },
    {
      id: 3,
      category: 'Music Business',
      roles: [
        'A&R Representative',
        'Music Marketing Manager',
        'Rights & Licensing Specialist',
        'Music Supervisor',
        'Artist Manager'
      ],
      education: ['Music Business', 'Marketing', 'Communications', 'Law'],
      skills: ['Industry Knowledge', 'Networking', 'Marketing', 'Legal Understanding', 'Communication'],
      averageSalary: '$40,000 - $120,000+',
      growth: 'Stable with digital transformation'
    },
    {
      id: 4,
      category: 'Emerging Fields',
      roles: [
        'Music Data Analyst',
        'VR/AR Music Developer',
        'AI Music Researcher',
        'Blockchain Music Specialist',
        'Music Therapist'
      ],
      education: ['Data Science', 'Computer Science', 'Psychology', 'Music Therapy'],
      skills: ['Data Analysis', 'Emerging Technology', 'Research', 'Innovation', 'Adaptability'],
      averageSalary: '$55,000 - $200,000+',
      growth: 'Explosive growth potential'
    }
  ];

  const onlineResources = [
    {
      id: 1,
      title: 'Young Producer Discord Communities',
      type: 'Community Platform',
      description: 'Active communities of young music producers sharing knowledge, collaborating, and supporting each other.',
      focus: ['Peer Learning', 'Collaboration', 'Resource Sharing', 'Networking'],
      access: 'Free',
      ageRecommendation: '13-25'
    },
    {
      id: 2,
      title: 'BeatStars Young Producer Hub',
      type: 'Platform & Community',
      description: 'Platform for young producers to sell beats, connect with artists, and build their professional network.',
      focus: ['Beat Sales', 'Artist Connections', 'Revenue Generation', 'Professional Development'],
      access: 'Free/Premium tiers',
      ageRecommendation: '13+'
    },
    {
      id: 3,
      title: 'YouTube Music Production Channels',
      type: 'Educational Content',
      description: 'Curated list of educational channels specifically focused on music production for young creators.',
      focus: ['Tutorials', 'Industry Insights', 'Tool Reviews', 'Career Guidance'],
      access: 'Free',
      ageRecommendation: 'All ages'
    },
    {
      id: 4,
      title: 'LinkedIn Music Industry Groups',
      type: 'Professional Network',
      description: 'Professional networking groups focused on music industry connections and career development.',
      focus: ['Professional Networking', 'Industry Updates', 'Job Opportunities', 'Mentorship'],
      access: 'Free',
      ageRecommendation: '16+ (LinkedIn minimum age)'
    }
  ];

  const renderInternships = () => (
    <div className="programs-grid">
      {internshipPrograms.map(program => (
        <div key={program.id} className="program-card">
          <div className="program-header">
            <h3>{program.title}</h3>
            <div className="program-badge">{program.organization}</div>
          </div>
          <div className="program-details">
            <div className="program-meta">
              <span className="meta-item">
                <span className="meta-label">Ages:</span> {program.ageRange}
              </span>
              <span className="meta-item">
                <span className="meta-label">Duration:</span> {program.duration}
              </span>
              <span className="meta-item">
                <span className="meta-label">Location:</span> {program.location}
              </span>
            </div>
            <p className="program-description">{program.description}</p>
            <div className="program-focus">
              <h4>Focus Areas:</h4>
              <div className="focus-tags">
                {program.focus.map((area, index) => (
                  <span key={index} className="focus-tag">{area}</span>
                ))}
              </div>
            </div>
            <div className="program-highlights">
              <h4>Highlights:</h4>
              <ul>
                {program.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="program-logistics">
              <div className="logistics-item">
                <strong>Dates:</strong> {program.dates}
              </div>
              <div className="logistics-item">
                <strong>Application Deadline:</strong> {program.applicationDeadline}
              </div>
              <div className="logistics-item">
                <strong>Cost:</strong> {program.cost}
              </div>
            </div>
          </div>
          <div className="program-footer">
            <a href={program.website} target="_blank" rel="noopener noreferrer" className="program-link">
              Learn More & Apply
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  const renderYouthPrograms = () => (
    <div className="programs-grid">
      {youthPrograms.map(program => (
        <div key={program.id} className="program-card">
          <div className="program-header">
            <h3>{program.title}</h3>
            <div className="program-badge">{program.type}</div>
          </div>
          <div className="program-details">
            <div className="program-meta">
              <span className="meta-item">
                <span className="meta-label">Ages:</span> {program.ageRange}
              </span>
              <span className="meta-item">
                <span className="meta-label">Organization:</span> {program.organization}
              </span>
            </div>
            <p className="program-description">{program.description}</p>
            <div className="program-focus">
              <h4>Focus Areas:</h4>
              <div className="focus-tags">
                {program.focus.map((area, index) => (
                  <span key={index} className="focus-tag">{area}</span>
                ))}
              </div>
            </div>
            <div className="program-highlights">
              <h4>Benefits:</h4>
              <ul>
                {program.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="program-logistics">
              <div className="logistics-item">
                <strong>Application Period:</strong> {program.applicationPeriod}
              </div>
            </div>
          </div>
          <div className="program-footer">
            <a href={program.website} target="_blank" rel="noopener noreferrer" className="program-link">
              Explore Program
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMentorship = () => (
    <div className="programs-grid">
      {mentorshipPrograms.map(program => (
        <div key={program.id} className="program-card">
          <div className="program-header">
            <h3>{program.title}</h3>
            <div className="program-badge">{program.type}</div>
          </div>
          <div className="program-details">
            <div className="program-meta">
              <span className="meta-item">
                <span className="meta-label">Ages:</span> {program.ageRange}
              </span>
              <span className="meta-item">
                <span className="meta-label">Format:</span> {program.format}
              </span>
            </div>
            <p className="program-description">{program.description}</p>
            <div className="program-focus">
              <h4>Focus Areas:</h4>
              <div className="focus-tags">
                {program.focus.map((area, index) => (
                  <span key={index} className="focus-tag">{area}</span>
                ))}
              </div>
            </div>
            <div className="program-highlights">
              <h4>Benefits:</h4>
              <ul>
                {program.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="program-footer">
            <a href={program.website} target="_blank" rel="noopener noreferrer" className="program-link">
              Apply for Mentorship
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCareerPathways = () => (
    <div className="career-pathways">
      {careerPathways.map(pathway => (
        <div key={pathway.id} className="pathway-card">
          <div className="pathway-header">
            <h3>{pathway.category}</h3>
            <div className="growth-indicator">{pathway.growth}</div>
          </div>
          <div className="pathway-content">
            <div className="pathway-section">
              <h4>Career Roles</h4>
              <ul className="roles-list">
                {pathway.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </div>
            <div className="pathway-section">
              <h4>Education Pathways</h4>
              <ul className="education-list">
                {pathway.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </div>
            <div className="pathway-section">
              <h4>Key Skills</h4>
              <div className="skills-tags">
                {pathway.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="pathway-section">
              <h4>Salary Range</h4>
              <div className="salary-range">{pathway.averageSalary}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOnlineResources = () => (
    <div className="resources-grid">
      {onlineResources.map(resource => (
        <div key={resource.id} className="resource-card">
          <div className="resource-header">
            <h3>{resource.title}</h3>
            <div className="resource-badge">{resource.type}</div>
          </div>
          <div className="resource-details">
            <div className="resource-meta">
              <span className="meta-item">
                <span className="meta-label">Access:</span> {resource.access}
              </span>
              <span className="meta-item">
                <span className="meta-label">Age:</span> {resource.ageRecommendation}
              </span>
            </div>
            <p className="resource-description">{resource.description}</p>
            <div className="resource-focus">
              <h4>Focus Areas:</h4>
              <div className="focus-tags">
                {resource.focus.map((area, index) => (
                  <span key={index} className="focus-tag">{area}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'internships', label: 'Summer Internships', icon: '🎯' },
    { id: 'youth', label: 'Youth Programs', icon: '🚀' },
    { id: 'mentorship', label: 'Mentorship', icon: '👥' },
    { id: 'careers', label: 'Career Pathways', icon: '📈' },
    { id: 'online', label: 'Online Resources', icon: '🌐' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'internships':
        return renderInternships();
      case 'youth':
        return renderYouthPrograms();
      case 'mentorship':
        return renderMentorship();
      case 'careers':
        return renderCareerPathways();
      case 'online':
        return renderOnlineResources();
      default:
        return renderInternships();
    }
  };

  return (
    <div className="professional-connect">
      <div className="connect-header">
        <h2>Professional Music Connections</h2>
        <p>Launch your music career with real industry opportunities</p>
      </div>

      <div className="connect-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="connect-content">
        {renderActiveTab()}
      </div>

      <div className="connect-footer">
        <div className="success-tips">
          <h3>Success Tips for Young Producers</h3>
          <ul>
            <li>Build a strong portfolio showcasing your best work</li>
            <li>Network actively but authentically with industry professionals</li>
            <li>Stay current with music technology and industry trends</li>
            <li>Develop both technical skills and creative vision</li>
            <li>Be persistent but professional in your approach</li>
            <li>Consider the business side of music, not just the creative</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalConnect;