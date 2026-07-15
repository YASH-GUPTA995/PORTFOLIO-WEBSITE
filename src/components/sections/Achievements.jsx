import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import SectionHeading from '../layout/SectionHeading'
import { achievements } from '../../data/achievements'
import { staggerContainer, fadeInUp } from '../../constants/animations'

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Achievements" title="Milestones along the way" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -4 }}
              className="bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <FiAward className="text-primary text-2xl mb-4" />
              <h3 className="text-white font-semibold">{item.title}</h3>
              <p className="text-sm text-muted mt-1">{item.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
