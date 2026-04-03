import SectionHeader from "../components/SectionHeader";
import { timelineItems } from "../site-data";

export default function ResumeTimeline() {
  return (
    <section className="site-section">
      <SectionHeader
        description="我的工作经历主要围绕复杂业务、系统体验与设计提效展开。"
        eyebrow="Experience"
        title="工作经历"
      />

      <ul className="timeline">
        {timelineItems.map((item) => (
          <li className="timeline-item" key={`${item.period}-${item.role}`}>
            <div className="timeline-item__rail">
              <span className="timeline-item__dot" />
              <span className="timeline-item__line" />
            </div>
            <div className="timeline-item__content">
              <p className="timeline-item__period">{item.period}</p>
              <h3 className="timeline-item__role">{item.role}</h3>
              <p className="timeline-item__company">{item.company}</p>
              <p className="timeline-item__summary">{item.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
