export function renderHome() {
  return `
    <div class="hero-banner">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Empowering Africa's Youth Through Technology & AI Learning</h1>
          <p class="hero-subtitle">
            Join thousands of young Africans transforming their futures through world-class tech education.
            Learn in-demand skills, build real projects, and unlock career opportunities in the digital economy.
          </p>
          <button class="btn btn-hero" onclick="document.querySelector('.nav-link[data-page=\\'courses\\']').click()">
            Start Learning Now →
          </button>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">10,000+</span>
              <span class="stat-label">Active Learners</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">Expert Courses</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">95%</span>
              <span class="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <div class="learner-illustration">
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="150" r="120" fill="#e0f2fe" opacity="0.5"/>
              <circle cx="200" cy="150" r="90" fill="#bae6fd" opacity="0.5"/>
              <rect x="150" y="100" width="100" height="120" rx="10" fill="#14b8a6"/>
              <circle cx="200" cy="80" r="25" fill="#0d9488"/>
              <path d="M180 130 Q200 140 220 130" stroke="white" stroke-width="3" stroke-linecap="round" fill="none"/>
              <rect x="165" y="150" width="70" height="50" rx="5" fill="#0ea5e9"/>
              <line x1="175" y1="165" x2="235" y2="165" stroke="white" stroke-width="2"/>
              <line x1="175" y1="180" x2="225" y2="180" stroke="white" stroke-width="2"/>
              <path d="M140 220 L120 280 L160 280 L180 220" fill="#14b8a6"/>
              <path d="M220 220 L240 280 L280 280 L260 220" fill="#14b8a6"/>
              <circle cx="230" cy="100" r="15" fill="#f59e0b"/>
              <text x="225" y="108" font-size="16" fill="white">★</text>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <section class="featured-categories">
      <h2 class="section-title">Featured Course Categories</h2>
      <p class="section-subtitle">Choose your path and start building your future today</p>

      <div class="categories-grid">
        <div class="category-card">
          <div class="category-icon">🤖</div>
          <h3>Emerging Tech</h3>
          <p>AI, Machine Learning, Blockchain, Data Science & Analytics</p>
          <ul class="category-features">
            <li>Hands-on AI Projects</li>
            <li>Real-world Datasets</li>
            <li>Industry Certifications</li>
          </ul>
          <button class="btn btn-secondary" onclick="document.querySelector('.nav-link[data-page=\\'courses\\']').click()">
            Explore Courses
          </button>
        </div>

        <div class="category-card">
          <div class="category-icon">💻</div>
          <h3>Software Development</h3>
          <p>Web Development, Mobile Apps, Python, JavaScript & Full Stack</p>
          <ul class="category-features">
            <li>Build Real Applications</li>
            <li>Portfolio Projects</li>
            <li>Job-Ready Skills</li>
          </ul>
          <button class="btn btn-secondary" onclick="document.querySelector('.nav-link[data-page=\\'courses\\']').click()">
            Explore Courses
          </button>
        </div>

        <div class="category-card">
          <div class="category-icon">🚀</div>
          <h3>Digital Skills & Entrepreneurship</h3>
          <p>Digital Marketing, Product Management, Startup Fundamentals</p>
          <ul class="category-features">
            <li>Launch Your Startup</li>
            <li>Growth Strategies</li>
            <li>Business Skills</li>
          </ul>
          <button class="btn btn-secondary" onclick="document.querySelector('.nav-link[data-page=\\'courses\\']').click()">
            Explore Courses
          </button>
        </div>

        <div class="category-card">
          <div class="category-icon">⚡</div>
          <h3>On-Demand Learning</h3>
          <p>Short, career-boosting modules for busy professionals</p>
          <ul class="category-features">
            <li>15-30 Min Lessons</li>
            <li>Skill-Specific Training</li>
            <li>Quick Certifications</li>
          </ul>
          <button class="btn btn-secondary" onclick="document.querySelector('.nav-link[data-page=\\'courses\\']').click()">
            Explore Courses
          </button>
        </div>
      </div>
    </section>

    <section class="mission-section">
      <div class="mission-content">
        <h2>Our Mission</h2>
        <p>
          Inspired by initiatives like Power Learn Project Africa, we believe that every young African
          deserves access to quality technology education. Our platform provides free and affordable
          courses designed to bridge the digital skills gap and create pathways to meaningful
          employment in the tech industry.
        </p>
        <div class="mission-values">
          <div class="value-item">
            <span class="value-icon">🎯</span>
            <h4>Practical Skills</h4>
            <p>Learn by doing with real-world projects</p>
          </div>
          <div class="value-item">
            <span class="value-icon">🤝</span>
            <h4>Community</h4>
            <p>Connect with fellow learners across Africa</p>
          </div>
          <div class="value-item">
            <span class="value-icon">💼</span>
            <h4>Career Ready</h4>
            <p>Build a portfolio that gets you hired</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <h2>Ready to Transform Your Future?</h2>
      <p>Join our community of learners and start your tech journey today.</p>
      <button class="btn btn-hero" onclick="document.querySelector('.nav-link[data-page=\\'courses\\']').click()">
        Get Started Free
      </button>
    </section>
  `;
}
