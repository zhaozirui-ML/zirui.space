import { aboutPageContent } from "../data/about-content";
import styles from "../styles/about-page.module.css";

export default function AboutPage() {
  const { beyond, contact, experience, hero, principles } = aboutPageContent;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.description}>{hero.description}</p>

          <ul className={styles.tagList}>
            {hero.tags.map((tag) => (
              <li className={styles.tag} key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <aside className={styles.heroNote}>
          <p className={styles.heroNoteTitle}>{hero.noteTitle}</p>
          <ul className={styles.list}>
            {hero.noteItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{experience.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{experience.title}</h2>
          <p className={styles.sectionDescription}>{experience.description}</p>
        </div>

        <div className={styles.experienceGrid}>
          {experience.items.map((item) => (
            <article className={styles.card} key={item.company}>
              <div className={styles.cardHeader}>
                <p className={styles.cardMeta}>{item.role}</p>
                <h3 className={styles.cardTitle}>{item.company}</h3>
              </div>
              <p className={styles.cardBody}>{item.summary}</p>
              <ul className={styles.compactList}>
                {item.focus.map((focusItem) => (
                  <li key={focusItem}>{focusItem}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{principles.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{principles.title}</h2>
          <p className={styles.sectionDescription}>{principles.description}</p>
        </div>

        <div className={styles.principlesGrid}>
          {principles.items.map((item) => (
            <article className={styles.principleCard} key={item.title}>
              <h3 className={styles.principleTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.supportGrid}>
        <article className={styles.supportCard}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{beyond.eyebrow}</p>
            <h2 className={styles.sectionTitle}>{beyond.title}</h2>
          </div>

          <ul className={styles.list}>
            {beyond.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.supportCard}>
          <div className={styles.contactBlock}>
            <p className={styles.eyebrow}>{contact.eyebrow}</p>
            <h2 className={styles.sectionTitle}>{contact.title}</h2>
            <p className={styles.sectionDescription}>{contact.description}</p>

            <ul className={styles.tagList}>
              {contact.topics.map((topic) => (
                <li className={styles.tag} key={topic}>
                  {topic}
                </li>
              ))}
            </ul>

            <a className={styles.contactLink} href={contact.email}>
              {contact.emailLabel}
            </a>

            <div className={styles.secondaryLinks}>
              {contact.links.map((link) => (
                <a
                  className={styles.secondaryLink}
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
