import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import { getTechProjectBySlug } from '../data/projects'
import { fadeInUp, staggerContainer } from '../constants/animations'

/**
 * A deeper, interview-oriented technical breakdown for flagship projects.
 * Only rendered when the project's data flags `hasArchitecturePage: true`.
 */
export default function ProjectArchitecture() {
  const { slug } = useParams()
  const project = getTechProjectBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project || !project.hasArchitecturePage) return <Navigate to="/" replace />

  return (
    <main className="pt-32 pb-24">
      <div className="section-container max-w-4xl">
        <Link
          to={`/project/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-white mb-8"
        >
          <FiArrowLeft /> Back to {project.title}
        </Link>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <span className="font-mono text-sm text-primary">System Architecture</span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white tracking-tight">{project.title}</h1>
          <p className="mt-4 text-muted text-base leading-relaxed max-w-2xl">
            A closer look at how the system is put together: authentication, data model, API design,
            code organization, and the trade-offs behind each decision.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mt-14 space-y-16">
          <AuthFlowSection />
          <SchemaSection />
          <ApiArchitectureSection />
          <FolderStructureSection />
          <ScreenshotsSection />
          <DecisionsSection />
        </motion.div>
      </div>
    </main>
  )
}

function Block({ title, children, index = 0 }) {
  return (
    <motion.section variants={fadeInUp} custom={index}>
      <h2 className="text-xl font-semibold text-white mb-5">{title}</h2>
      {children}
    </motion.section>
  )
}

function DiagramBox({ label, sub }) {
  return (
    <div className="bg-background border border-white/10 rounded-lg px-4 py-3 text-center min-w-[130px]">
      <p className="text-sm font-medium text-white">{label}</p>
      {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
    </div>
  )
}

function Arrow({ label }) {
  return (
    <div className="flex flex-col items-center px-2 text-primary shrink-0">
      <span className="text-lg leading-none">→</span>
      {label && <span className="text-[10px] text-muted mt-0.5 whitespace-nowrap">{label}</span>}
    </div>
  )
}

function AuthFlowSection() {
  return (
    <Block title="Authentication Flow (JWT)" index={0}>
      <div className="bg-card border border-white/5 rounded-2xl p-6 overflow-x-auto">
        <div className="flex items-center min-w-max">
          <DiagramBox label="Client" sub="Login form" />
          <Arrow label="credentials" />
          <DiagramBox label="Auth API" sub="/api/auth/login" />
          <Arrow label="verify" />
          <DiagramBox label="MongoDB" sub="users collection" />
        </div>
        <div className="flex items-center min-w-max mt-6">
          <DiagramBox label="Auth API" sub="signs token" />
          <Arrow label="JWT" />
          <DiagramBox label="Client" sub="stores token" />
          <Arrow label="Authorization header" />
          <DiagramBox label="Protected routes" sub="RBAC middleware" />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted leading-relaxed">
        On login, credentials are verified against the users collection and a signed JWT encoding the
        user&apos;s role (Student, Company, or TPO Admin) is issued. Every subsequent request carries the
        token in the Authorization header; middleware verifies the signature and expiry before checking
        role-based permissions for that route.
      </p>
    </Block>
  )
}

function SchemaSection() {
  const entities = [
    { name: 'User', fields: ['_id', 'name', 'email', 'passwordHash', 'role'] },
    { name: 'Student', fields: ['_id', 'userId → User', 'cgpa', 'branch', 'backlogs', 'resumeUrl'] },
    { name: 'Company', fields: ['_id', 'userId → User', 'name', 'industry', 'eligibilityCriteria'] },
    { name: 'Drive', fields: ['_id', 'companyId → Company', 'role', 'ctc', 'eligibility', 'status'] },
    { name: 'Application', fields: ['_id', 'driveId → Drive', 'studentId → Student', 'status', 'appliedAt'] },
  ]

  return (
    <Block title="Database Schema (ER Overview)" index={1}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entities.map((entity) => (
          <div key={entity.name} className="bg-card border border-white/5 rounded-xl overflow-hidden">
            <div className="bg-primary/10 border-b border-primary/20 px-4 py-2.5">
              <span className="text-sm font-mono text-primary">{entity.name}</span>
            </div>
            <ul className="px-4 py-3 space-y-1.5">
              {entity.fields.map((f) => (
                <li key={f} className="text-xs text-muted font-mono">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted leading-relaxed">
        Student and Company profiles reference a shared User document for authentication, keeping
        credential storage separate from role-specific data. A Drive belongs to a Company; an
        Application links a Student to a Drive, tracking status through the recruitment lifecycle.
      </p>
    </Block>
  )
}

function ApiArchitectureSection() {
  const groups = [
    { resource: '/api/auth', purpose: 'Login, registration, token refresh' },
    { resource: '/api/students', purpose: 'Student profile CRUD, resume upload' },
    { resource: '/api/companies', purpose: 'Company profile CRUD, drive creation' },
    { resource: '/api/drives', purpose: 'Drive listing, eligibility evaluation' },
    { resource: '/api/applications', purpose: 'Apply, status updates, export' },
    { resource: '/api/admin', purpose: 'TPO-only oversight and reporting endpoints' },
  ]

  return (
    <Block title="API Architecture" index={2}>
      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left text-muted text-xs uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">Resource group</th>
              <th className="px-5 py-3 font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g.resource} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-3 font-mono text-primary text-xs">{g.resource}</td>
                <td className="px-5 py-3 text-muted">{g.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted leading-relaxed">
        Over 40 endpoints are organized by resource, with a shared middleware chain (auth → role check →
        eligibility validation → controller) applied consistently across groups rather than duplicated
        per route.
      </p>
    </Block>
  )
}

function FolderStructureSection() {
  return (
    <Block title="Folder Structure" index={3}>
      <pre className="bg-card border border-white/5 rounded-2xl p-6 text-xs text-muted font-mono leading-relaxed overflow-x-auto">
{`server/
├── config/          # DB connection, environment setup
├── middleware/       # auth, role-based access, error handling
├── models/           # User, Student, Company, Drive, Application
├── controllers/       # business logic per resource
├── routes/            # Express routers grouped by resource
├── utils/             # eligibility engine, Excel import/export helpers
└── server.js

client/
├── src/
│   ├── dashboards/    # Student, Company, TPO Admin dashboards
│   ├── components/    # shared UI (tables, forms, charts)
│   ├── context/        # auth context, role-based route guards
│   └── api/             # typed API client wrappers`}
      </pre>
    </Block>
  )
}

function ScreenshotsSection() {
  const dashboards = ['Student Dashboard', 'Company Dashboard', 'TPO Admin Dashboard']
  return (
    <Block title="Dashboard Screenshots" index={4}>
      <div className="grid sm:grid-cols-3 gap-4">
        {dashboards.map((name) => (
          <div
            key={name}
            className="aspect-video bg-card border border-dashed border-white/10 rounded-xl flex items-center justify-center text-center px-4"
          >
            <span className="text-xs text-muted">{name} screenshot placeholder</span>
          </div>
        ))}
      </div>
    </Block>
  )
}

function DecisionsSection() {
  const decisions = [
    {
      title: 'JWT over server-side sessions',
      body: 'Chosen for statelessness across three separate dashboards and easier horizontal scaling, at the cost of needing careful token expiry and refresh handling.',
    },
    {
      title: 'Rule-based eligibility engine',
      body: 'Eligibility criteria are stored as data (CGPA thresholds, branch lists, backlog limits) rather than hardcoded per company, trading a small amount of query complexity for flexibility as new drives are added.',
    },
    {
      title: 'Synchronous Excel import for v1',
      body: 'Bulk import currently runs synchronously for simplicity; the trade-off is a blocking request on very large files, which is the first candidate for a background job queue.',
    },
  ]

  return (
    <Block title="Key Engineering Decisions & Trade-offs" index={5}>
      <div className="space-y-4">
        {decisions.map((d) => (
          <div key={d.title} className="bg-card border border-white/5 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white">{d.title}</h3>
            <p className="text-sm text-muted mt-1.5 leading-relaxed">{d.body}</p>
          </div>
        ))}
      </div>
    </Block>
  )
}
