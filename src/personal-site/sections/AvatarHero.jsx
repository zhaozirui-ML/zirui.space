export default function AvatarHero() {
  return (
    <section className="avatar-hero">
      <div className="avatar-hero__backdrop" />
      <div className="avatar-hero__frame">
        <div aria-hidden="true" className="avatar-img" />
      </div>
    </section>
  );
}
