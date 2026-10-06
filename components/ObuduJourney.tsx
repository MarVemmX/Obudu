"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Mountain,
  Calendar,
  Users,
  CheckCircle2,
  Palette,
  X,
  ArrowUpRight,
  ArrowRight,
  Eye,
} from "lucide-react";
import confetti from "canvas-confetti";

import {
  GhibliDefs,
  VintageSafariCar,
  RanchTourBus,
  GhibliCloudPuff,
  IconicObuduEntranceBase,
  IconicObuduEntranceOverhead,
  SerpentineCliffOverlook,
  VillageLamppost,
  CataractWaterfall,
  RoadMarkerStone,
  ObuduCableCarAerialSystem,
  LivingWildlifeCattle,
  LivingWildlifeMonkeys,
  LivingWildlifeBirds,
  LivingWildlifeButterflies,
  ChaletVilla,
  ForegroundCanopy,
  DriftingMistVeil,
  VehiclePerspective,
  FullWorldTerrain,
  MountainRiverAndBridge,
  CliffSideEcosystem,
  PreEntranceGreenHills,
  GhibliClouds,
  GhibliTree,
} from "./GhibliAssets";

// 8 standard isometric directions
type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

// Convert road angle to 8-point compass bearing
function getIsometricDirection(deg: number): Direction {
  if (deg >= 337.5 || deg < 22.5) return "E";
  if (deg >= 22.5 && deg < 67.5) return "SE";
  if (deg >= 67.5 && deg < 112.5) return "S";
  if (deg >= 112.5 && deg < 157.5) return "SW";
  if (deg >= 157.5 && deg < 202.5) return "W";
  if (deg >= 202.5 && deg < 247.5) return "NW";
  if (deg >= 247.5 && deg < 292.5) return "N";
  return "NE";
}

// Map 8-direction bearing to vehicle artwork perspective (corrected non-mirrored geometry)
function directionToPerspective(dir: Direction): VehiclePerspective {
  switch (dir) {
    case "N":
      return "rear";
    case "NE":
      return "rear-left";
    case "E":
      return "side-left";
    case "SE":
      return "front-left";
    case "S":
      return "front";
    case "SW":
      return "front-right";
    case "W":
      return "side-right";
    case "NW":
      return "rear-right";
  }
}

// ==========================================
// STORY CHAPTERS & WAYPOINTS DATA
// ==========================================
interface StoryWaypoint {
  id: string;
  phase: number;
  minScroll: number;
  maxScroll: number;
  title: string;
  subtitle: string;
  altitude: string;
  narrative: string;
  badge: string;
  ghibliImg: string;
  photoLabel: string;
  artisticTransformation: string;
}

const STORY_WAYPOINTS: StoryWaypoint[] = [
  {
    id: "ascent-start",
    phase: 1,
    minScroll: 0.0,
    maxScroll: 0.2,
    title: "The Serpent's Footprint",
    subtitle: "Ascent Foot of the Mountain Pass",
    altitude: "780m Altitude",
    narrative:
      "Leaving the tropical lowlands of Cross River below, our vintage safari 4x4 embarks on the legendary 11km serpentine road. Ahead lie 22 hairpin bends carved into sheer emerald cliffs.",
    badge: "Phase I • 0 – 3.2km",
    ghibliImg: "/images/ghibli-road.jpg",
    photoLabel: "The 11km Serpentine Road",
    artisticTransformation:
      "Whitewashed safety curb stones trace the sheer cliff edge, as the smooth asphalt curves upward overlooking endless misty mountain ridges.",
  },
  {
    id: "devils-elbow",
    phase: 1,
    minScroll: 0.2,
    maxScroll: 0.38,
    title: "Devil's Elbow & The Mist Crags",
    subtitle: "Hairpin Turn 14 of 22",
    altitude: "1,240m Altitude",
    narrative:
      "The asphalt hugs vertiginous ridges where safety curb stones guard the rim. Looking out beyond the cliff reveals endless misty blue mountain layers and cascading waterfalls.",
    badge: "Phase I • 6.4km",
    ghibliImg: "/images/ghibli-road.jpg",
    photoLabel: "Serpentine Cliffside Edge",
    artisticTransformation:
      "Painted in luminous gouache tones: Billowing summer cumulus clouds, wild highland cliff flowers, and deep cobalt ridges dissolving into mountain mists.",
  },
  {
    id: "gateway-crest",
    phase: 2,
    minScroll: 0.38,
    maxScroll: 0.54,
    title: "The Cattle Head Gateway",
    subtitle: "Ridge Crest & Highland Portal",
    altitude: "1,480m Altitude",
    narrative:
      "Crowning the mountain crest, we pass beneath the sacred dry-stone pillars and hand-carved Bull Head archway. Here our vintage 4x4 morphs in a cloud of Ghibli magic into the open-air highland ranch tour bus.",
    badge: "Phase II • Gateway Morph",
    ghibliImg: "/images/ghibli-entrance.jpg",
    photoLabel: "The Cattle Head Gateway",
    artisticTransformation:
      "Hand-dressed granite masonry pillars and heavy cedar crossbeams frame the sacred horned Bull Head guarding the portal to the high plateau.",
  },
  {
    id: "highland-skyway",
    phase: 3,
    minScroll: 0.54,
    maxScroll: 0.77,
    title: "Pastures & The Ranch Village",
    subtitle: "Village Meadows & Cableway",
    altitude: "1,550m Altitude",
    narrative:
      "Gentle White Fulani cattle graze across chartreuse meadows by the village cottages. Above us, Africa's longest cable car glides like a red and gold jewel through drifting mountain mists.",
    badge: "Phase III • Ranch Exploration",
    ghibliImg: "/images/ghibli-village.jpg",
    photoLabel: "Ranch Village Panorama",
    artisticTransformation:
      "Winding driveways curve past clusters of two-tier chalets on stilts, vintage streetlamps, and White Fulani cattle in rolling green meadows.",
  },
  {
    id: "sanctuary-arrival",
    phase: 4,
    minScroll: 0.77,
    maxScroll: 1.0,
    title: "Highland Chalets on Stilts",
    subtitle: "Mountain Lodges & Summit Sanctuary",
    altitude: "1,576m Summit",
    narrative:
      "The tour bus pulls up to the cedar and stone chalets perched on stilts above the cloudline. Crackling hearths, fresh dairy, and ancient stillness await at your sanctuary.",
    badge: "Phase IV • Arrival Sanctuary",
    ghibliImg: "/images/ghibli-chalets.jpg",
    photoLabel: "Plateau Chalets on Stilts",
    artisticTransformation:
      "Two-tier terracotta chalets elevated on stilts above the cloudline, with wrap-around balconies commanding panoramic sunrise vistas.",
  },
];

// Highland Studio Ghibli Art Gallery Collection
interface GalleryArtwork {
  id: string;
  title: string;
  subtitle: string;
  elevation: string;
  ghibliSrc: string;
  atmosphere: string;
  tags: string[];
  desc: string;
}

const PHOTO_ARCHIVE: GalleryArtwork[] = [
  {
    id: "ref-road",
    title: "The 11km Serpentine Road",
    subtitle: "Engineering Marvel of 1951 • 22 Hairpin Turns",
    elevation: "780m – 1,240m",
    ghibliSrc: "/images/ghibli-road.jpg",
    atmosphere: "Luminous morning sunlight breaking through drifting mountain mists",
    tags: ["22 Hairpin Bends", "Emerald Cliff Drops", "White Curb Guardstones", "Cobalt Horizon"],
    desc: "A breathtaking ascent winding up the precipitous cliffs of Cross River. The smooth asphalt ribbon is guarded by signature white barrier curbs, looking outward toward endless layers of atmospheric blue mountain ridges bathed in golden Ghibli gouache.",
  },
  {
    id: "ref-entrance",
    title: "The Cattle Head Archway",
    subtitle: "Sacred Highland Gateway • Ridge Crest Portal",
    elevation: "1,480m",
    ghibliSrc: "/images/ghibli-entrance.jpg",
    atmosphere: "Brisk alpine breeze with billowing cumulus clouds over verdant peaks",
    tags: ["Granite Ashlar Masonry", "Rustic Timber Crossbeams", "Sacred Horned Bull", "Highland Portal"],
    desc: "Crowning the ridge summit, the historic entrance archway stands flanked by dry-stone granite pillars and heavy cedar crossbeams. The magnificent sculpted Bull Head watches over travelers as the road passes from the lowlands into the mystical high plateau.",
  },
  {
    id: "ref-village",
    title: "The Plateau Ranch Village",
    subtitle: "Highland Pastures, Stone Cottages & Skyway",
    elevation: "1,550m",
    ghibliSrc: "/images/ghibli-village.jpg",
    atmosphere: "Crisp mountain air, gentle cowbells, and wandering mists among pine groves",
    tags: ["Two-Tier Chalets", "White Fulani Pastures", "Aerial Cableway", "Winding Driveways"],
    desc: "A timeless highland sanctuary where winding stone roads curve gently through chartreuse meadows. White Fulani cattle graze peacefully beside cedar-shingled cottages on stilts, while Africa's longest cable car glides overhead through swirling clouds.",
  },
  {
    id: "ref-chalets",
    title: "Highland Chalets on Stilts",
    subtitle: "Summit Sanctuary Lodges • Ridge Overlook",
    elevation: "1,576m Summit",
    ghibliSrc: "/images/ghibli-chalets.jpg",
    atmosphere: "Pure dawn twilight with violet and amber gradients across endless mountain seas",
    tags: ["Stilt Architecture", "Wrap-around Balconies", "Cedar & Terracotta", "Summit Ridge"],
    desc: "Perched gracefully on stilts along the edge of the plateau, these two-tier chalets command panoramic views above the clouds. Wrap-around balconies catch the earliest morning sunlight as the vast Nigerian-Cameroon highlands stretch out into infinity.",
  },
];

export interface ObuduJourneyProps {
  onSwitchToClassic?: () => void;
}

export const ObuduJourney: React.FC<ObuduJourneyProps> = ({
  onSwitchToClassic,
}) => {
  // SVG Road Path Ref
  const roadPathRef = useRef<SVGPathElement>(null);

  // Virtual Journey Progress Tracking (0.0 to 1.0)
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Vehicle Tracking State
  const [vehicleState, setVehicleState] = useState<{
    x: number;
    y: number;
    perspective: VehiclePerspective;
    direction: Direction;
    bearingDeg: number;
    isBus: boolean;
    morphProgress: number;
  }>({
    x: 800,
    y: 3520,
    perspective: "rear",
    direction: "N",
    bearingDeg: 270,
    isBus: false,
    morphProgress: 0,
  });

  // Dynamic Camera Center in SVG Coordinates
  const [camera, setCamera] = useState<{ x: number; y: number }>({
    x: 800,
    y: 3400,
  });

  // Storytelling & UI State
  const [activeWaypoint, setActiveWaypoint] = useState<StoryWaypoint>(
    STORY_WAYPOINTS[0]
  );
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [cinemaMode, setCinemaMode] = useState(false);

  // Booking Form State (Phase 4)
  const [chaletType, setChaletType] = useState("Mountain View Chalet");
  const [checkInDate, setCheckInDate] = useState("2026-10-15");
  const [checkOutDate, setCheckOutDate] = useState("2026-10-18");
  const [guestsCount, setGuestsCount] = useState(2);
  const [includeCableCar, setIncludeCableCar] = useState(true);
  const [includeCanopyWalk, setIncludeCanopyWalk] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("OBUDU-842915");

  // Web Audio Synthesizer Ref for ambient wind & birds
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isAudioPlayingRef = useRef<boolean>(true);
  const birdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasPlayedChimeRef = useRef<boolean>(false);

  // Smooth target jump
  const scrollToPhase = useCallback((targetProgress: number) => {
    targetProgressRef.current = Math.max(0, Math.min(1, targetProgress));
  }, []);

  // Update vehicle, camera, and narrative at a given progress
  const updateJourneyState = useCallback((prog: number) => {
    const currentWp =
      STORY_WAYPOINTS.find(
        (w) => prog >= w.minScroll && prog <= w.maxScroll
      ) || STORY_WAYPOINTS[0];
    setActiveWaypoint(currentWp);

    const path = roadPathRef.current;
    if (!path) return;

    try {
      const totalLength = path.getTotalLength();
      const currentDist = prog * totalLength;
      const lookAheadDist = Math.min(currentDist + 4, totalLength);

      const p0 = path.getPointAtLength(
        Math.max(0, Math.min(totalLength, currentDist))
      );
      const p1 = path.getPointAtLength(
        Math.max(0, Math.min(totalLength, lookAheadDist))
      );

      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;

      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (angle < 0) angle += 360;

      const dir = getIsometricDirection(angle);
      const chosenPerspective = directionToPerspective(dir);

      // Phase 2 Morph State (40% - 55% scroll)
      const isBus = prog > 0.48;
      let morphProg = 0;
      if (prog >= 0.42 && prog <= 0.54) {
        morphProg = (prog - 0.42) / (0.54 - 0.42);
      }

      setVehicleState({
        x: p0.x,
        y: p0.y,
        perspective: chosenPerspective,
        direction: dir,
        bearingDeg: angle,
        isBus,
        morphProgress: morphProg,
      });

      // Camera target tracking: follow vehicle closely
      setCamera({
        x: p0.x,
        y: p0.y - 120,
      });
    } catch (e) {
      console.error("Path calculation error:", e);
    }
  }, []);

  // =========================================================
  // DOWNSCROLL-DRIVEN JOURNEY ENGINE (WHEEL, TOUCH, & KEYS)
  // =========================================================
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    targetProgressRef.current = 0;
    currentProgressRef.current = 0;

    // Initial vehicle update
    setTimeout(() => {
      updateJourneyState(0);
    }, 60);

    let animId: number;

    const updateFrame = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.08;
        const prog = Math.max(0, Math.min(1, currentProgressRef.current));
        setScrollProgress(prog);
        updateJourneyState(prog);
      }
      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);

    // Mouse Wheel Handler
    const handleWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement)?.closest(".overflow-y-auto")) {
        return;
      }
      e.preventDefault();
      const delta = e.deltaY * 0.00045;
      targetProgressRef.current = Math.max(
        0,
        Math.min(1, targetProgressRef.current + delta)
      );
    };

    // Touch Support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.closest(".overflow-y-auto")) {
        return;
      }
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      touchStartY = touchCurrentY;
      const delta = deltaY * 0.0012;
      targetProgressRef.current = Math.max(
        0,
        Math.min(1, targetProgressRef.current + delta)
      );
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "SELECT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.max(
          0,
          Math.min(1, targetProgressRef.current + 0.04)
        );
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.max(
          0,
          Math.min(1, targetProgressRef.current - 0.04)
        );
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [updateJourneyState]);

  // ==========================================
  // AMBIENT NATURE AUDIO SYNTHESIZER
  // ==========================================
  // ==========================================
  // AMBIENT NATURE AUDIO SYNTHESIZER & CHIME
  // ==========================================
  const startAmbientAudio = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Pink noise generator for mountain wind
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.035;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(140, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.4, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);
        whiteNoise.start();

        const playBirdChirp = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state !== "running" || !isAudioPlayingRef.current)
            return;
          const osc = ctx.createOscillator();
          const chirpGain = ctx.createGain();
          osc.type = "sine";
          const now = ctx.currentTime;
          osc.frequency.setValueAtTime(2600 + Math.random() * 800, now);
          osc.frequency.exponentialRampToValueAtTime(
            3400 + Math.random() * 400,
            now + 0.12
          );
          osc.frequency.exponentialRampToValueAtTime(
            2200 + Math.random() * 400,
            now + 0.28
          );
          chirpGain.gain.setValueAtTime(0.001, now);
          chirpGain.gain.linearRampToValueAtTime(0.05, now + 0.05);
          chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
          osc.connect(chirpGain);
          chirpGain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.35);

          birdTimerRef.current = setTimeout(playBirdChirp, 3500 + Math.random() * 7000);
        };
        birdTimerRef.current = setTimeout(playBirdChirp, 2000);
      } else {
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }
      }

      isAudioPlayingRef.current = true;
      setIsAudioPlaying(true);
    } catch (err) {
      console.error("Audio initialization error:", err);
    }
  }, []);

  const stopAmbientAudio = useCallback(() => {
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
    if (birdTimerRef.current) {
      clearTimeout(birdTimerRef.current);
      birdTimerRef.current = null;
    }
    isAudioPlayingRef.current = false;
    setIsAudioPlaying(false);
  }, []);

  const toggleAmbientAudio = useCallback(() => {
    if (isAudioPlayingRef.current) {
      stopAmbientAudio();
    } else {
      startAmbientAudio();
    }
  }, [startAmbientAudio, stopAmbientAudio]);

  // Ethereal highland chime played when the reservation card pops up
  const playReservationChime = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;

      let ctx = audioCtxRef.current;
      if (!ctx) {
        ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
      }

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Highland Sanctuary Celestial Pentatonic Chime Chord
      // Notes: E5 (659Hz), G#5 (831Hz), B5 (988Hz), E6 (1319Hz), G#6 (1661Hz)
      const chimeNotes = [
        { freq: 659.25, time: 0.00, duration: 2.2, gain: 0.16 },
        { freq: 830.61, time: 0.09, duration: 2.4, gain: 0.18 },
        { freq: 987.77, time: 0.18, duration: 2.6, gain: 0.20 },
        { freq: 1318.51, time: 0.27, duration: 2.9, gain: 0.18 },
        { freq: 1661.22, time: 0.36, duration: 3.2, gain: 0.14 },
      ];

      const now = ctx.currentTime;

      chimeNotes.forEach((note) => {
        const noteStart = now + note.time;

        // Warm pure fundamental tone
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(note.freq, noteStart);

        // Metallic overtone for authentic chime tube shimmer (2.756x harmonic)
        const overtoneOsc = ctx.createOscillator();
        const overtoneGain = ctx.createGain();
        overtoneOsc.type = "triangle";
        overtoneOsc.frequency.setValueAtTime(note.freq * 2.756, noteStart);

        // Primary envelope: soft attack, long natural bell decay
        noteGain.gain.setValueAtTime(0.0001, noteStart);
        noteGain.gain.linearRampToValueAtTime(note.gain, noteStart + 0.012);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + note.duration);

        // Overtone envelope: quick high sparkle
        overtoneGain.gain.setValueAtTime(0.0001, noteStart);
        overtoneGain.gain.linearRampToValueAtTime(note.gain * 0.28, noteStart + 0.008);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + note.duration * 0.45);

        // Resonant highland bandpass filter
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(note.freq * 1.5, noteStart);
        filter.Q.setValueAtTime(0.8, noteStart);

        osc.connect(noteGain);
        noteGain.connect(ctx.destination);

        overtoneOsc.connect(overtoneGain);
        overtoneGain.connect(filter);
        filter.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + note.duration + 0.1);

        overtoneOsc.start(noteStart);
        overtoneOsc.stop(noteStart + note.duration * 0.5);
      });
    } catch (e) {
      console.warn("Could not play reservation chime:", e);
    }
  }, []);

  // Autoplay ambient sound by default on mount (with mobile gesture fallback)
  useEffect(() => {
    isAudioPlayingRef.current = true;

    const tryStartAudio = () => {
      if (isAudioPlayingRef.current) {
        startAmbientAudio();
      }
    };

    // Attempt start on mount (succeeds if user transitioned via click from landing page)
    tryStartAudio();

    // Browser policy gesture fallback: resume on first user interaction
    const handleGesture = () => {
      if (isAudioPlayingRef.current) {
        tryStartAudio();
      }
    };

    window.addEventListener("click", handleGesture, { passive: true, once: true });
    window.addEventListener("touchstart", handleGesture, { passive: true, once: true });
    window.addEventListener("wheel", handleGesture, { passive: true, once: true });
    window.addEventListener("keydown", handleGesture, { passive: true, once: true });

    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("wheel", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      if (birdTimerRef.current) {
        clearTimeout(birdTimerRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      }
    };
  }, [startAmbientAudio]);

  // Play celestial chime when reservation pops up at Phase 4 (scrollProgress >= 0.82)
  useEffect(() => {
    if (scrollProgress >= 0.82) {
      if (!hasPlayedChimeRef.current) {
        hasPlayedChimeRef.current = true;
        playReservationChime();
      }
    } else if (scrollProgress < 0.70) {
      // Reset so ascending again triggers the welcoming chime
      hasPlayedChimeRef.current = false;
    }
  }, [scrollProgress, playReservationChime]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingRef(`OBUDU-${Math.floor(100000 + Math.random() * 900000)}`);
    setBookingConfirmed(true);

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.65 },
        colors: ["#D99B35", "#527048", "#BC5439", "#FAF6EC", "#4A8237"],
      });
    } catch {
      // safe fallback
    }
  };

  const altitudeMeters = Math.round(780 + scrollProgress * (1576 - 780));
  const distanceKm = (scrollProgress * 11).toFixed(1);
  const hairpinsPassed = Math.min(22, Math.floor(scrollProgress * 22) + 1);

  // SVG Serpentine Road Path Definition (3,540 down to 300)
  // Geographically accurate: passes straight north-south through Cattle Head Gate, crosses under aerial cableway, and arrives at summit sanctuary
  const roadD =
    "M 800 3540 L 800 3360 C 800 3260 480 3260 320 3180 C 180 3110 230 2990 410 2930 C 720 2830 1180 2850 1340 2740 C 1440 2670 1400 2560 1240 2490 C 950 2380 430 2410 260 2310 C 160 2240 220 2140 420 2100 C 600 2060 760 2060 800 2010 L 800 1880 C 800 1800 960 1760 1140 1710 C 1340 1650 1340 1520 1160 1460 C 980 1400 640 1420 460 1340 C 340 1250 420 1120 640 1060 C 880 1000 1180 960 1240 840 C 1280 720 1160 620 980 560 C 860 520 800 460 800 360 L 800 300";

  // Cinematic follow camera
  const vbWidth = 1150;
  const vbHeight = 850;
  const vbMinX = Math.max(0, Math.min(1600 - vbWidth, camera.x - vbWidth / 2));
  const vbMinY = Math.max(0, Math.min(3600 - vbHeight, camera.y - vbHeight * 0.65));

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-[#18311B] text-[#FAF6EC] select-none z-10">
      {/* ========================================================= */}
      {/* MAIN 2.5D SVG WORLD — FULLY RENDERED ENVIRONMENT          */}
      {/* Draw order: Sky → Terrain → Cable Car → Road → Landmarks → Vehicle → Foreground */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox={`${vbMinX} ${vbMinY} ${vbWidth} ${vbHeight}`}
          preserveAspectRatio="xMidYMid slice"
          style={{ willChange: "viewBox" }}
        >
          <GhibliDefs />

          {/* ============ LAYER 0: SOLID 100% CONTINUOUS GHIBLI TERRAIN BASE ============ */}
          {/* Fills entire world canvas, continuous land, zero gaps, nothing floats! */}
          <FullWorldTerrain />

          {/* ============ LAYER 1: DISTANT BLUE MOUNTAIN RIDGES & CUMULUS CLOUDS ============ */}
          <g id="distant-mountains" opacity="0.65">
            <path
              d="M -300 350 Q 200 180 600 280 Q 1000 150 1400 260 Q 1700 160 2000 280 L 2000 750 L -300 750 Z"
              fill="url(#grad-mountain-far)"
            />
            <path
              d="M -300 480 Q 250 320 650 420 Q 1050 300 1450 410 Q 1750 310 2000 420 L 2000 850 L -300 850 Z"
              fill="url(#grad-mountain-mid)"
              opacity="0.75"
            />
          </g>
          <GhibliClouds />

          {/* ============ LAYER 2: MOUNTAIN RIVER & CATARACT WATERFALL ============ */}
          <MountainRiverAndBridge />
          <CataractWaterfall x={150} y={2440} height={240} />

          {/* ============ LAYER 3: CLIFF ROCK CUTS & EMBANKMENTS ============ */}
          <CliffSideEcosystem />

          {/* ============ LAYER 3.5: VIBRANT ROLLING GREEN HILLS BEFORE RANCH ENTRANCE ============ */}
          <PreEntranceGreenHills />

          {/* ============ LAYER 4: ENTRANCE GATE BASE & STONE PILLARS (UNDER ROAD) ============ */}
          {/* The ground plaza and stone pillars flank the road on left and right */}
          <IconicObuduEntranceBase x={800} y={1950} scale={1.08} />


          {/* ============ LAYER 7: THE 11KM SERPENTINE ROAD ============ */}
          <g id="road-network">
            {/* Outer Gravel Bedding */}
            <path
              d={roadD}
              fill="none"
              stroke="url(#grad-road-shoulder)"
              strokeWidth="82"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Road Concrete Border Curbs */}
            <path
              d={roadD}
              fill="none"
              stroke="#A89F8E"
              strokeWidth="70"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Main Asphalt Road Surface */}
            <path
              ref={roadPathRef}
              d={roadD}
              fill="none"
              stroke="url(#grad-asphalt)"
              strokeWidth="60"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner Tarmac Highlight Line */}
            <path
              d={roadD}
              fill="none"
              stroke="#57626C"
              strokeWidth="50"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />

            {/* Dashed Golden/Cream Center Divider Line */}
            <path
              d={roadD}
              fill="none"
              stroke="#E8DCBE"
              strokeWidth="3.5"
              strokeDasharray="22 26"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
          </g>

          {/* ============ LAYER 8: CLIFFSIDE SAFETY CURB STONES ============ */}
          <g id="cliffside-curb-stones-network">
            {[
              { x: 260, y: 3120, r: -25 },
              { x: 242, y: 3150, r: -15 },
              { x: 235, y: 3180, r: 0 },
              { x: 238, y: 3210, r: 15 },
              { x: 252, y: 3240, r: 30 },
              { x: 280, y: 3270, r: 45 },
              { x: 1290, y: 2690, r: -45 },
              { x: 1315, y: 2720, r: -30 },
              { x: 1335, y: 2750, r: -10 },
              { x: 1342, y: 2780, r: 10 },
              { x: 1330, y: 2810, r: 35 },
              { x: 1300, y: 2840, r: 50 },
              { x: 240, y: 2280, r: -40 },
              { x: 220, y: 2320, r: -20 },
              { x: 205, y: 2350, r: 0 },
              { x: 215, y: 2380, r: 25 },
              { x: 245, y: 2410, r: 45 },
              { x: 380, y: 1220, r: -15 },
              { x: 370, y: 1260, r: 10 },
              { x: 390, y: 1300, r: 30 },
              { x: 1220, y: 770, r: -20 },
              { x: 1240, y: 810, r: 15 },
            ].map((block, i) => (
              <rect
                key={`curb-${i}`}
                x={block.x}
                y={block.y}
                width="24"
                height="10"
                rx="2"
                fill="#F2EEE3"
                stroke="#5C5446"
                strokeWidth="1.5"
                transform={`rotate(${block.r}, ${block.x + 12}, ${block.y + 5})`}
                filter="drop-shadow(0 2px 3px rgba(0,0,0,0.35))"
              />
            ))}
          </g>

          {/* ============ LAYER 7: GROUND LEVEL CHALETS, OVERLOOKS & LANDMARKS ============ */}
          {/* Panoramic Cliff Overlooks */}
          <SerpentineCliffOverlook
            x={280}
            y={3120}
            title="HAIRPIN 7 • DEVIL'S ELBOW"
            altitude="1,040m"
          />
          <SerpentineCliffOverlook
            x={1360}
            y={2700}
            title="DEVIL'S ELBOW CLIFFS"
            altitude="1,240m"
          />
          <SerpentineCliffOverlook
            x={220}
            y={2280}
            title="BECHEVE RIDGE PASS"
            altitude="1,390m"
          />

          {/* Village Chalets on Stilts (sitting on grounded terraces with stone steps) */}
          <ChaletVilla x={460} y={1660} scale={0.95} label="Village Chalet 1" />
          <ChaletVilla x={1380} y={1500} scale={1.0} label="Meadow Villa" />
          <ChaletVilla x={200} y={1360} scale={1.05} label="Pasture Chalet" />
          <ChaletVilla x={1120} y={1210} scale={0.95} label="Hillside Lodge" />

          {/* Summit Chalets */}
          <ChaletVilla x={420} y={780} scale={1.18} label="Mountain View Chalet" />
          <ChaletVilla x={1380} y={680} scale={1.22} label="Highland Haven" />
          <ChaletVilla x={500} y={480} scale={1.26} label="Presidential Chalet" />
          <ChaletVilla x={1060} y={400} scale={1.3} label="Governor's Lodge" />
          <ChaletVilla x={730} y={120} scale={1.15} label="Honeycomb Sanctuary" />

          {/* Vintage Streetlamps */}
          <VillageLamppost x={620} y={1670} scale={1.1} />
          <VillageLamppost x={1460} y={1520} scale={1.1} />
          <VillageLamppost x={280} y={1370} scale={1.1} />
          <VillageLamppost x={1040} y={1220} scale={1.1} />
          <VillageLamppost x={560} y={790} scale={1.15} />
          <VillageLamppost x={1080} y={710} scale={1.15} />

          {/* Ghibli Trees */}
          <GhibliTree x={120} y={3350} scale={1.4} variant={0} />
          <GhibliTree x={220} y={3280} scale={1.3} variant={1} />
          <GhibliTree x={1440} y={3320} scale={1.35} variant={2} />
          <GhibliTree x={1480} y={2720} scale={1.2} variant={0} />
          <GhibliTree x={1480} y={2620} scale={1.4} variant={1} />
          <GhibliTree x={200} y={1780} scale={1.1} variant={2} />
          <GhibliTree x={1380} y={1720} scale={1.2} variant={0} />
          <GhibliTree x={300} y={850} scale={1.25} variant={1} />
          <GhibliTree x={1420} y={800} scale={1.3} variant={2} />

          {/* Road Marker Stones */}
          <RoadMarkerStone x={740} y={3480} km="11.0 KM" label="PASS ENTRANCE" />
          <RoadMarkerStone x={390} y={3160} km="8.2 KM" label="DEVIL'S ELBOW" />
          <RoadMarkerStone x={1240} y={2740} km="5.5 KM" label="CLOUD RIDGE" />
          <RoadMarkerStone x={340} y={2290} km="3.2 KM" label="RIDGE PASS" />
          <RoadMarkerStone x={670} y={1970} km="1.8 KM" label="RANCH GATEWAY" />
          <RoadMarkerStone x={720} y={1140} km="0.8 KM" label="VILLAGE GREEN" />
          <RoadMarkerStone x={870} y={480} km="0.0 KM" label="SUMMIT SANCTUARY" />

          {/* ============ LAYER 8: LIVING WILDLIFE (CATTLE, MONKEYS, BUTTERFLIES) ============ */}
          <LivingWildlifeCattle scrollProgress={scrollProgress} />
          <LivingWildlifeMonkeys scrollProgress={scrollProgress} />
          <LivingWildlifeButterflies scrollProgress={scrollProgress} />

          {/* ============ LAYER 9: VEHICLE ON ROAD ============ */}
          {/* Drives on the road, passes cleanly between gate pillars! */}
          <g
            id="vehicle-stage-anchor"
            transform={`translate(${vehicleState.x}, ${vehicleState.y})`}
            style={{
              willChange: "transform",
            }}
          >
            {!vehicleState.isBus ? (
              <VintageSafariCar perspective={vehicleState.perspective} />
            ) : (
              <RanchTourBus perspective={vehicleState.perspective} />
            )}

            {/* Organic Ghibli Dust/Cloud Morph Particles */}
            {vehicleState.morphProgress > 0 && (
              <GhibliCloudPuff progress={vehicleState.morphProgress} />
            )}
          </g>

          {/* ============ LAYER 10: ENTRANCE OVERHEAD TIMBER ARCH & CATTLE HEAD (OVER ROAD & VEHICLE!) ============ */}
          {/* As the vehicle approaches y=1950, it passes visibly UNDER the majestic carved Bull's Head arch! */}
          <IconicObuduEntranceOverhead x={800} y={1950} scale={1.08} />

          {/* ============ LAYER 11: AERIAL CABLE CAR SYSTEM (OVER ROAD & TERRAIN!) ============ */}
          {/* Cables & red/gold gondolas glide high above the road and valleys at y=600-750! */}
          <ObuduCableCarAerialSystem scrollProgress={scrollProgress} />

          {/* ============ LAYER 12: SOARING BIRDS & DRIFTING MIST VEILS ============ */}
          <LivingWildlifeBirds scrollProgress={scrollProgress} />
          <DriftingMistVeil y={2700} direction="left" opacity={0.4} />
          <DriftingMistVeil y={1700} direction="right" opacity={0.45} />
          <DriftingMistVeil y={750} direction="left" opacity={0.35} />

          {/* ============ LAYER 13: FOREGROUND OVERHANG CANOPY ============ */}
          <ForegroundCanopy />
        </svg>
      </div>

      {/* Atmospheric overlay gradients */}
      <div className="absolute inset-0 pointer-events-none z-15">
        <div className="absolute inset-0 bg-gradient-to-b from-[#163654]/15 via-transparent to-[#102412]/40" />
      </div>

      {/* ========================================================= */}
      {/* CINEMATIC SCROLLYTELLING HUD & NAVIGATION BAR              */}
      {/* ========================================================= */}
      <header className="relative z-30 flex flex-col gap-2 px-3 sm:px-6 py-2.5 sm:py-4 md:px-10 md:py-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FCFBF7] text-[#284820] flex items-center justify-center font-display-ghibli font-bold text-xs sm:text-base shadow-lg border border-[#D99B35]/40 animate-pulse-glow shrink-0">
              1951
            </div>
            <div className="min-w-0">
              <h1 className="font-display-ghibli text-xs sm:text-base md:text-lg font-bold tracking-wider sm:tracking-widest text-[#FFFDF8] drop-shadow-md truncate">
                OBUDU MOUNTAIN RESORT
              </h1>
              <p className="font-serif-ghibli italic text-[10px] sm:text-xs md:text-sm text-[#F6DDA8] tracking-wider truncate hidden xs:block sm:block">
                Cross River Highlands • Nigeria • Studio Ghibli Odyssey
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Switch to Classic Real-Life Mode Toggle */}
            {onSwitchToClassic && (
              <button
                id="btn-switch-classic"
                onClick={onSwitchToClassic}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FCFBF7] hover:bg-[#F3EAD5] text-[#1B3416] font-display-ghibli font-bold text-[10px] sm:text-xs tracking-wider transition-all shadow-md border border-[#D99B35]/60 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                title="Switch to Real-Life Normal Scroll Mode with authentic photography"
              >
                <Mountain className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A87A24]" />
                <span className="hidden sm:inline">Real-Life Mode</span>
                <span className="sm:hidden">Classic</span>
              </button>
            )}

            {/* Cinema Mode Toggle */}
            <button
              id="btn-cinema-mode"
              onClick={() => setCinemaMode(!cinemaMode)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wide transition-all shadow-md backdrop-blur-md border cursor-pointer shrink-0 ${
                cinemaMode
                  ? "bg-[#D99B35] text-[#1A3115] border-[#FFF9E6]"
                  : "bg-[#1B3416]/85 border-[#657E58] text-[#E0EBDC] hover:text-[#FFF9E6]"
              }`}
              title="Toggle Cinema Mode (hide/show story cards)"
            >
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">
                {cinemaMode ? "Exit Cinema" : "Cinema Mode"}
              </span>
            </button>

            {/* Art Gallery Modal */}
            <button
              id="btn-archive-photos"
              onClick={() => setShowArchiveModal(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#1B3416]/85 hover:bg-[#284820] border border-[#D99B35]/50 text-[#F6DDA8] text-[10px] sm:text-xs font-medium tracking-wide transition-all shadow-md backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
              title="Explore the hand-painted Studio Ghibli art collection of Obudu"
            >
              <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5B853]" />
              <span className="hidden sm:inline">Art Gallery</span>
            </button>

            {/* Audio Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={toggleAmbientAudio}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wide transition-all shadow-md backdrop-blur-md border cursor-pointer shrink-0 ${
                isAudioPlaying
                  ? "bg-[#284820] border-[#E5B853] text-[#FFF9E6]"
                  : "bg-[#1B3416]/80 border-[#657E58] text-[#D8E6D3] hover:text-[#FFF9E6]"
              }`}
              title="Toggle Ghibli synthesized mountain breeze and birdsong"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5B853] animate-pulse" />
                  <span className="hidden sm:inline">Sound: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A3BF9E]" />
                  <span className="hidden sm:inline">Sound</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Travel / Phase Waypoint Jump Bar */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none text-[10px] sm:text-[11px]">
          <span className="text-[#E5B853] font-bold uppercase tracking-wider text-[9px] sm:text-[10px] hidden md:inline shrink-0">
            Jump to:
          </span>
          {[
            { short: "1. Pass", full: "1. Serpentine Pass", prog: 0.05, phase: 1 },
            { short: "2. Gateway", full: "2. Cattle Gateway", prog: 0.46, phase: 2 },
            { short: "3. Village", full: "3. Ranch Village", prog: 0.65, phase: 3 },
            { short: "4. Summit", full: "4. Summit Sanctuary", prog: 0.9, phase: 4 },
          ].map((btn) => (
            <button
              key={btn.short}
              onClick={() => scrollToPhase(btn.prog)}
              className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                activeWaypoint.phase === btn.phase
                  ? "bg-[#D99B35] text-[#1B3117] font-bold border-[#FFF9E6] shadow-md scale-105"
                  : "bg-[#18311B]/80 text-[#D8E6D3] border-[#44663B] hover:bg-[#284820] hover:text-[#FFF9E6]"
              }`}
            >
              <span className="sm:hidden">{btn.short}</span>
              <span className="hidden sm:inline">{btn.full}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Right Floating Gauge: Altimeter & 8-Direction Bearing */}
      {!cinemaMode && (
        <div className="absolute right-6 top-32 md:right-10 md:top-36 z-20 pointer-events-none hidden sm:flex flex-col gap-3">
          <div className="bg-[#18311B]/85 backdrop-blur-md border border-[#D99B35]/40 p-3.5 rounded-2xl shadow-xl w-48 text-[#FCFBF7]">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#E5B853] mb-1 font-semibold">
              <span className="flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5" />
                Altimeter
              </span>
              <span>{(scrollProgress * 100).toFixed(0)}%</span>
            </div>

            <div className="font-display-ghibli text-2xl font-bold tracking-tight text-[#FFFDF8]">
              {altitudeMeters.toLocaleString()}{" "}
              <span className="text-xs font-normal text-[#E2DAC4]">meters</span>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#345B31] grid grid-cols-2 gap-2 text-[10px] text-[#D9E3D6]">
              <div>
                <div className="text-[#A2BA9B]">Distance</div>
                <div className="font-semibold text-white">{distanceKm} km</div>
              </div>
              <div>
                <div className="text-[#A2BA9B]">Hairpin Turn</div>
                <div className="font-semibold text-white">
                  {hairpinsPassed} of 22
                </div>
              </div>
              <div>
                <div className="text-[#A2BA9B]">Bearing</div>
                <div className="font-semibold text-[#F6DDA8]">
                  {vehicleState.direction} ({Math.round(vehicleState.bearingDeg)}°)
                </div>
              </div>
              <div>
                <div className="text-[#A2BA9B]">Vehicle</div>
                <div className="font-semibold text-[#F6DDA8]">
                  {vehicleState.isBus ? "Tour Bus" : "Safari 4x4"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STORYTELLING WAYPOINT CARD (GLASSMORPHED REAL MODE STYLE)  */}
      {/* ========================================================= */}
      {!cinemaMode && scrollProgress < 0.82 && (
        <div className="relative z-20 px-4 pb-4 md:px-8 md:pb-6 max-w-md pointer-events-none hidden md:block">
          <div className="pointer-events-auto transition-all duration-300 bg-white/35 backdrop-blur-md border border-white/60 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-black">
            {/* Top Bar: Editorial Monospace Metadata */}
            <div className="px-5 py-3 border-b border-black/15 flex items-center justify-between">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#5A3810] font-bold">
                {activeWaypoint.badge}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] px-2 py-0.5 bg-black text-white rounded-none font-bold uppercase tracking-wider">
                  {activeWaypoint.altitude}
                </span>
                <button
                  onClick={() => setShowArchiveModal(true)}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-black hover:text-[#5A3810] transition-colors cursor-pointer flex items-center gap-1 ml-1"
                  title="View full gallery"
                >
                  <span className="hidden sm:inline">Gallery</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="p-5 space-y-3">
              <div>
                <h2 className="font-display-ghibli text-xl md:text-2xl font-bold text-black tracking-tight uppercase leading-snug drop-shadow-xs">
                  {activeWaypoint.title}
                </h2>
                <p className="font-serif-ghibli italic text-xs text-[#2A2A2A] mt-0.5">
                  {activeWaypoint.subtitle}
                </p>
              </div>

              <p className="text-xs leading-relaxed text-[#1A1A1A] font-medium">
                {activeWaypoint.narrative}
              </p>

              {/* Artwork Showcase (Real Mode Comparison/Chalet Card Geometry with Glass Layering) */}
              <div
                onClick={() => setShowArchiveModal(true)}
                className="border border-white/50 bg-white/30 backdrop-blur-sm p-3 rounded-none group cursor-pointer hover:border-black/50 transition-colors shadow-sm"
                title="Click to open Studio Ghibli Art Gallery"
              >
                <div className="h-32 sm:h-36 w-full overflow-hidden relative border border-white/60 rounded-none bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeWaypoint.ghibliImg}
                    alt={activeWaypoint.photoLabel}
                    className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black text-[#D99B35] text-[8px] font-mono uppercase tracking-wider rounded-none font-bold">
                    Studio Ghibli
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[8px] font-mono uppercase tracking-wider rounded-none">
                    Expand
                  </div>
                </div>

                <div className="mt-2.5">
                  <div className="font-display-ghibli text-sm font-bold text-black uppercase">
                    {activeWaypoint.photoLabel}
                  </div>
                  <p className="text-[11px] text-[#333333] leading-snug mt-1 font-serif-ghibli italic">
                    {activeWaypoint.artisticTransformation}
                  </p>
                </div>

                {/* Retained Green Themed Button with Real Mode Geometry */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowArchiveModal(true);
                  }}
                  className="mt-3 w-full py-2.5 px-4 bg-[#1B3416] hover:bg-[#284820] text-white border border-[#1B3416] font-mono text-[10px] uppercase tracking-[0.25em] font-semibold rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Explore Art Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B853]" />
                </button>
              </div>

              {/* Minimalist Editorial Footer */}
              <div className="pt-2.5 border-t border-black/15 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[#333333] font-bold">
                <span className="flex items-center gap-1">
                  Scroll to Ascend ↓
                </span>
                <span>
                  {Math.round(scrollProgress * 100)}% Elevation
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 4: RESERVATION CARD (GLASSMORPHED REAL MODE STYLE)  */}
      {/* ========================================================= */}
      {!cinemaMode && scrollProgress >= 0.82 && (
        <div className="relative z-30 px-3 sm:px-6 pb-6 md:px-8 md:pb-8 max-w-xl mx-auto w-full">
          <div className="bg-white/50 backdrop-blur-lg border border-white/60 p-4 sm:p-6 md:p-8 text-black rounded-none shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-500">
            {!bookingConfirmed ? (
              <>
                <div className="text-center mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8C5E28] font-bold">
                    EXCLUSIVE HIGHLAND RESERVATION • 1,576M
                  </div>
                  <h2 className="font-display-ghibli text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-tight uppercase">
                    Reserve Your Mountain Sanctuary
                  </h2>
                  <p className="font-serif-ghibli italic text-[11px] sm:text-xs md:text-sm text-[#555555] max-w-md mx-auto">
                    Authentic cedar chalets on stilts with wrap-around balconies overlooking the morning clouds.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3.5 sm:space-y-4">
                  <div>
                    <label className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8C5E28] font-bold mb-1 sm:mb-1.5">
                      Select Chalet Lodge
                    </label>
                    <select
                      id="select-chalet"
                      value={chaletType}
                      onChange={(e) => setChaletType(e.target.value)}
                      className="w-full bg-white/70 backdrop-blur-sm border border-black/15 focus:border-black rounded-none px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs text-black font-medium focus:outline-none"
                    >
                      <option value="Mountain View Chalet">
                        Mountain View Chalet (2-Tier Cedar Lodge on Stilts)
                      </option>
                      <option value="Presidential Villa">
                        Presidential Summit Villa (Panoramic Cloud Deck)
                      </option>
                      <option value="Honeycomb Stone Cottage">
                        Honeycomb Stone Cottage (Volcanic Hearth)
                      </option>
                      <option value="Governor's Heritage Suite">
                        Governor&apos;s Heritage Suite (Est. 1951)
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8C5E28] font-bold mb-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#8C5E28]" /> Check In
                        </span>
                      </label>
                      <input
                        id="input-checkin"
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full bg-white/70 backdrop-blur-sm border border-black/15 focus:border-black rounded-none px-3 py-2 text-xs text-black font-medium focus:outline-none min-h-[38px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8C5E28] font-bold mb-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#8C5E28]" /> Check Out
                        </span>
                      </label>
                      <input
                        id="input-checkout"
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full bg-white/70 backdrop-blur-sm border border-black/15 focus:border-black rounded-none px-3 py-2 text-xs text-black font-medium focus:outline-none min-h-[38px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8C5E28] font-bold mb-1">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#8C5E28]" /> Guests
                        </span>
                      </label>
                      <select
                        id="select-guests"
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full bg-white/70 backdrop-blur-sm border border-black/15 focus:border-black rounded-none px-3 py-2 text-xs text-black font-medium focus:outline-none min-h-[38px]"
                      >
                        <option value={1}>1 Guest (Solo Retreat)</option>
                        <option value={2}>2 Guests (Highland Couple)</option>
                        <option value={4}>4 Guests (Family Chalet)</option>
                        <option value={6}>6+ Guests (Full Villa)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2.5 sm:pt-3 border-t border-black/10 space-y-2">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8C5E28] font-bold">
                      Curated Highland Inclusions
                    </div>
                    <label className="flex items-start sm:items-center gap-2.5 text-[11px] sm:text-xs text-[#555555] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeCableCar}
                        onChange={(e) => setIncludeCableCar(e.target.checked)}
                        className="rounded-none border-[#AAAAAA] text-[#1B3416] focus:ring-0 mt-0.5 sm:mt-0 shrink-0"
                      />
                      <span>Complimentary Obudu Cable Car Unlimited Pass (4.0km ride)</span>
                    </label>
                    <label className="flex items-start sm:items-center gap-2.5 text-[11px] sm:text-xs text-[#555555] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeCanopyWalk}
                        onChange={(e) => setIncludeCanopyWalk(e.target.checked)}
                        className="rounded-none border-[#AAAAAA] text-[#1B3416] focus:ring-0 mt-0.5 sm:mt-0 shrink-0"
                      />
                      <span>Becheve Nature Reserve & Canopy Walkway Guide</span>
                    </label>
                  </div>

                  {/* Retained Green Themed Button with Real Mode Geometry */}
                  <button
                    id="btn-reserve-sanctuary"
                    type="submit"
                    className="w-full mt-3.5 sm:mt-4 py-3 sm:py-3.5 px-4 sm:px-6 bg-[#1B3416] hover:bg-[#284820] text-white border border-[#1B3416] font-mono font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all rounded-none cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Confirm Sanctuary Reservation</span>
                    <ArrowRight className="w-4 h-4 text-[#FAD59A]" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 mx-auto border border-[#1B3416] text-[#1B3416] bg-[#EBF3E8] flex items-center justify-center rounded-none shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display-ghibli text-2xl font-bold text-black uppercase">
                  Sanctuary Awaits You
                </h3>
                <p className="font-serif-ghibli italic text-xs text-[#555555] max-w-sm mx-auto">
                  Your journey to the clouds is confirmed. A warm cedar fire and fresh highland cream tea are being prepared at {chaletType}.
                </p>
                <div className="bg-white/60 backdrop-blur-sm p-3 text-xs text-[#8C5E28] font-mono border border-black/10 max-w-xs mx-auto rounded-none font-bold uppercase tracking-wider">
                  Booking Ref: {bookingRef}
                </div>
                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="mt-2 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#8C5E28] hover:text-black underline cursor-pointer"
                >
                  Modify Reservation
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Quick Mode Switcher Pill (Visible and responsive across all screens) */}
      {onSwitchToClassic && (
        <div className="fixed bottom-14 right-4 sm:bottom-14 sm:right-6 z-30 pointer-events-auto">
          <button
            onClick={onSwitchToClassic}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#FCFBF7]/95 hover:bg-[#FCFBF7] text-[#1B3416] text-[10px] sm:text-xs font-display-ghibli font-bold tracking-wider shadow-2xl border-2 border-[#D99B35] backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer group"
            title="Switch to Real-Life Normal Scroll Mode with authentic photography"
          >
            <Mountain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A87A24] group-hover:rotate-12 transition-transform shrink-0" />
            <span className="hidden sm:inline">Real-Life Mode</span>
            <span className="sm:hidden">Real-Life</span>
          </button>
        </div>
      )}

      {/* Bottom Journey Timeline Track (Fully responsive on mobile) */}
      <div className="relative z-20 px-3 py-2 sm:px-6 sm:py-2.5 md:px-10 bg-[#122414]/90 backdrop-blur-md border-t border-[#3B5A35] flex items-center justify-between text-xs text-[#C8DCBE]">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <span className="font-display-ghibli font-semibold text-[#F6DDA8] tracking-wider text-[10px] sm:text-[11px] whitespace-nowrap">
            <span className="sm:hidden">PROGRESS</span>
            <span className="hidden sm:inline">JOURNEY PROGRESS</span>
          </span>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newProg = Math.max(0, Math.min(1, clickX / rect.width));
              scrollToPhase(newProg);
            }}
            className="w-20 sm:w-32 md:w-56 h-1.5 sm:h-2 bg-[#254427] rounded-full overflow-hidden border border-[#446C3F] cursor-pointer shrink-0"
            title="Click anywhere to scrub journey"
          >
            <div
              className="h-full bg-gradient-to-r from-[#D99B35] to-[#75A844] rounded-full transition-all duration-100"
              style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-mono text-[#D7E6CE] shrink-0">
          <span className="hidden md:inline">11km Mountain Highway</span>
          <span className="text-[#F6DDA8] font-bold">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* STUDIO GHIBLI HIGHLAND ART GALLERY MODAL (NO REAL PHOTOS)   */}
      {/* ========================================================= */}
      {showArchiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 bg-[#09150B]/90 backdrop-blur-md animate-fade-in">
          <div className="bg-[#FCFAF4] text-[#1E361B] max-w-4xl w-full rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#D99B35]/70 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-[#E8DEC7] bg-gradient-to-r from-[#F6EEDC] to-[#EFE2C8] gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1B3416] text-[#FBEBC8] text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-1 sm:mb-1.5 border border-[#D99B35]/40">
                  <Palette className="w-3 h-3 text-[#E5B853]" />
                  Art Collection
                </div>
                <h3 className="font-display-ghibli text-lg sm:text-2xl md:text-3xl font-bold text-[#142A12] leading-tight">
                  The Obudu Highland Art Gallery
                </h3>
                <p className="font-serif-ghibli italic text-[11px] sm:text-xs md:text-sm text-[#7D5422] mt-0.5 line-clamp-1 sm:line-clamp-none">
                  A visual journey across Cross River&apos;s mystical heights, rendered in hand-painted Studio Ghibli gouache.
                </p>
              </div>
              <button
                id="btn-close-modal"
                onClick={() => setShowArchiveModal(false)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1B3416] text-[#FFF9E6] hover:bg-[#2A4C24] flex items-center justify-center transition-colors cursor-pointer shadow-md shrink-0"
                title="Close Gallery"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Gallery Artworks List */}
            <div className="p-3.5 sm:p-5 md:p-6 overflow-y-auto space-y-6 sm:space-y-8 bg-[#FCFAF4]">
              {PHOTO_ARCHIVE.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#F6EEDC]/80 rounded-2xl overflow-hidden border border-[#DCD0B7] shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 space-y-4"
                >
                  {/* Artwork Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5DAC0]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1B3416] text-[#FFF9E6]">
                          Painting 0{idx + 1}
                        </span>
                        <h4 className="font-display-ghibli font-bold text-xl md:text-2xl text-[#142911]">
                          {item.title}
                        </h4>
                      </div>
                      <p className="font-serif-ghibli italic text-xs md:text-sm text-[#825520] mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 self-start sm:self-center px-3 py-1 rounded-full bg-[#EFE2C8] text-[#784A1A] text-xs font-semibold border border-[#D8C7A5]">
                      <Mountain className="w-3.5 h-3.5 text-[#A87A24]" />
                      {item.elevation}
                    </span>
                  </div>

                  {/* Panoramic Artwork Showcase Canvas */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#D99B35]/40 bg-[#162916] shadow-lg group">
                    <div className="h-64 sm:h-80 md:h-96 w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.ghibliSrc}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#18311B]/90 backdrop-blur-md text-[#FBEBC8] text-[10px] font-bold tracking-widest uppercase border border-[#D99B35]/40 shadow-md flex items-center gap-1.5">
                      <Palette className="w-3 h-3 text-[#E5B853]" />
                      Studio Ghibli Gouache
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#142614]/85 backdrop-blur-md border border-[#44663B]/60 text-[#F5EDE0] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <span className="font-serif-ghibli italic text-xs text-[#E3D4B8]">
                        {item.atmosphere}
                      </span>
                    </div>
                  </div>

                  {/* Artwork Story & Scenic Tags */}
                  <div className="space-y-2 pt-1">
                    <p className="font-serif-ghibli text-[13.5px] text-[#2C402A] leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-full text-[10.5px] font-medium bg-[#ECE0C6] text-[#5A3E1D] border border-[#D5C29F]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:p-5 bg-gradient-to-r from-[#F6EEDC] to-[#EFE2C8] border-t border-[#E8DEC7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B5433]">
              <span className="font-serif-ghibli italic text-center sm:text-left">
                Studio Ghibli Aesthetic Expedition • Obudu Mountain Resort • 1,576m Summit
              </span>
              <button
                onClick={() => setShowArchiveModal(false)}
                className="px-5 py-2 rounded-xl bg-[#1B3416] text-[#FFFDF8] font-medium hover:bg-[#284820] transition-colors cursor-pointer shadow-md"
              >
                Return to Mountain Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
