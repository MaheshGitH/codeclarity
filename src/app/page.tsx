import CodeBlockSection from "@/components/CodeBlockSection";
import HeroSection from "@/components/HeroSection";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <main className="flex flex-col ~gap-[5.5rem]/24 ~mt-12/24 px-4">
      <HeroSection />
      <CodeBlockSection />
      <MainContent />
    </main>
  );
}
