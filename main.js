import './style.css';
import { coursesData } from './data.js';
import { storage } from './storage.js';
import { renderHome } from './pages/home.js';
import { renderCourses, renderCourseDetail } from './pages/courses.js';
import { renderDashboard } from './pages/dashboard.js';
import { launchConfetti } from './utils/confetti.js';
import { initAIAssistant, sendAIMessage } from './utils/ai-assistant.js';
import { checkBadges, checkCourseBadge, checkMasterBadge } from './utils/gamification.js';

let currentPage = 'home';
let currentCourse = null;

function initApp() {
  setupNavigation();
  setupSidebarToggle();
  initAIAssistant();
  navigateToPage('home');
  updatePointsDisplay();
}

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      navigateToPage(page);

      if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
      }
    });
  });
}

function setupSidebarToggle() {
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

function navigateToPage(page, courseId = null) {
  currentPage = page;
  const pageContent = document.getElementById('pageContent');

  switch(page) {
    case 'home':
      pageContent.innerHTML = renderHome();
      break;
    case 'courses':
      if (courseId) {
        currentCourse = coursesData.find(c => c.id === courseId);
        pageContent.innerHTML = renderCourseDetail(currentCourse);
        setupCourseDetailListeners(currentCourse);
      } else {
        pageContent.innerHTML = renderCourses(coursesData);
        setupCoursesListeners();
      }
      break;
    case 'dashboard':
      pageContent.innerHTML = renderDashboard(coursesData);
      setupDashboardListeners();
      break;
  }
}

function setupCoursesListeners() {
  const viewButtons = document.querySelectorAll('.view-course-btn');

  viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = parseInt(e.target.getAttribute('data-course-id'));
      navigateToPage('courses', courseId);
    });
  });
}

function setupCourseDetailListeners(course) {
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToPage('courses');
    });
  }

  const lessonButtons = document.querySelectorAll('.lesson-btn');
  lessonButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lessonId = parseInt(e.target.getAttribute('data-lesson-id'));
      loadLesson(course, lessonId);

      lessonButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  if (course.lessons.length > 0) {
    loadLesson(course, course.lessons[0].id);
    lessonButtons[0]?.classList.add('active');
  }
}

function loadLesson(course, lessonId) {
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) return;

  const contentArea = document.querySelector('.lesson-content-area');
  const isCompleted = storage.isLessonCompleted(course.id, lessonId);

  contentArea.innerHTML = `
    <h2>${lesson.title}</h2>

    <div class="video-placeholder">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    </div>

    <p>${lesson.content}</p>

    ${lesson.notes ? `
      <div style="background-color: var(--bg-light); padding: 20px; border-radius: 8px; margin-top: 24px; border-left: 4px solid var(--primary-color);">
        <h4 style="margin-bottom: 8px; color: var(--text-dark);">📝 Notes:</h4>
        <p style="color: var(--text-light); margin: 0;">${lesson.notes}</p>
      </div>
    ` : ''}

    <div class="lesson-actions">
      <button class="btn ${isCompleted ? 'btn-secondary' : ''}" id="markCompleteBtn">
        ${isCompleted ? 'Completed ✓' : 'Mark as Complete'}
      </button>
      <button class="btn btn-secondary" id="nextLessonBtn" style="display: none;">
        Next Lesson →
      </button>
    </div>
  `;

  const markCompleteBtn = document.getElementById('markCompleteBtn');
  const nextLessonBtn = document.getElementById('nextLessonBtn');

  markCompleteBtn.addEventListener('click', () => {
    const wasNew = !storage.isLessonCompleted(course.id, lessonId);

    if (!wasNew) return;

    storage.markLessonComplete(course.id, lessonId);
    markCompleteBtn.textContent = 'Completed ✓';
    markCompleteBtn.classList.add('btn-secondary');
    markCompleteBtn.classList.add('lesson-complete-animation');

    const lessonBtn = document.querySelector(`.lesson-btn[data-lesson-id="${lessonId}"]`);
    if (lessonBtn) {
      lessonBtn.classList.add('completed');
    }

    const earnedPoints = 20;
    const totalPoints = storage.addPoints(earnedPoints);
    updatePointsDisplay();

    launchConfetti();
    sendAIMessage(`Great job! You've earned ${earnedPoints} points for completing this lesson!`);

    const allProgress = storage.getAllProgress(coursesData);
    const earnedBadges = checkBadges(allProgress.totalCompleted, storage.getGamification().completedCourses, totalPoints);

    earnedBadges.forEach(badge => {
      if (storage.addBadge(badge)) {
        showBadgeNotification(badge);
        if (badge.points > 0) {
          storage.addPoints(badge.points);
          updatePointsDisplay();
        }
      }
    });

    updateProgressBar(course);

    const progress = storage.getCourseProgress(course.id, course.lessons.length);
    if (progress.percentage === 100) {
      const isNewCompletion = storage.markCourseCompleted(course.id, course.title);
      if (isNewCompletion) {
        const courseBadge = checkCourseBadge(course.id, course.title);
        if (courseBadge && storage.addBadge(courseBadge)) {
          showBadgeNotification(courseBadge);
          storage.addPoints(courseBadge.points);
          updatePointsDisplay();
        }

        const masterBadge = checkMasterBadge(storage.getGamification().completedCourses);
        if (masterBadge && storage.addBadge(masterBadge)) {
          showBadgeNotification(masterBadge);
          storage.addPoints(masterBadge.points);
          updatePointsDisplay();
        }

        showCertificate(course.title);
      }
    }

    const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
    if (currentIndex < course.lessons.length - 1) {
      nextLessonBtn.style.display = 'inline-block';
    }
  });

  const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
  if (isCompleted && currentIndex < course.lessons.length - 1) {
    nextLessonBtn.style.display = 'inline-block';
  }

  nextLessonBtn.addEventListener('click', () => {
    const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
    if (currentIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[currentIndex + 1];
      loadLesson(course, nextLesson.id);

      const lessonButtons = document.querySelectorAll('.lesson-btn');
      lessonButtons.forEach(b => b.classList.remove('active'));
      document.querySelector(`.lesson-btn[data-lesson-id="${nextLesson.id}"]`)?.classList.add('active');
    }
  });

  updateProgressBar(course);
}

function updateProgressBar(course) {
  const completedLessons = storage.getCompletedLessons(course.id);
  const totalLessons = course.lessons.length;
  const percentage = Math.round((completedLessons.length / totalLessons) * 100);

  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.querySelector('.progress-text');

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}%`;
  }

  if (progressText) {
    progressText.textContent = `${completedLessons.length} of ${totalLessons} lessons completed`;
  }
}

function setupDashboardListeners() {
  const continueButtons = document.querySelectorAll('.continue-course-btn');

  continueButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = parseInt(e.target.getAttribute('data-course-id'));

      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector('.nav-link[data-page="courses"]')?.classList.add('active');

      navigateToPage('courses', courseId);
    });
  });
}

initApp();

function updatePointsDisplay() {
  let pointsDisplay = document.getElementById('pointsDisplay');
  if (!pointsDisplay) {
    const sidebar = document.querySelector('.sidebar-header');
    const pointsHTML = `
      <div class="points-display" id="pointsDisplay">
        <span>⭐</span>
        <span id="pointsValue">${storage.getPoints()}</span>
      </div>
    `;
    sidebar.insertAdjacentHTML('beforeend', pointsHTML);
    pointsDisplay = document.getElementById('pointsDisplay');
  } else {
    document.getElementById('pointsValue').textContent = storage.getPoints();
  }
}

function showBadgeNotification(badge) {
  const notification = document.createElement('div');
  notification.className = 'badge-notification';
  notification.innerHTML = `
    <div class="badge-container">
      <span>${badge.icon}</span>
      <div>
        <div style="font-weight: 700;">${badge.name}</div>
        <div style="font-size: 12px; opacity: 0.9;">${badge.description}</div>
      </div>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 4000;
    animation: slideInRight 0.5s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease-in';
    setTimeout(() => notification.remove(), 500);
  }, 4000);

  launchConfetti();
  sendAIMessage(`Congratulations! You've earned the "${badge.name}" badge!`);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

function showCertificate(courseName) {
  const modal = document.createElement('div');
  modal.className = 'certificate-modal';
  modal.innerHTML = `
    <div class="certificate-content">
      <div class="certificate-icon">🏆</div>
      <h2>Congratulations!</h2>
      <p>You have successfully completed</p>
      <h3 style="font-size: 24px; color: var(--text-dark); margin-bottom: 24px;">${courseName}</h3>
      <p>Keep up the excellent work and continue your learning journey!</p>
      <button class="btn" id="closeCertificate">Continue Learning</button>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.add('show');
  }, 100);

  launchConfetti();
  sendAIMessage(`Amazing! You completed ${courseName}! You're making incredible progress!`);

  document.getElementById('closeCertificate').addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  });
}
