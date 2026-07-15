import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'
import { fadeInUp } from '../../constants/animations'

/**
 * Renders a single project. Works for both "tech" projects (which link to a
 * case-study page and may show feature highlights) and lighter "core" projects.
 */
export default function ProjectCard({ project, index = 0, variant = 'tech' }) {
  const { title, tagline, description, stack, features, github, demo, caseStudy } = project

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col h-full bg-card border border-white/5 rounded-2xl p-6 md:p-7 hover:border-primary/30 transition-colors shadow-soft"
    >
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
        {tagline && <p className="mt-1 text-sm text-primary/90">{tagline}</p>}
        <p className="mt-3 text-sm text-muted leading-relaxed">{description}</p>

        {features && features.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {features.slice(0, 4).map((f) => (
              <li
                key={f}
                className="text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full px-2.5 py-1"
              >
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span key={tech} className="text-xs text-muted border border-white/10 rounded-md px-2 py-1">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-4 text-sm">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-muted hover:text-white transition-colors"
        >
          <FiGithub /> Code
        </a>
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted hover:text-white transition-colors"
          >
            <FiExternalLink /> Live Demo
          </a>
        )}
        {variant === 'tech' && caseStudy && (
          <Link
            to={caseStudy}
            className="ml-auto inline-flex items-center gap-1 text-primary hover:text-accent font-medium transition-colors"
          >
            Case Study <FiArrowUpRight />
          </Link>
        )}
      </div>
    </motion.div>
  )
}
