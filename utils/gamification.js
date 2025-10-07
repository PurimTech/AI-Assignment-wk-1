import { storage } from '../storage.js';

export const badges = [
  { id: 'first_lesson', name: 'First Steps', icon: '🎯', points: 10, description: 'Complete your first lesson' },
  { id: 'html_beginner', name: 'HTML Beginner', icon: '📝', points: 50, description: 'Complete HTML5 Fundamentals' },
  { id: 'css_beginner', name: 'CSS Beginner', icon: '🎨', points: 50, description: 'Complete CSS Layout Mastery' },
  { id: 'js_beginner', name: 'JS Beginner', icon: '⚡', points: 50, description: 'Complete JavaScript DOM Manipulation' },
  { id: 'modern_dev', name: 'Modern Developer', icon: '🚀', points: 50, description: 'Complete Modern Web Development' },
  { id: 'dedicated_learner', name: 'Dedicated Learner', icon: '💪', points: 30, description: 'Complete 10 lessons' },
  { id: 'master_student', name: 'Master Student', icon: '🎓', points: 100, description: 'Complete all courses' },
  { id: 'points_100', name: 'Century Club', icon: '💯', points: 0, description: 'Earn 100 points' },
  { id: 'points_500', name: 'Expert', icon: '⭐', points: 0, description: 'Earn 500 points' },
];

export function checkBadges(totalCompleted, completedCourses, points) {
  const earnedBadges = [];

  if (totalCompleted === 1 && !storage.getBadges().find(b => b.id === 'first_lesson')) {
    earnedBadges.push(badges.find(b => b.id === 'first_lesson'));
  }

  if (totalCompleted >= 10 && !storage.getBadges().find(b => b.id === 'dedicated_learner')) {
    earnedBadges.push(badges.find(b => b.id === 'dedicated_learner'));
  }

  if (points >= 100 && !storage.getBadges().find(b => b.id === 'points_100')) {
    earnedBadges.push(badges.find(b => b.id === 'points_100'));
  }

  if (points >= 500 && !storage.getBadges().find(b => b.id === 'points_500')) {
    earnedBadges.push(badges.find(b => b.id === 'points_500'));
  }

  return earnedBadges;
}

export function checkCourseBadge(courseId, courseName) {
  const badgeMap = {
    1: 'html_beginner',
    2: 'css_beginner',
    3: 'js_beginner',
    4: 'modern_dev'
  };

  const badgeId = badgeMap[courseId];
  if (badgeId && !storage.getBadges().find(b => b.id === badgeId)) {
    return badges.find(b => b.id === badgeId);
  }

  return null;
}

export function checkMasterBadge(completedCourses) {
  if (completedCourses.length === 4 && !storage.getBadges().find(b => b.id === 'master_student')) {
    return badges.find(b => b.id === 'master_student');
  }
  return null;
}

export const motivationalQuotes = [
  "The expert in anything was once a beginner.",
  "Learning is a treasure that will follow its owner everywhere.",
  "Education is the most powerful weapon which you can use to change the world.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Every accomplishment starts with the decision to try.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
];

export function getRandomQuote() {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}
