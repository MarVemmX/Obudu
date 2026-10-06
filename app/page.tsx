"use client";

import React, { useState } from "react";
import { ObuduJourney } from "@/components/ObuduJourney";
import { ClassicLandingPage } from "@/components/ClassicLandingPage";

export default function Home() {
  const [experienceMode, setExperienceMode] = useState<"immersive" | "classic">(
    "classic"
  );

  const handleSwitchToClassic = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    setExperienceMode("classic");
  };

  const handleSwitchToImmersive = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    setExperienceMode("immersive");
  };

  return (
    <main className="relative min-h-screen w-full bg-[#18311B]">
      {experienceMode === "immersive" ? (
        <ObuduJourney onSwitchToClassic={handleSwitchToClassic} />
      ) : (
        <ClassicLandingPage onSwitchToImmersive={handleSwitchToImmersive} />
      )}
    </main>
  );
}
