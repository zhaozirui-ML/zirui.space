import { profile } from "../site-data";

export default function BioHeader() {
  return (
    <section className="bio-header">
      <p className="bio-header__location">{profile.location}</p>
      <h1 className="display-name">{profile.displayName}</h1>
      <p className="tagline">{profile.tagline}</p>
      {profile.introLines.map((line) => (
        <p className="bio-header__intro" key={line}>
          {line}
        </p>
      ))}
    </section>
  );
}
