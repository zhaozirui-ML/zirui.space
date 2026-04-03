import { Button } from "../../../design-system";
import { socialLinks } from "../site-data";

export default function SocialStrip() {
  return (
    <section className="social-strip">
      <ul className="social-icons">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <Button
              href={link.href}
              rel="noreferrer"
              size="sm"
              target="_blank"
              variant="chip"
            >
              {link.label}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
