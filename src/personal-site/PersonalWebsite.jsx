import AvatarHero from "./sections/AvatarHero";
import BioHeader from "./sections/BioHeader";
import ContactSection from "./sections/ContactSection";
import GlobalFooter from "./sections/GlobalFooter";
import PortfolioGallery from "./sections/PortfolioGallery";
import ResumeTimeline from "./sections/ResumeTimeline";
import SocialStrip from "./sections/SocialStrip";

export default function PersonalWebsite() {
  return (
    <main className="site-page">
      <div className="site-shell">
        <AvatarHero />
        <BioHeader />
        <SocialStrip />
        <ResumeTimeline />
        <PortfolioGallery />
        <ContactSection />
      </div>
      <GlobalFooter />
    </main>
  );
}
