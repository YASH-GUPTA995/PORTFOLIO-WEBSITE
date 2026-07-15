import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMonitor, FiZap } from 'react-icons/fi'
import SectionHeading from '../layout/SectionHeading'
import ProjectCard from '../layout/ProjectCard'
import { techProjects, coreProjects } from '../../data/projects'
import { staggerContainer } from '../../constants/animations'

const TABS = [
  { id: 'tech', label: 'Tech Projects', icon: FiMonitor },
  { id: 'core', label: 'Core Projects', icon: FiZap },
]

export default function Projects() {
  const [activeTab, setActiveTab] = useState('tech')
  const projects = activeTab === 'tech' ? techProjects : coreProjects

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A mix of full-stack software, machine learning systems, and the embedded/electrical projects where it all started."
        />

        <div className="inline-flex bg-card border border-white/5 rounded-xl p-1 mb-10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-background' : 'text-muted hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-tab-bg"
                    className="absolute inset-0 bg-primary rounded-lg"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <tab.icon className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} variant={activeTab} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
