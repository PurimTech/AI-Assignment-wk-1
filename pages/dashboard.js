import { storage } from '../storage.js';
import { getRandomQuote } from '../utils/gamification.js';

export function renderDashboard(courses) {
  const allProgress = storage.getAllProgress(courses);
  const coursesInProgress = allProgress.courses.filter(c => c.completed > 0 && c.completed < c.total);
  const coursesCompleted = allProgress.courses.filter(c => c.completed === c.total && c.total > 0);
  const badges = storage.getBadges();
  const points = storage.getPoints();

  const courseProgressHTML = allProgress.courses
    .filter(c => c.completed > 0)
    .map(courseProgress => {
      const course = courses.find(c => c.id === courseProgress.courseId);
      return `
        <div class="course-progress-item">
          <h4>${courseProgress.courseTitle}</h4>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${courseProgress.percentage}%">
              ${courseProgress.percentage}%
            </div>
          </div>
          <p class="progress-text">${courseProgress.completed} of ${courseProgress.total} lessons completed</p>
          <button class="btn btn-small continue-course-btn" data-course-id="${courseProgress.courseId}">
            ${courseProgress.completed === courseProgress.total ? 'Review Course' : 'Continue Learning'}
          </button>
        </div>
      `;
    }).join('');

  const emptyState = allProgress.totalCompleted === 0 ? `
    <div class="empty-state">
      <h3>No Progress Yet</h3>
      <p>Start learning by browsing our available courses.</p>
      <button class="btn" onclick="document.querySelector('.nav-link[data-page=\\'courses\\']').click()">
        Browse Courses
      </button>
    </div>
  ` : '';

  const motivationalQuote = getRandomQuote();

  return `
    <section>
      <h1 class="section-title">Learning Dashboard</h1>

      ${allProgress.totalCompleted > 0 ? `
        <div class="motivational-quote">
          "${motivationalQuote}"
        </div>
      ` : ''}

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Progress</h3>
          <div class="stat-value">${allProgress.overallPercentage}%</div>
          <p style="color: var(--text-light); margin-top: 8px;">
            ${allProgress.totalCompleted} of ${allProgress.totalLessons} lessons completed
          </p>
        </div>

        <div class="stat-card">
          <h3>Courses In Progress</h3>
          <div class="stat-value">${coursesInProgress.length}</div>
          <p style="color: var(--text-light); margin-top: 8px;">
            ${coursesInProgress.length === 1 ? 'course' : 'courses'} you're currently learning
          </p>
        </div>

        <div class="stat-card">
          <h3>Total Points <span class="reward-icon">⭐</span></h3>
          <div class="stat-value">${points}</div>
          <p style="color: var(--text-light); margin-top: 8px;">
            Keep learning to earn more!
          </p>
        </div>

        <div class="stat-card">
          <h3>Badges Earned <span class="reward-icon">🏆</span></h3>
          <div class="stat-value">${badges.length}</div>
          <p style="color: var(--text-light); margin-top: 8px;">
            Achievements unlocked
          </p>
        </div>
      </div>

      ${badges.length > 0 ? `
        <div class="course-progress-list" style="margin-bottom: 32px;">
          <h2 style="margin-bottom: 24px;">Your Badges</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; padding: 20px;">
            ${badges.map(badge => `
              <div class="badge-container" title="${badge.description}">
                <span>${badge.icon}</span>
                <span>${badge.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${allProgress.totalCompleted > 0 ? `
        <div class="course-progress-list">
          <h2 style="margin-bottom: 24px;">Your Courses</h2>
          ${courseProgressHTML}
        </div>
      ` : emptyState}
    </section>
  `;
}
