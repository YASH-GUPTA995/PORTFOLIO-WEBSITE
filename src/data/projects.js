// Tech projects: full-stack / software / ML work
export const techProjects = [
  {
    slug: 'placement-system',
    title: 'Campus Placement Management System',
    tagline: 'End-to-end recruitment platform for Students, Companies, and TPO Admins',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    description:
      'Developed a full-stack placement management system with separate dashboards for Students, Companies, and TPO Admins covering the complete recruitment lifecycle.',
    features: [
      '40+ REST APIs',
      'JWT Authentication',
      'Role Based Access Control',
      'Eligibility Engine',
      'Excel Import',
      'Applicant Export',
      'Automated Notifications',
    ],
    github: 'FILL_GITHUB_PLACEMENT',
    demo: 'FILL_PLACEMENT_DEMO',
    caseStudy: '/project/placement-system',
    hasArchitecturePage: true,
    details: {
      overview:
        'A production-grade platform built to replace manual, spreadsheet-driven campus placement coordination with a single system of record for the entire recruitment cycle.',
      problem:
        'The Training and Placement Cell managed eligibility, applications, and communication across three very different user groups by hand, which created delays, inconsistent eligibility checks, and version-drifted spreadsheets.',
      architecture:
        'A three-tier architecture: a React SPA per role, a Node.js/Express REST API layer enforcing role-based access control, and MongoDB as the primary data store, with JWT-based stateless authentication between client and server.',
      challenges: [
        'Designing an eligibility engine that could evaluate CGPA, branch, and backlog rules per company without hardcoding logic',
        'Keeping three distinct dashboards (Student, Company, TPO Admin) consistent while sharing a single API surface',
        'Bulk Excel import/export without blocking the main request thread',
      ],
      implementation:
        'The API exposes over 40 REST endpoints grouped by resource (students, companies, drives, applications). Middleware layers handle authentication, role checks, and eligibility validation before a request reaches its controller. Notifications are dispatched asynchronously after key state transitions such as a new drive being published or an application status changing.',
      futureImprovements: [
        'Move notification dispatch to a message queue for better reliability at scale',
        'Add WebSocket-based live status updates for applicants',
        'Introduce automated integration tests across all three dashboards',
      ],
      screenshots: [],
    },
  },
  {
    slug: 'diamond-predictor',
    title: 'Diamond Price Predictor',
    tagline: 'End-to-end ML pipeline trained on 53K+ records',
    stack: ['Python', 'Scikit Learn', 'XGBoost', 'Pandas', 'NumPy', 'Streamlit'],
    description: 'Built an end-to-end ML pipeline using over 53K records.',
    features: ['R² = 0.9811', '95.98% Classification Accuracy'],
    github: 'FILL_GITHUB_DIAMOND',
    demo: 'FILL_DIAMOND_DEMO',
    caseStudy: '/project/diamond-predictor',
    hasArchitecturePage: false,
    details: {
      overview:
        'A regression and classification pipeline that predicts diamond prices and quality tiers from cut, clarity, carat, and color attributes.',
      problem:
        'Pricing diamonds consistently is difficult because value depends on a non-linear combination of the four Cs, and manual pricing tables do not generalize well across the full range of stones.',
      architecture:
        'A Scikit-Learn and XGBoost pipeline handles preprocessing, feature engineering, and model training, with Streamlit providing an interactive front end for exploring predictions.',
      challenges: [
        'Handling categorical features (cut, color, clarity) without leaking ordinal information incorrectly',
        'Tuning XGBoost hyperparameters to avoid overfitting on a 53K-row dataset',
        'Presenting model confidence in a way non-technical users could interpret in the Streamlit app',
      ],
      implementation:
        'Data was cleaned and feature-engineered in Pandas, with categorical encoding tuned per feature. An XGBoost regressor was trained for price prediction alongside a classifier for quality tiering, evaluated primarily on R² and classification accuracy.',
      futureImprovements: [
        'Add SHAP-based explainability to the Streamlit interface',
        'Retrain periodically on updated market data',
      ],
      screenshots: [],
    },
  },
  {
    slug: 'movie-recommendation',
    title: 'Movie Recommendation System',
    tagline: 'Two-Tower Neural Network trained on MovieLens',
    stack: ['TensorFlow', 'Keras', 'Python'],
    description:
      'Developed a personalized recommendation system using a Two-Tower Neural Network trained on MovieLens.',
    features: [],
    github: 'FILL_GITHUB_MOVIE',
    demo: 'FILL_MOVIE_DEMO',
    caseStudy: '/project/movie-recommendation',
    hasArchitecturePage: false,
    details: {
      overview:
        'A recommendation engine that learns separate embeddings for users and movies, then scores affinity between the two towers to generate personalized rankings.',
      problem:
        'Traditional collaborative filtering struggles with sparse interaction data and cold-start users; a learned embedding approach generalizes better across the MovieLens dataset.',
      architecture:
        'A Two-Tower architecture built in TensorFlow/Keras: one tower embeds user features, the other embeds movie features, and the model is trained to bring embeddings of interacted pairs closer together.',
      challenges: [
        'Structuring negative sampling so the model learns meaningful separation between relevant and irrelevant movies',
        'Balancing embedding dimensionality against training time',
      ],
      implementation:
        'User and movie features were embedded through independent neural towers, trained jointly on MovieLens interaction data, with the dot product of the two embeddings used as the ranking score at inference time.',
      futureImprovements: [
        'Incorporate sequential viewing history for session-aware recommendations',
        'Serve the model behind a lightweight API for live inference',
      ],
      screenshots: [],
    },
  },
]

// Core (Electrical / Embedded) projects
export const coreProjects = [
  {
    slug: 'bldc-motor-control',
    title: 'BLDC Motor Speed Control using Hall Sensors & Back-EMF',
    stack: ['MATLAB', 'Simulink'],
    description:
      'Implemented Hall sensor-based commutation and Back-EMF feedback for closed-loop speed control.',
    github: 'FILL_GITHUB_BLDC',
  },
  {
    slug: 'home-automation',
    title: 'Home Automation System',
    stack: ['Arduino', 'ESP32'],
    description:
      'Developed a smart home automation system using Arduino Uno and ESP32 with wireless control.',
    github: 'FILL_GITHUB_HOME_AUTOMATION',
  },
  {
    slug: 'robot-car',
    title: 'Robot Car',
    stack: ['Arduino', 'HC-05', 'IR Sensor', 'Ultrasonic Sensor'],
    description:
      'Developed a multifunction robot capable of Line Following, Maze Solving, and Bluetooth Control.',
    github: 'FILL_GITHUB_ROBOT',
  },
  {
    slug: 'email-validator',
    title: 'Email Validator Website',
    stack: ['HTML', 'CSS', 'JavaScript'],
    description: 'Built a real-time email validation tool using JavaScript regular expressions.',
    github: 'FILL_GITHUB_EMAIL_VALIDATOR',
  },
]

export const getTechProjectBySlug = (slug) => techProjects.find((p) => p.slug === slug)
