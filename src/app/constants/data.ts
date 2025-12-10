import { CardData } from "../types";

export const sampleSquares = Array.from({ length: 6 }).map((_, i) => ({ id: i, src: `/images/sq${i % 3 + 1}.jpg` }));
export const sampleSentences = [
"First sentence",
"Second phrase",
"Top line",
"Bottom note",
"Left side",
"Right side",
];
export const sampleCards: CardData[] = [
{ id: 1, title: "Card One", body: "Card one description", image: "/images/card1.jpg" },
{ id: 2, title: "Card Two", body: "Card two description", image: "/images/card2.jpg" },
{ id: 3, title: "Card Three", body: "Card three description", image: "/images/card3.jpg" },
];