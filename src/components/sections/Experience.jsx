import SectionHeading from '../layout/SectionHeading'
import Timeline from '../layout/Timeline'
import { experience } from '../../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-white/[0.015]">
      <div className="section-container max-w-3xl">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <Timeline items={experience} />
      </div>
    </section>
  )
}
