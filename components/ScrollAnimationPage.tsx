"use client";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { LargeHeroCard } from "./LargeHeroCard";
import { CircularSentences } from "./CircularSentences";
import { CardsStage } from "./CardsStage";
import { PageFooter } from "./PageFooter";
import { SquareGallery } from "./SquareGallery";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";


// Register ScrollTrigger (works with Next.js when importing from 'gsap/dist/...')
gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
export default function ScrollAnimationPage() {
  
    return (
        <main className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900">
        <LargeHeroCard />
        <SquareGallery />
        <CircularSentences />
        <CardsStage />
        <PageFooter />
        </main>
        );
}