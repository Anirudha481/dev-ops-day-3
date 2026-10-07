import React, { useState } from 'react';
import './App.css';

const MODULES = [
  {
    id: 'html',
    title: '1. HTML5 Fundamentals',
    level: 'Beginner',
    tag: 'Structure',
    description: 'The standard markup language used to structure web pages and content.',
    topics: [
      {
        name: 'Semantic Elements',
        summary: 'Use elements that clearly describe their meaning to both browser and developer.',
        code: '<header>\n  <nav>\n    <a href="#home">Home</a>\n  </nav>\n</header>\n<main>\n  <article>Content here</article>\n</main>\n<footer>&copy; 2026</footer>'
      },
      {
        name: 'Forms & Inputs',
        summary: 'Capturing user interaction safely and accessibly.',
        code: '<form onSubmit={handleSubmit}>\n  <label htmlFor="user">Username</label>\n  <input id="user" type="text" required placeholder="Enter username" />\n  <button type="submit">Submit</button>\n</form>'
      }
    ]
  },
  {
    id: 'css',
    title: '2. Modern CSS & Flexbox',
    level: 'Beginner / Intermediate',
    tag: 'Styling',
    description: 'Style your markup with responsive layouts, CSS variables, and modern centering.',
    topics: [
      {
        name: 'Flexbox Layout',
        summary: 'Distribute space dynamically along one dimension (row or column).',
        code: '.parent {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n}'
      },
      {
        name: 'CSS Custom Properties (Variables)',
        summary: 'Define reusable values across the entire stylesheet.',
        code: ':root {\n  --primary: #2563eb;\n  --bg-dark: #0f172a;\n}\n\n.card {\n  background: var(--bg-dark);\n  color: var(--primary);\n}'
      }
    ]
  },
  {
    id: 'javascript',
    title: '3. Modern JavaScript (ES6+)',
    level: 'Intermediate',
    tag: 'Logic',
    description: 'Write dynamic, functional code using modern ECMAScript features.',
    topics: [
      {
        name: 'Array Methods: map, filter, reduce',
        summary: 'Transform and filter arrays immutably without traditional loops.',
        code: 'const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(n => n % 2 === 0);\nconst doubled = evens.map(n => n * 2); // [4, 8]'
      },
      {
        name: 'Promises & Async/Await',
        summary: 'Handling asynchronous operations like network calls cleanly.',
        code: 'async function fetchPosts() {\n  try {\n    const res = await fetch("https://api.example.com/posts");\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n  }\n}'
      }
    ]
  },
  {
    id: 'react',
    title: '4. React.js Core Concepts',
    level: 'Advanced Beginner',
    tag: 'Framework',
    description: 'Build composable, stateful user interfaces with components and hooks.',
    topics: [
      {
        name: 'useState & Controlled Inputs',
        summary: 'Managing component memory and synchronizing input fields.',
        code: 'const [query, setQuery] = useState("");\n\n<input \n  value={query} \n  onChange={(e) => setQuery(e.target.value)} \n/>'
      },
      {
        name: 'useEffect for Side Effects',
        summary: 'Synchronize components with external systems like timers or APIs.',
        code: 'useEffect(() => {\n  console.log("Component mounted or re-rendered");\n  return () => console.log("Cleanup on unmount");\n}, []);'
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    q: 'Which HTML tag represents self-contained, independently distributable content?',
    options: ['<div>', '<article>', '<section>', '<aside>'],
    answer: 1
  },
  {
    q: 'In Flexbox, which property aligns items along the cross axis?',
    options: ['justify-content', 'align-items', 'flex-direction', 'gap'],
    answer: 1
  },
  {
    q: 'Which React hook handles local state in a functional component?',
    options: ['useEffect', 'useMemo', 'useState', 'useRef'],
    answer: 2
  }
];

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(MODULES[0].id);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const activeModule = MODULES.find((m) => m.id === activeModuleId);

  const toggleTopicCompleted = (topicName) => {
    setCompletedTopics((prev) =>
      prev.includes(topicName)
        ? prev.filter((t) => t !== topicName)
        : [...prev, topicName]
    );
  };

  const handleQuizSelect = (qIdx, optIdx) => {
    setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) score += 1;
    });
    return score;
  };

  const totalTopics = MODULES.reduce((acc, m) => acc + m.topics.length, 0);
  const progressPct = Math.round((completedTopics.length / totalTopics) * 100);

  return (
    <div className="learning-app">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="nav-brand">
          <span className="logo-icon">&lt;/&gt;</span>
          <span className="brand-text">FrontendDev Hub</span>
        </div>
        <div className="overall-progress">
          <span>Overall Progress: {progressPct}%</span>
          <div className="progress-bar-bg">
            <div className="progress-fill" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-content">
        {/* Sidebar Nav */}
        <aside className="sidebar">
          <h3>Curriculum</h3>
          <ul className="module-list">
            {MODULES.map((module) => (
              <li
                key={module.id}
                className={`module-item ${activeModuleId === module.id ? 'active' : ''}`}
                onClick={() => setActiveModuleId(module.id)}
              >
                <div className="module-item-title">{module.title}</div>
                <div className="module-item-badge">{module.tag}</div>
              </li>
            ))}
          </ul>

          <div className="quick-tip-card">
            <h4>Tip for Beginners</h4>
            <p>Write out the code snippets by hand in your editor rather than copy-pasting to build muscle memory.</p>
          </div>
        </aside>

        {/* Learning Workspace */}
        <main className="workspace">
          {/* Module Banner */}
          <section className="module-header">
            <div className="header-meta">
              <span className="tag-badge">{activeModule.tag}</span>
              <span className="level-badge">{activeModule.level}</span>
            </div>
            <h2>{activeModule.title}</h2>
            <p className="module-desc">{activeModule.description}</p>
          </section>

          {/* Topics & Code */}
          <section className="topics-section">
            <h3>Key Concepts & Code Samples</h3>
            <div className="cards-grid">
              {activeModule.topics.map((topic) => {
                const isDone = completedTopics.includes(topic.name);
                return (
                  <div key={topic.name} className={`topic-card ${isDone ? 'completed-card' : ''}`}>
                    <div className="card-top">
                      <h4>{topic.name}</h4>
                      <button
                        className={`mark-btn ${isDone ? 'btn-done' : ''}`}
                        onClick={() => toggleTopicCompleted(topic.name)}
                      >
                        {isDone ? '✓ Completed' : 'Mark as Done'}
                      </button>
                    </div>
                    <p>{topic.summary}</p>
                    <div className="code-block">
                      <pre>
                        <code>{topic.code}</code>
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Mini Knowledge Check */}
          <section className="quiz-section">
            <h3>Knowledge Check</h3>
            <p className="quiz-intro">Test what you have learned so far.</p>

            <div className="quiz-container">
              {QUIZ_QUESTIONS.map((q, qIdx) => (
                <div key={qIdx} className="quiz-question-box">
                  <p className="question-title">
                    {qIdx + 1}. {q.q}
                  </p>
                  <div className="options-grid">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        className={`option-btn ${
                          quizAnswers[qIdx] === optIdx ? 'selected' : ''
                        }`}
                        onClick={() => handleQuizSelect(qIdx, optIdx)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="quiz-actions">
                <button
                  className="submit-quiz-btn"
                  onClick={() => setShowQuizResult(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                >
                  Check Answers
                </button>
                {showQuizResult && (
                  <span className="quiz-result-text">
                    You scored {calculateScore()} / {QUIZ_QUESTIONS.length}!
                  </span>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}