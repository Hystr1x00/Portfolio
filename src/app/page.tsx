import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import SideNav from "@/components/SideNav";
import SplashScreen from "@/components/SplashScreen";

// Dynamically import heavy below-the-fold components
const Introduction = dynamic(() => import("@/components/Introduction"));
const TechStack = dynamic(() => import("@/components/TechStack"));
const Experience = dynamic(() => import("@/components/Experience"));
const RetroTV = dynamic(() => import("@/components/RetroTV"));
const Organizations = dynamic(() => import("@/components/Organizations"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <SplashScreen>
      <div className="w-full bg-[#111] overflow-x-hidden selection:bg-[#000080] selection:text-white">
        <SideNav />
        <Hero />
        <Introduction />
        <TechStack />
        <Experience />
        <RetroTV />
        <Organizations />
        <Footer />
      </div>
    </SplashScreen>
  );
}
