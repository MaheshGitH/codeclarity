const HeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="bg-linear bg-clip-text text-transparent ~text-4xl/7xl font-bold font-manrope">
        CodeClarity
      </h1>
      <p className="text-secondary max-w-[640px] w-full text-center ~text-base/2xl">
        Practice explaining code like in real interviews. Refine your narrative,
        cut the filler, and master the technical dialogue.
      </p>
    </div>
  );
};

export default HeroSection;
