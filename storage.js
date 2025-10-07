const STORAGE_KEY = 'learnhub_progress';
const GAMIFICATION_KEY = 'learnhub_gamification';

export const storage = {
  getProgress() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },

  saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  getGamification() {
    const data = localStorage.getItem(GAMIFICATION_KEY);
    return data ? JSON.parse(data) : { points: 0, badges: [], completedCourses: [] };
  },

  saveGamification(data) {
    localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(data));
  },

  addPoints(points) {
    const gamification = this.getGamification();
    gamification.points += points;
    this.saveGamification(gamification);
    return gamification.points;
  },

  getPoints() {
    return this.getGamification().points;
  },

  addBadge(badge) {
    const gamification = this.getGamification();
    if (!gamification.badges.find(b => b.id === badge.id)) {
      gamification.badges.push(badge);
      this.saveGamification(gamification);
      return true;
    }
    return false;
  },

  getBadges() {
    return this.getGamification().badges;
  },

  markCourseCompleted(courseId, courseName) {
    const gamification = this.getGamification();
    if (!gamification.completedCourses.includes(courseId)) {
      gamification.completedCourses.push(courseId);
      this.saveGamification(gamification);
      return true;
    }
    return false;
  },

  isCourseCompleted(courseId) {
    return this.getGamification().completedCourses.includes(courseId);
  },

  markLessonComplete(courseId, lessonId) {
    const progress = this.getProgress();

    if (!progress[courseId]) {
      progress[courseId] = { completedLessons: [] };
    }

    if (!progress[courseId].completedLessons.includes(lessonId)) {
      progress[courseId].completedLessons.push(lessonId);
      this.saveProgress(progress);
    }
  },

  isLessonCompleted(courseId, lessonId) {
    const progress = this.getProgress();
    return progress[courseId]?.completedLessons?.includes(lessonId) || false;
  },

  getCompletedLessons(courseId) {
    const progress = this.getProgress();
    return progress[courseId]?.completedLessons || [];
  },

  getCourseProgress(courseId, totalLessons) {
    const completedLessons = this.getCompletedLessons(courseId);
    return {
      completed: completedLessons.length,
      total: totalLessons,
      percentage: Math.round((completedLessons.length / totalLessons) * 100)
    };
  },

  getAllProgress(courses) {
    const allProgress = courses.map(course => {
      const progress = this.getCourseProgress(course.id, course.lessons.length);
      return {
        courseId: course.id,
        courseTitle: course.title,
        ...progress
      };
    });

    const totalCompleted = allProgress.reduce((sum, p) => sum + p.completed, 0);
    const totalLessons = allProgress.reduce((sum, p) => sum + p.total, 0);

    return {
      courses: allProgress,
      totalCompleted,
      totalLessons,
      overallPercentage: totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0
    };
  }
};
