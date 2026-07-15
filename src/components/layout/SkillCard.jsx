import { motion } from 'framer-motion'
import * as SiIcons from 'react-icons/si'
import * as FaIcons from 'react-icons/fa'
import { fadeInUp } from '../../constants/animations'

// Resolve an icon name string (e.g. "SiReact") to its component,
// checking the si and fa icon sets used across skills.js
function resolveIcon(name) {
  return SiIcons[name] || FaIcons[name] || null
}

export default function SkillCard({ name, icon, index = 0 }) {
  const Icon = resolveIcon(icon)

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -4 }}
      className="group flex items-center gap-3 bg-card border border-white/5 rounded-xl px-4 py-3.5 hover:border-primary/40 transition-colors"
    >
      {Icon && <Icon className="text-xl text-primary group-hover:text-accent transition-colors shrink-0" />}
      <span className="text-sm font-medium text-white/90">{name}</span>
    </motion.div>
  )
}
