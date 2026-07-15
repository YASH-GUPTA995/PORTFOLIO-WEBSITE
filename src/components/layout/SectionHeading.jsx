import { motion } from 'framer-motion'
import { fadeInUp } from '../../constants/animations'

/**
 * Consistent heading used at the top of every page section.
 * `eyebrow` is a small label above the title (e.g. "02 — Skills").
 */
export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}`}
    >
      {eyebrow && (
        <span className="block text-sm font-mono text-primary mb-3 tracking-wide">{eyebrow}</span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
      {description && <p className="mt-4 text-muted text-base md:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  )
}
