import { motion } from 'framer-motion'
import { fadeInUp } from '../../constants/animations'

export default function Timeline({ items }) {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 hidden sm:block" />

      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={item.role}
            variants={fadeInUp}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative sm:pl-10"
          >
            <span className="hidden sm:block absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-primary shadow-glow" />

            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                {item.achievement && (
                  <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                    {item.achievement}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-primary/90">{item.organization}</p>
              {item.department && <p className="text-sm text-muted">{item.department}</p>}

              <ul className="mt-4 flex flex-wrap gap-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="text-xs text-muted border border-white/10 rounded-md px-2.5 py-1"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
