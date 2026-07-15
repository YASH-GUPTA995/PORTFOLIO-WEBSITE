import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiSend, FiMail } from 'react-icons/fi'
import SectionHeading from '../layout/SectionHeading'
import Button from '../layout/Button'
import { EMAILJS_CONFIG, SOCIAL_LINKS } from '../../constants'
import { fadeInUp } from '../../constants/animations'

const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
}

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(STATUS.IDLE)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus(STATUS.SENDING)

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      )
      setStatus(STATUS.SUCCESS)
      formRef.current.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="section-container max-w-2xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a role, project, or idea in mind? I'd love to hear about it."
          align="center"
        />

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-card border border-white/5 rounded-2xl p-6 md:p-8 space-y-5 shadow-soft"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" name="name" type="text" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Subject" name="subject" type="text" required />
          <Field label="Message" name="message" as="textarea" rows={5} required />

          <div className="flex items-center justify-between pt-2">
            <Button type="submit" icon={FiSend} disabled={status === STATUS.SENDING}>
              {status === STATUS.SENDING ? 'Sending…' : 'Send Message'}
            </Button>

            {status === STATUS.SUCCESS && (
              <span className="text-sm text-emerald-400">Message sent — thank you!</span>
            )}
            {status === STATUS.ERROR && (
              <span className="text-sm text-red-400">Something went wrong. Please try again.</span>
            )}
          </div>
        </motion.form>

        <p className="mt-8 text-center text-sm text-muted flex items-center justify-center gap-2">
          <FiMail /> Prefer email? Reach me directly at{' '}
          <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-primary hover:text-accent">
            {SOCIAL_LINKS.email}
          </a>
        </p>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', as = 'input', rows, required }) {
  const Component = as
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted mb-1.5 block">{label}</span>
      <Component
        name={name}
        type={as === 'input' ? type : undefined}
        rows={rows}
        required={required}
        className="w-full bg-background border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors resize-none"
      />
    </label>
  )
}
