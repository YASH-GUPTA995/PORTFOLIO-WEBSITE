import { motion } from 'framer-motion'
import SectionHeading from '../layout/SectionHeading'
import SkillCard from '../layout/SkillCard'
import { skillGroups } from '../../data/skills'
import { staggerContainer, fadeInUp } from '../../constants/animations'

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-white/[0.015]">
      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I build with"
          description="A working toolkit spanning full-stack development, machine learning, and core computer science fundamentals."
        />

        <div className="space-y-12">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <motion.h3
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-sm font-mono text-muted uppercase tracking-wider mb-4"
              >
                {group.category}
              </motion.h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
              >
                {group.skills.map((skill, i) => (
                  <SkillCard key={skill.name} name={skill.name} icon={skill.icon} index={i} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
