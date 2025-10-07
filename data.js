export const coursesData = [
  {
    id: 1,
    title: "HTML5 Fundamentals",
    description: "Master the building blocks of the web. Learn semantic HTML5, forms, media elements, and modern best practices.",
    lessonCount: 5,
    duration: "2 hours",
    lessons: [
      {
        id: 1,
        title: "Introduction to HTML5",
        content: "HTML5 is the latest version of Hypertext Markup Language, the standard for structuring web content. It introduces new semantic elements, improved form controls, and multimedia support without plugins. HTML5 makes web pages more accessible and easier to develop.",
        notes: "Remember: HTML provides the structure, CSS provides the style, and JavaScript provides the behavior."
      },
      {
        id: 2,
        title: "Semantic Elements",
        content: "Semantic HTML elements clearly describe their meaning to both the browser and developer. Elements like <header>, <nav>, <main>, <article>, <section>, and <footer> make your code more readable and improve SEO. They also help screen readers better understand your page structure.",
        notes: "Use semantic elements instead of generic <div> tags whenever possible for better accessibility."
      },
      {
        id: 3,
        title: "Forms and Input Types",
        content: "HTML5 introduces new input types like email, url, number, date, color, and range. These provide built-in validation and better mobile keyboard support. Form elements should always be properly labeled for accessibility and usability.",
        notes: "Always include labels with your form inputs and use placeholder text wisely."
      },
      {
        id: 4,
        title: "Media Elements",
        content: "The <audio> and <video> elements allow you to embed media directly into web pages without third-party plugins. You can control playback, add captions, and provide multiple source formats for browser compatibility. The <picture> element helps with responsive images.",
        notes: "Always provide alternative text and fallback content for media elements."
      },
      {
        id: 5,
        title: "HTML Best Practices",
        content: "Write clean, valid HTML by closing tags properly, using lowercase for element and attribute names, and validating your code. Structure your document logically with proper heading hierarchy (h1-h6). Keep accessibility in mind by using ARIA attributes when needed and ensuring keyboard navigation works.",
        notes: "Run your HTML through a validator regularly and test with screen readers."
      }
    ]
  },
  {
    id: 2,
    title: "CSS Layout Mastery",
    description: "Create stunning, responsive layouts using Flexbox, Grid, and modern CSS techniques. Build professional designs from scratch.",
    lessonCount: 6,
    duration: "3 hours",
    lessons: [
      {
        id: 6,
        title: "CSS Fundamentals",
        content: "CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. Learn about selectors, specificity, the cascade, and inheritance. Understanding the box model is crucial: every element is a rectangular box with content, padding, border, and margin.",
        notes: "The box-sizing: border-box property makes sizing elements much easier to manage."
      },
      {
        id: 7,
        title: "Flexbox Layouts",
        content: "Flexbox is a one-dimensional layout system perfect for arranging items in rows or columns. Key properties include display: flex, justify-content, align-items, flex-direction, and flex-wrap. It solves many traditional CSS layout challenges like vertical centering and equal-height columns.",
        notes: "Use Flexbox for component-level layouts and navigation menus."
      },
      {
        id: 8,
        title: "CSS Grid",
        content: "CSS Grid is a powerful two-dimensional layout system. Define rows and columns using grid-template-columns and grid-template-rows. Place items precisely with grid-column and grid-row. Grid is perfect for page-level layouts and complex designs.",
        notes: "Grid and Flexbox work great together - use Grid for overall layout and Flexbox for components."
      },
      {
        id: 9,
        title: "Responsive Design",
        content: "Make your websites work on all devices using media queries, flexible layouts, and responsive units. Mobile-first design means starting with mobile styles and adding complexity for larger screens. Use relative units like rem, em, %, and viewport units (vw, vh).",
        notes: "Test your designs on actual devices, not just browser dev tools."
      },
      {
        id: 10,
        title: "CSS Variables",
        content: "CSS Custom Properties (variables) let you store and reuse values throughout your stylesheet. Define them in :root for global scope. Variables make theming, maintenance, and dynamic styling much easier. They can be changed with JavaScript for interactive effects.",
        notes: "Name your variables semantically: --primary-color instead of --blue."
      },
      {
        id: 11,
        title: "Advanced Selectors & Animations",
        content: "Master pseudo-classes (:hover, :focus, :nth-child) and pseudo-elements (::before, ::after). Create smooth transitions and keyframe animations. Use transform for performance-friendly animations (translate, scale, rotate). Animations enhance user experience when used thoughtfully.",
        notes: "Respect user preferences: check prefers-reduced-motion for accessibility."
      }
    ]
  },
  {
    id: 3,
    title: "JavaScript DOM Manipulation",
    description: "Learn how to make your websites interactive. Master DOM manipulation, events, and modern JavaScript techniques.",
    lessonCount: 5,
    duration: "2.5 hours",
    lessons: [
      {
        id: 12,
        title: "JavaScript Basics",
        content: "JavaScript is the programming language of the web. Learn about variables (let, const), data types (strings, numbers, booleans, arrays, objects), operators, and control flow (if/else, loops). Functions are reusable blocks of code that are fundamental to JavaScript programming.",
        notes: "Use const by default, let when you need to reassign, avoid var in modern JavaScript."
      },
      {
        id: 13,
        title: "DOM Fundamentals",
        content: "The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page as a tree of objects that JavaScript can manipulate. Learn to select elements with querySelector, getElementById, and querySelectorAll. Understanding the DOM is key to interactive web development.",
        notes: "querySelector and querySelectorAll use CSS selector syntax, making them very powerful."
      },
      {
        id: 14,
        title: "Event Handling",
        content: "Events are actions that happen in the browser: clicks, key presses, form submissions, page loads. Use addEventListener to respond to events. Event delegation lets you handle events efficiently on multiple elements. Understanding event bubbling and capturing helps you manage complex interactions.",
        notes: "Always remove event listeners when elements are removed to prevent memory leaks."
      },
      {
        id: 15,
        title: "Manipulating Elements",
        content: "Change element content with textContent and innerHTML. Modify attributes with setAttribute and getAttribute. Add, remove, and toggle CSS classes with classList. Create new elements with createElement and add them to the page with appendChild or insertAdjacentHTML.",
        notes: "Use textContent for security when displaying user input to prevent XSS attacks."
      },
      {
        id: 16,
        title: "Local Storage & State Management",
        content: "localStorage and sessionStorage let you store data in the browser. Data persists even after the page is closed (localStorage) or until the browser is closed (sessionStorage). Store strings with setItem and retrieve with getItem. Use JSON.stringify and JSON.parse for objects.",
        notes: "localStorage can only store strings - always serialize objects with JSON.stringify."
      }
    ]
  },
  {
    id: 4,
    title: "Modern Web Development",
    description: "Explore modern tools, frameworks, and best practices. Learn about ES6+, async JavaScript, APIs, and web performance.",
    lessonCount: 4,
    duration: "2 hours",
    lessons: [
      {
        id: 17,
        title: "ES6+ Features",
        content: "Modern JavaScript includes arrow functions, template literals, destructuring, spread/rest operators, and modules. Learn about Promises for asynchronous operations and async/await for cleaner asynchronous code. Classes provide a more familiar syntax for object-oriented programming.",
        notes: "Arrow functions don't have their own 'this' binding - useful for callbacks."
      },
      {
        id: 18,
        title: "Working with APIs",
        content: "APIs (Application Programming Interfaces) let you fetch data from servers. Use the Fetch API to make HTTP requests. Handle responses with .then() or async/await. Learn about REST APIs, JSON format, and HTTP methods (GET, POST, PUT, DELETE). Always handle errors gracefully.",
        notes: "Always handle both network errors and HTTP error responses in your API calls."
      },
      {
        id: 19,
        title: "Web Performance",
        content: "Fast websites provide better user experience and rank higher in search engines. Optimize images, minify CSS and JavaScript, use lazy loading, and implement caching strategies. Measure performance with Lighthouse and browser DevTools. Critical rendering path optimization improves initial load time.",
        notes: "Aim for a First Contentful Paint under 1.8 seconds for good user experience."
      },
      {
        id: 20,
        title: "Developer Tools & Debugging",
        content: "Browser DevTools are essential for web development. Use the Console for logging and debugging, Elements panel for inspecting HTML/CSS, Network tab for monitoring requests, and Performance tab for profiling. Learn to set breakpoints, step through code, and use console methods effectively.",
        notes: "console.table() is great for viewing arrays of objects in a readable format."
      }
    ]
  }
];
