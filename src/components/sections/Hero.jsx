import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import Button from '../layout/Button'
import { ROLES, SOCIAL_LINKS } from '../../constants'
import { fadeInUp, fadeIn } from '../../constants/animations'

// Lightweight typing/rotating effect over ROLES — no extra dependency needed.
function useTypingRoles(roles, typingSpeed = 70, pauseTime = 1400) {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseTime)
    } else if (deleting && text === '') {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    } else {
      timeout = setTimeout(
        () => {
          setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)))
        },
        deleting ? typingSpeed / 2 : typingSpeed
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex, roles, typingSpeed, pauseTime])

  return text
}

export default function Hero() {
  const typedRole = useTypingRoles(ROLES)

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Ambient background grid, kept subtle per "no unnecessary effects" */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-1/3 right-[-10%] w-[420px] h-[420px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <motion.p variants={fadeInUp} custom={0} className="font-mono text-primary text-sm mb-4">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
          >
            Yash Gupta
          </motion.h1>

          <motion.div variants={fadeInUp} custom={2} className="mt-4 h-9 flex items-center">
            <span className="text-xl md:text-2xl font-semibold text-gradient">{typedRole}</span>
            <span className="w-[2px] h-6 bg-primary ml-1 animate-blink" aria-hidden="true" />
          </motion.div>

          <motion.p variants={fadeInUp} custom={3} className="mt-6 text-muted text-base md:text-lg leading-relaxed max-w-xl">
            I build scalable web applications, solve challenging algorithmic problems, and enjoy creating
            impactful software solutions.
          </motion.p>

          <motion.div variants={fadeInUp} custom={4} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={SOCIAL_LINKS.resume} icon={FiDownload} variant="primary">
              Download Resume
            </Button>
            <Button href={SOCIAL_LINKS.github} icon={FiGithub} variant="outline">
              GitHub
            </Button>
            <Button href={SOCIAL_LINKS.linkedin} icon={FiLinkedin} variant="outline">
              LinkedIn
            </Button>
            <Button href={SOCIAL_LINKS.leetcode} icon={SiLeetcode} variant="outline">
              LeetCode
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="hidden lg:block">
          <CodeIllustration />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-primary transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        aria-label="Scroll to About section"
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  )
}

// Abstract coding-themed illustration in place of a profile photo.
function CodeIllustration() {
  return (
    <svg viewBox="0 0 480 420" className="w-full max-w-md mx-auto" role="img" aria-label="Abstract code editor illustration">
      <rect x="20" y="20" width="440" height="380" rx="16" fill="#1E293B" stroke="#38BDF8" strokeOpacity="0.15" />
      <rect x="20" y="20" width="440" height="44" rx="16" fill="#1E293B" />
      <circle cx="48" cy="42" r="6" fill="#F87171" />
      <circle cx="70" cy="42" r="6" fill="#FBBF24" />
      <circle cx="92" cy="42" r="6" fill="#34D399" />

      <g fontFamily="monospace" fontSize="13" fill="#94A3B8">
        <rect x="48" y="92" width="120" height="10" rx="4" fill="#38BDF8" fillOpacity="0.6" />
        <rect x="48" y="116" width="220" height="10" rx="4" fill="#60A5FA" fillOpacity="0.45" />
        <rect x="72" y="140" width="180" height="10" rx="4" fill="#94A3B8" fillOpacity="0.4" />
        <rect x="72" y="164" width="150" height="10" rx="4" fill="#94A3B8" fillOpacity="0.4" />
        <rect x="48" y="188" width="90" height="10" rx="4" fill="#38BDF8" fillOpacity="0.6" />
        <rect x="72" y="212" width="200" height="10" rx="4" fill="#94A3B8" fillOpacity="0.3" />
        <rect x="72" y="236" width="130" height="10" rx="4" fill="#94A3B8" fillOpacity="0.3" />
        <rect x="48" y="260" width="70" height="10" rx="4" fill="#60A5FA" fillOpacity="0.5" />
      </g>

      <g opacity="0.9">
        <circle cx="360" cy="220" r="60" fill="#38BDF8" fillOpacity="0.08" />
        <path
          d="M330 210 L310 230 L330 250 M390 210 L410 230 L390 250 M365 195 L355 265"
          stroke="#38BDF8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      <rect x="48" y="330" width="384" height="8" rx="4" fill="#0F172A" />
      <rect x="48" y="330" width="260" height="8" rx="4" fill="#38BDF8" />
    </svg>
  )
}
