import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import SectionHeading from '../layout/SectionHeading'
import { fadeInUp, staggerContainer } from '../../constants/animations'
import { QUICK_FACTS, PROFILE } from '../../constants'

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="About" title="From circuits to software" />

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-3 space-y-5 text-muted leading-relaxed text-base md:text-[17px]"
          >
            <p>
              I started my undergraduate degree in Electrical Engineering at{' '}
              <span className="text-white font-medium">{PROFILE.college}</span>, drawn to the discipline
              of understanding systems from first principles — signals, circuits, and control theory.
              Somewhere in the middle of debugging a motor control loop, I realized the part I enjoyed
              most wasn&apos;t the hardware itself, but the logic that made it behave intelligently. That
              curiosity pulled me toward software.
            </p>
            <p>
              Since then I&apos;ve built full-stack applications end to end, from REST APIs and database
              schemas to production-ready React interfaces, and spent time in machine learning — training
              models, evaluating them rigorously, and shipping them behind usable interfaces. A research
              internship at IIT Mandi let me combine both worlds, applying ML to real sensor hardware.
            </p>
            <p>
              In parallel, I&apos;ve treated problem solving as a discipline of its own: 250+ DSA problems
              solved, a strong grounding in core computer science, and a habit of finishing what I start.
              I care about writing software that is correct, readable, and built to last past the first
              demo.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-7 shadow-soft">
              <h3 className="font-mono text-sm text-primary mb-1">Quick Facts</h3>
              <p className="text-xs text-muted mb-5">
                {PROFILE.degree} · CGPA {PROFILE.cgpa}
              </p>

              <ul className="space-y-3.5">
                {QUICK_FACTS.map((fact, i) => (
                  <motion.li key={fact} variants={fadeInUp} custom={i} className="flex items-start gap-2.5 text-sm text-white/90">
                    <FiCheckCircle className="text-primary mt-0.5 shrink-0" />
                    {fact}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
