import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import { NAV_ITEMS, SOCIAL_LINKS } from '../../constants'
import Button from './Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight nav item for section currently in view (home page only)
  useEffect(() => {
    if (location.pathname !== '/') return
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.to)).filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [location.pathname])

  const handleNavClick = useCallback(
    (to) => (e) => {
      e.preventDefault()
      setMenuOpen(false)
      if (location.pathname !== '/') {
        navigate('/')
        // wait for route change then scroll
        setTimeout(() => {
          document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' })
        }, 60)
      } else {
        document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [location.pathname, navigate]
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-background/85 backdrop-blur-md border-b border-white/5 shadow-soft' : 'py-4 bg-transparent'
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        <a
          href="#home"
          onClick={handleNavClick('home')}
          className="font-mono text-lg font-bold text-white tracking-tight"
        >
          YG<span className="text-primary">.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <a
                href={`#${item.to}`}
                onClick={handleNavClick(item.to)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.to && location.pathname === '/'
                    ? 'text-primary'
                    : 'text-muted hover:text-white'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href={SOCIAL_LINKS.resume} icon={FiDownload} variant="outline" className="!py-2">
            Resume
          </Button>
        </div>

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-background border-t border-white/5 px-6 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <a
                  href={`#${item.to}`}
                  onClick={handleNavClick(item.to)}
                  className="block py-2.5 text-sm font-medium text-muted hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button href={SOCIAL_LINKS.resume} icon={FiDownload} variant="outline" className="w-full justify-center">
                Resume
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
