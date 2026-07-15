import { motion } from 'framer-motion'
import { FiUsers } from 'react-icons/fi'
import SectionHeading from '../layout/SectionHeading'
import { leadership } from '../../data/achievements'
import { staggerContainer, fadeInUp } from '../../constants/animations'

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 md:py-32 bg-white/[0.015]">
      <div className="section-container">
        <SectionHeading eyebrow="Leadership" title="Beyond the classroom" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 gap-5"
        >
          {leadership.map((item, i) => (
            <motion.div
              key={item.role}
              variants={fadeInUp}
              custom={i}
              className="flex items-start gap-4 bg-card border border-white/5 rounded-2xl p-6"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <FiUsers className="text-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{item.role}</h3>
                <p className="text-sm text-muted mt-1">{item.organization}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
