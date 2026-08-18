import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { DanceStory } from "@/components/dance-story";
import { HowItWorks } from "@/components/how-it-works";
import { VideoCarousel } from "@/components/video-carousel";
import { AboutSection } from "@/components/about-section";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DanceStory />
        <HowItWorks />
        <VideoCarousel />
        <AboutSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
