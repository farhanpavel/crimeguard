import Header from "@/components/Header/page";
import Image from "next/image";
import Hero from "./_home/Hero";
import SubHero from "./_home/SubHero";
import Benefits from "./_home/Benefit";
import Works from "./_home/Works";
import Carousel from "@/components/Carousel/page";
import BottomCard from "./_home/BottomCard";
import Bottom from "./_home/Bottom";
import Footer from "@/components/Footer/page";

export default function Home() {
  return (
    <div>
      <div className="border-b-[1px] border-gray-300 bg-[#F7F7F7]">
        <Header />
      </div>
      <div className="bg-[#F7F7F7] p-4">
        <Hero />
      </div>
      <div className="mt-10">
        <SubHero />
      </div>
      <div className="bg-head mt-5">
        <Benefits />
      </div>
      <div className="bg-[#F7F7F7]">
        <Works />
        <Carousel />
        <BottomCard />
        <Bottom />
        <Footer />
      </div>
    </div>
  );
}
