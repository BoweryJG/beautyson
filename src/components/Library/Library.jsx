import React, { useState } from 'react';
import './Library.css';

const Library = () => {
  const [activeTab, setActiveTab] = useState('composers');
  const [selectedContent, setSelectedContent] = useState('mozart-biography');

  const libraryContent = {
    composers: {
      'mozart-biography': {
        title: 'Wolfgang Amadeus Mozart',
        subtitle: 'The Divine Composer (1756-1791)',
        content: `Wolfgang Amadeus Mozart was born in Salzburg in 1756, displaying extraordinary musical talent from an early age. By age 5, he was already composing and performing for European royalty. His father, Leopold, recognized his son's genius and dedicated his life to nurturing Wolfgang's talent.

Mozart's music represents the pinnacle of Classical style - perfectly balanced, elegant, and emotionally profound. He composed over 600 works in his short 35-year life, including 41 symphonies, 27 piano concertos, 17 piano sonatas, and numerous operas.

What made Mozart special was his ability to write music that was both technically perfect and deeply moving. His melodies are unforgettable, his harmonies sophisticated yet natural, and his forms architecturally sound. He could write in any genre and make it sound effortless.

Mozart's relationship with mathematics is evident in his compositions. He understood the mathematical ratios that create pleasing harmonies and used them intuitively. His music often follows the golden ratio in its proportions, creating natural balance and beauty.`
      },
      'beethoven-biography': {
        title: 'Ludwig van Beethoven',
        subtitle: 'The Revolutionary (1770-1827)',
        content: `Ludwig van Beethoven was born in Bonn in 1770 and moved to Vienna in 1792 to study with Haydn. Unlike Mozart, Beethoven had to work hard for his musical achievements, but his determination and revolutionary spirit changed music forever.

Beethoven's career is traditionally divided into three periods: Early (1792-1802), Middle (1803-1814), and Late (1815-1827). Each period shows his evolution as a composer and his struggle with increasing deafness.

His Early Period works show the influence of Mozart and Haydn but with more drama and emotional intensity. The Middle Period, beginning with the "Eroica" Symphony, broke new ground with expanded forms and deeper emotional expression. The Late Period works are profound, spiritual, and ahead of their time.

Beethoven's genius lay in his ability to develop simple musical ideas into complex, emotionally powerful statements. His famous Fifth Symphony demonstrates this perfectly - the entire work grows from a simple four-note motif. He showed how music could express the full range of human experience.`
      }
    },
    davinci: {
      'davinci-music': {
        title: 'Leonardo da Vinci and Music',
        subtitle: 'The Renaissance Polymath\'s Musical Innovations',
        content: `Leonardo da Vinci (1452-1519) was not only a painter and inventor but also a skilled musician and musical theorist. He understood that music, like all art, was based on mathematical principles and natural laws.

Leonardo played the lyre and was known for his beautiful singing voice. He often performed at court and used music as a way to gain patronage. But his real contributions to music were theoretical and mechanical.

He studied the science of sound, understanding how vibrations create different pitches. His notebooks contain detailed observations about acoustics, resonance, and the mathematical relationships between musical intervals.

Leonardo's musical instruments were revolutionary. His viola organista combined the sustained tones of string instruments with the convenience of a keyboard. His mechanical drums could play complex rhythms automatically. These inventions showed his understanding of both music and engineering.

Most importantly, Leonardo saw the connections between music, mathematics, and the natural world. He believed that music reflected the harmony of the universe and that understanding musical proportions could reveal the secrets of creation itself.`
      },
      'instruments': {
        title: 'Da Vinci\'s Musical Inventions',
        subtitle: 'Engineering Meets Art',
        content: `Leonardo da Vinci designed numerous musical instruments that were centuries ahead of their time. His approach combined artistic vision with scientific understanding and mechanical ingenuity.

The Viola Organista was perhaps his most ambitious musical invention. This instrument used a keyboard to control a mechanism that drew horsehair bows across strings, creating sustained tones like a violin but with the polyphonic capabilities of a keyboard. It was essentially the first bowed keyboard instrument.

His mechanical drums featured rotating cylinders with adjustable pegs that could strike different drums in predetermined patterns. This was one of the first programmable musical instruments, predating modern sequencers by centuries.

Leonardo also designed improved wind instruments, including flutes with sliding mechanisms for pitch bending and horns with improved acoustic properties. His understanding of acoustics allowed him to create instruments with better tone and projection.

These inventions weren't just mechanical curiosities - they opened new musical possibilities. The viola organista could play sustained chords impossible on a harpsichord, while the mechanical drums could maintain perfect rhythm for dancing or ceremonial music.`
      }
    },
    theory: {
      'harmony': {
        title: 'Classical Harmony',
        subtitle: 'The Mathematical Beauty of Musical Relationships',
        content: `Harmony in Classical music is based on mathematical relationships that create pleasing combinations of sounds. These relationships were understood by the ancient Greeks and perfected by composers like Mozart and Beethoven.

The foundation of harmony is the overtone series - the natural pattern of frequencies that occur when a string vibrates. This series creates the intervals we hear as consonant (pleasant) or dissonant (tense). The octave (2:1 ratio), fifth (3:2 ratio), and fourth (4:3 ratio) are the most consonant intervals.

Classical harmony uses these relationships to create chord progressions that feel natural and satisfying. The I-V-I progression (tonic-dominant-tonic) is so fundamental because it uses the strongest harmonic relationships in the overtone series.

Mozart and Beethoven were masters of harmonic rhythm - the pace at which chords change. They understood how to create tension and release, how to delay resolution for emotional effect, and how to use unexpected harmonies to surprise and delight listeners.

The study of harmony reveals the deep connection between music and mathematics. Every chord, every progression, every resolution follows mathematical principles that our ears recognize as beautiful.`
      },
      'form': {
        title: 'Musical Forms',
        subtitle: 'Architecture in Sound',
        content: `Musical forms are like architectural blueprints - they provide structure and organization to musical ideas. Classical composers developed these forms to create coherent, satisfying musical experiences.

Sonata Form is the most important Classical form, used in the first movements of symphonies, sonatas, and concertos. It has three main sections: Exposition (presenting two contrasting themes), Development (exploring and transforming these themes), and Recapitulation (returning to the original themes in a new harmonic context).

Rondo Form (A-B-A-C-A) creates unity through repetition of a main theme while providing variety through contrasting episodes. This form is often used in final movements for its energetic, celebratory character.

Theme and Variations allows composers to demonstrate their creativity by transforming a simple melody through different techniques: changing the rhythm, adding ornamentation, altering the harmony, or varying the texture.

Binary and Ternary forms are simpler structures used in dances and songs. Binary form (A-B) presents two complementary sections, while Ternary form (A-B-A) returns to the opening material after a contrasting middle section.

Understanding these forms helps us appreciate how composers create large-scale musical structures that feel both logical and emotionally satisfying.`
      }
    }
  };

  const tabs = [
    { id: 'composers', name: 'Great Composers', icon: '🎼' },
    { id: 'davinci', name: 'Leonardo\'s Legacy', icon: '🔬' },
    { id: 'theory', name: 'Music Theory', icon: '📐' }
  ];

  const getContentList = () => {
    switch (activeTab) {
      case 'composers':
        return [
          { id: 'mozart-biography', title: 'Mozart: The Divine Composer' },
          { id: 'beethoven-biography', title: 'Beethoven: The Revolutionary' }
        ];
      case 'davinci':
        return [
          { id: 'davinci-music', title: 'Leonardo and Music' },
          { id: 'instruments', title: 'Musical Inventions' }
        ];
      case 'theory':
        return [
          { id: 'harmony', title: 'Classical Harmony' },
          { id: 'form', title: 'Musical Forms' }
        ];
      default:
        return [];
    }
  };

  const getCurrentContent = () => {
    return libraryContent[activeTab]?.[selectedContent] || {};
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">📚 The Library</h2>
        <p className="section-description">
          Discover the wisdom of the masters and the connections between music, mathematics, and art
        </p>
      </div>

      <div className="library-content">
        <div className="library-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`library-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedContent(getContentList().find(item => item.id)?.[0]?.id || '');
              }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="library-main">
          <div className="content-sidebar">
            <h3>Topics</h3>
            <div className="content-list">
              {getContentList().map(item => (
                <button
                  key={item.id}
                  className={`content-item ${selectedContent === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedContent(item.id)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="content-display">
            {getCurrentContent().title && (
              <div className="content-article">
                <div className="article-header">
                  <h2>{getCurrentContent().title}</h2>
                  <h3>{getCurrentContent().subtitle}</h3>
                </div>
                <div className="article-content">
                  {getCurrentContent().content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="library-timeline">
          <h3>Renaissance Timeline</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">1452</div>
              <div className="timeline-content">Leonardo da Vinci born</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">1519</div>
              <div className="timeline-content">Leonardo da Vinci dies</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">1756</div>
              <div className="timeline-content">Wolfgang Amadeus Mozart born</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">1770</div>
              <div className="timeline-content">Ludwig van Beethoven born</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">1791</div>
              <div className="timeline-content">Mozart dies at age 35</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">1827</div>
              <div className="timeline-content">Beethoven dies at age 56</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;