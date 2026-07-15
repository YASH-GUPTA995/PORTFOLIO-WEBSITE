import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiGithub, FiExternalLink, FiLayers } from 'react-icons/fi'
import Button from '../components/layout/Button'
import { getTechProjectBySlug } from '../data/projects'
import { fadeInUp, staggerContainer } from '../constants/animations'

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = getTechProjectBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) return <Navigate to="/" replace />

  const { title, description, stack, github, demo, details, hasArchitecturePage } = project

  const blocks = [
    { heading: 'Overview', body: details.overview },
    { heading: 'Problem Statement', body: details.problem },
    { heading: 'Architecture', body: details.architecture },
    { heading: 'Implementation', body: details.implementation },
  ]

  return (
    <main className="pt-32 pb-24">
      <div className="section-container max-w-3xl">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white mb-8">
          <FiArrowLeft /> Back to projects
        </Link>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
          <p className="mt-4 text-muted text-base leading-relaxed">{description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span key={tech} className="text-xs text-muted border border-white/10 rounded-md px-2 py-1">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={github} icon={FiGithub} variant="outline">
              GitHub
            </Button>
            {demo && (
              <Button href={demo} icon={FiExternalLink} variant="outline">
                Live Demo
              </Button>
            )}
            {hasArchitecturePage && (
              <Button href={`/project/${project.slug}/architecture`} icon={FiLayers} variant="primary">
                System Architecture Deep Dive
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-14 space-y-10"
        >
          {blocks.map((block, i) => (
            <motion.section key={block.heading} variants={fadeInUp} custom={i}>
              <h2 className="text-lg font-semibold text-white mb-2">{block.heading}</h2>
              <p className="text-muted text-sm leading-relaxed">{block.body}</p>
            </motion.section>
          ))}

          {details.challenges?.length > 0 && (
            <motion.section variants={fadeInUp} custom={blocks.length}>
              <h2 className="text-lg font-semibold text-white mb-3">Challenges</h2>
              <ul className="space-y-2">
                {details.challenges.map((c) => (
                  <li key={c} className="text-sm text-muted flex gap-2">
                    <span className="text-primary">—</span> {c}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {details.futureImprovements?.length > 0 && (
            <motion.section variants={fadeInUp} custom={blocks.length + 1}>
              <h2 className="text-lg font-semibold text-white mb-3">Future Improvements</h2>
              <ul className="space-y-2">
                {details.futureImprovements.map((f) => (
                  <li key={f} className="text-sm text-muted flex gap-2">
                    <span className="text-primary">—</span> {f}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          <motion.section variants={fadeInUp} custom={blocks.length + 2}>
            <h2 className="text-lg font-semibold text-white mb-3">Screenshots</h2>
            <div className="border border-dashed border-white/10 rounded-xl p-10 text-center text-sm text-muted">
              Add product screenshots here (e.g. import from src/assets/images and render in a grid).
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  )
}
