import { storage } from '../storage.js';

export function renderCourses(courses) {
  const coursesHTML = courses.map(course => {
    const progress = storage.getCourseProgress(course.id, course.lessons.length);

    return `
      <div class="course-card">
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <div class="course-meta">
          <span>📚 ${course.lessonCount} Lessons</span>
          <span>⏱️ ${course.duration}</span>
        </div>
        ${progress.completed > 0 ? `
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${progress.percentage}%">${progress.percentage}%</div>
          </div>
          <p class="progress-text">${progress.completed} of ${progress.total} lessons completed</p>
        ` : ''}
        <button class="btn view-course-btn" data-course-id="${course.id}">
          ${progress.completed > 0 ? 'Continue Course' : 'View Course'}
        </button>
      </div>
    `;
  }).join('');

  return `
    <section>
      <h1 class="section-title">Available Courses</h1>
      <div class="courses-grid">
        ${coursesHTML}
      </div>
    </section>
  `;
}

export function renderCourseDetail(course) {
  const progress = storage.getCourseProgress(course.id, course.lessons.length);

  const lessonsHTML = course.lessons.map(lesson => {
    const isCompleted = storage.isLessonCompleted(course.id, lesson.id);
    return `
      <li class="lesson-item">
        <button class="lesson-btn ${isCompleted ? 'completed' : ''}" data-lesson-id="${lesson.id}">
          ${lesson.title}
        </button>
      </li>
    `;
  }).join('');

  return `
    <a href="#" class="btn btn-secondary back-btn">← Back to Courses</a>

    <section>
      <h1 class="section-title">${course.title}</h1>
      <p style="color: var(--text-light); margin-bottom: 24px; font-size: 18px;">${course.description}</p>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${progress.percentage}%">${progress.percentage}%</div>
      </div>
      <p class="progress-text">${progress.completed} of ${progress.total} lessons completed</p>

      <div class="course-detail-view">
        <aside class="lessons-sidebar">
          <h3>Course Lessons</h3>
          <ul class="lesson-list">
            ${lessonsHTML}
          </ul>
        </aside>

        <div class="lesson-content-area">
          <div class="empty-state">
            <h3>Select a lesson to begin</h3>
            <p>Choose a lesson from the sidebar to start learning.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
