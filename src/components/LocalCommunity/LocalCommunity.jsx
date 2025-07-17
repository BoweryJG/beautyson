import React, { useState } from 'react';
import './LocalCommunity.css';

const LocalCommunity = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const localOpportunities = [
    {
      id: 1,
      title: "Music Together of the Lowcountry",
      category: "lessons",
      ageGroup: "0-5 years",
      location: "Hilton Head & Bluffton",
      description: "Parent-child music classes with singing, dancing, and instruments",
      contact: "musictogetherofthelowcountry.yourvirtuoso.com",
      type: "ongoing"
    },
    {
      id: 2,
      title: "Hilton Head Youth Orchestra",
      category: "ensemble",
      ageGroup: "8-18 years",
      location: "Hilton Head Island",
      description: "Orchestra program for young musicians of all skill levels",
      contact: "Contact local music stores for info",
      type: "seasonal"
    },
    {
      id: 3,
      title: "Summer Music Camps",
      category: "camps",
      ageGroup: "6-16 years",
      location: "Sea Pines Resort",
      description: "Week-long music camps with performance opportunities",
      contact: "Check Sea Pines activities",
      type: "summer"
    },
    {
      id: 4,
      title: "Bluffton Community Music Group",
      category: "community",
      ageGroup: "All ages",
      location: "Bluffton",
      description: "Informal music gatherings and jam sessions",
      contact: "Community bulletin boards",
      type: "weekly"
    },
    {
      id: 5,
      title: "Kids Open Mic Night",
      category: "performance",
      ageGroup: "5-17 years",
      location: "Local restaurants with live music",
      description: "Monthly showcase for young performers",
      contact: "Family-friendly venues",
      type: "monthly"
    }
  ];

  const musicBuddyRequests = [
    {
      id: 1,
      name: "Alex (12)",
      instrument: "Piano",
      interests: "Classical, Video Game Music",
      location: "Hilton Head",
      lookingFor: "Piano duet partner or composition buddy"
    },
    {
      id: 2,
      name: "Sam (10)",
      instrument: "Guitar",
      interests: "Rock, Folk",
      location: "Bluffton",
      lookingFor: "Band members for kid-friendly rock group"
    },
    {
      id: 3,
      name: "Maya (14)",
      instrument: "Violin",
      interests: "Celtic, Pop",
      location: "Sea Pines",
      lookingFor: "String quartet or folk ensemble"
    }
  ];

  const filteredOpportunities = selectedCategory === 'all' 
    ? localOpportunities 
    : localOpportunities.filter(opp => opp.category === selectedCategory);

  return (
    <div className="local-community">
      <div className="community-header">
        <h2>🌴 Hilton Head Music Community</h2>
        <p>Connect with local young musicians and find opportunities to make music together!</p>
      </div>

      <div className="category-filters">
        <button 
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        <button 
          className={selectedCategory === 'lessons' ? 'active' : ''}
          onClick={() => setSelectedCategory('lessons')}
        >
          Lessons
        </button>
        <button 
          className={selectedCategory === 'ensemble' ? 'active' : ''}
          onClick={() => setSelectedCategory('ensemble')}
        >
          Ensembles
        </button>
        <button 
          className={selectedCategory === 'camps' ? 'active' : ''}
          onClick={() => setSelectedCategory('camps')}
        >
          Camps
        </button>
        <button 
          className={selectedCategory === 'performance' ? 'active' : ''}
          onClick={() => setSelectedCategory('performance')}
        >
          Performances
        </button>
      </div>

      <div className="opportunities-grid">
        <div className="opportunities-section">
          <h3>Local Music Opportunities</h3>
          <div className="opportunities-list">
            {filteredOpportunities.map(opportunity => (
              <div key={opportunity.id} className="opportunity-card">
                <div className="opportunity-header">
                  <h4>{opportunity.title}</h4>
                  <span className={`type-badge ${opportunity.type}`}>
                    {opportunity.type}
                  </span>
                </div>
                <div className="opportunity-details">
                  <p><strong>Ages:</strong> {opportunity.ageGroup}</p>
                  <p><strong>Location:</strong> {opportunity.location}</p>
                  <p>{opportunity.description}</p>
                  <div className="contact-info">
                    <small>📞 {opportunity.contact}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="music-buddies-section">
          <h3>Find Music Buddies</h3>
          <div className="buddy-requests">
            {musicBuddyRequests.map(buddy => (
              <div key={buddy.id} className="buddy-card">
                <div className="buddy-info">
                  <h4>{buddy.name}</h4>
                  <p><strong>Plays:</strong> {buddy.instrument}</p>
                  <p><strong>Likes:</strong> {buddy.interests}</p>
                  <p><strong>Area:</strong> {buddy.location}</p>
                  <p className="looking-for">{buddy.lookingFor}</p>
                </div>
                <button className="connect-btn">Connect</button>
              </div>
            ))}
          </div>
          
          <div className="post-request">
            <h4>Looking for musical friends?</h4>
            <button className="post-btn">Post Your Own Request</button>
          </div>
        </div>
      </div>

      <div className="community-tips">
        <h3>🎵 Making Musical Connections</h3>
        <div className="tips-grid">
          <div className="tip">
            <h4>Start Local</h4>
            <p>Check community centers, libraries, and music stores for bulletin boards</p>
          </div>
          <div className="tip">
            <h4>Family Events</h4>
            <p>Many Hilton Head restaurants have family-friendly live music nights</p>
          </div>
          <div className="tip">
            <h4>School Programs</h4>
            <p>Connect with local school music teachers for ensemble opportunities</p>
          </div>
          <div className="tip">
            <h4>Summer Camps</h4>
            <p>Great way to meet other musical kids during school breaks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalCommunity;