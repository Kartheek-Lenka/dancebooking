import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { DanceStory } from "@/components/dance-story";
import { DanceStyles } from "@/components/dance-styles";
import { VideoCarousel } from "@/components/video-carousel";
import { AboutSection } from "@/components/about-section";
import { Occasions } from "@/components/occasions";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DanceStory />
        <DanceStyles />
        <VideoCarousel />
        <AboutSection />
        <Occasions />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
