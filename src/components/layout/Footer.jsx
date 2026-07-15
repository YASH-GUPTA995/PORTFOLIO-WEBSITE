import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { SOCIAL_LINKS } from '../../constants'

export default function Footer() {
  const year = new Date().getFullYear()

  const links = [
    { icon: FiGithub, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: FiLinkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: SiLeetcode, href: SOCIAL_LINKS.leetcode, label: 'LeetCode' },
    { icon: FiMail, href: `mailto:${SOCIAL_LINKS.email}`, label: 'Email' },
  ]

  return (
    <footer className="border-t border-white/5 py-10">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted">© {year} Yash Gupta. Built with React &amp; Tailwind CSS.</p>

        <div className="flex items-center gap-5">
          {links.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-primary transition-colors text-lg"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
