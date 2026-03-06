import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <SplashScreen>
      <div className="w-full bg-[#111] overflow-x-hidden selection:bg-[#000080] selection:text-white">
        <SideNav />
        <Hero />
        <Introduction />
        <TechStack />
        <Experience />
        <Footer />
      </div>
    </SplashScreen>
  );
}

