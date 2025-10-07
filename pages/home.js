export function renderHome() {
  return `
    <div class="hero-section">
      <h1>Welcome to LearnHub</h1>
      <p>Your journey to mastering web development starts here. Learn HTML, CSS, JavaScript, and modern web technologies at your own pace.</p>
    </div>

    <section>
      <h2 class="section-title">Why Choose LearnHub?</h2>
      <div class="courses-grid">
        <div class="course-card">
          <h3>Self-Paced Learning</h3>
          <p>Learn at your own speed with interactive lessons and hands-on exercises. Track your progress and pick up where you left off.</p>
        </div>

        <div class="course-card">
          <h3>Expert-Crafted Content</h3>
          <p>Our curriculum is designed by industry professionals to ensure you learn the most relevant and up-to-date skills.</p>
        </div>

        <div class="course-card">
          <h3>Progress Tracking</h3>
          <p>Monitor your learning journey with detailed progress reports and completion certificates for each course.</p>
        </div>
      </div>
    </section>

    <section style="margin-top: 48px; text-align: center;">
      <h2 class="section-title">Ready to Start Learning?</h2>
      <p style="color: var(--text-light); margin-bottom: 24px; font-size: 18px;">Explore our courses and begin your web development journey today.</p>
      <button class="btn" onclick="document.querySelector('.nav-link[data-page=\\'courses\\']').click()">Browse Courses</button>
    </section>
  `;
}
