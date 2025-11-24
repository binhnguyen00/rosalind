import { useResumeStore } from "@stores";
import { cn, ScrollShadow } from "@heroui/react";

const GOOGLE_FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Raleway",
  "Merriweather",
  "Nunito",
  "Poppins",
  "Playfair Display",
  "Rubik",
  "Ubuntu",
  "Kanit",
  "Fira Sans",
  "Quicksand",
  "Work Sans",
  "Barlow",
  "Mulish",
  "Titillium Web",
  "PT Sans",
  "PT Serif",
  "Inconsolata",
  "Mukta",
  "Heebo",
  "IBM Plex Sans",
  "Karla",
  "Libre Franklin",
  "Arvo",
  "Josefin Sans",
  "Libre Baskerville",
  "Anton",
  "Cabin",
  "Manrope",
  "Bitter",
  "Hind",
  "Lora",
  "Oxygen",
  "Fjalla One",
  "Dosis",
  "Tekko",
  "Exo 2",
  "Pacifico",
  "Dancing Script",
  "Shadows Into Light",
  "Indie Flower",
  "Amatic SC",
  "Caveat",
  "Satisfy",
  "Great Vibes",
  "Lobster",
  "Sacramento",
  "Parisienne",
  "Cookie",
  "Yellowtail",
  "Monoton",
  "Bangers",
  "Press Start 2P",
  "Creepster",
  "Special Elite",
  "Fredericka the Great",
  "Love Ya Like A Sister",
  "Coming Soon",
  "Luckiest Guy",
  "Chewy",
  "Black Ops One",
  "Rock Salt",
  "Pinyon Script",
  "Homemade Apple",
  "Covered By Your Grace",
  "Kaushan Script",
  "Gloria Hallelujah",
  "Permanent Marker",
  "Patrick Hand",
  "Walter Turncoat",
  "Architects Daughter",
  "Kalam",
  "Courgette",
  "Allura",
  "Tangerine",
  "Nothing You Could Do",
  "Reenie Beanie",
  "Waiting for the Sunrise",
  "Just Me Again Down Here",
  "La Belle Aurore",
  "Zed Mono",
  "Share Tech Mono",
  "VT323",
  "Cutive Mono",
  "Anonymous Pro",
  "Space Mono",
  "Major Mono Display",
  "Nova Mono",
  "Xanh Mono",
  "Syne Mono",
];

export default function Fonts() {
  const metadata = useResumeStore((state) => state.metadata);
  const updateFont = useResumeStore((state) => state.updateFont);

  return (
    <div className="flex flex-col gap-2 w-full">
      {GOOGLE_FONTS.map((font) => (
        <div
          key={font}
          className={cn(
            "p-3 rounded-xl border cursor-pointer transition-all",
            "hover:border-primary hover:bg-primary-50",
            metadata.font === font ? "border-primary bg-primary-100 ring-2 ring-primary-200" : "border-default-200"
          )}
          onClick={() => updateFont(font)}
        >
          <p className="text-lg" style={{ fontFamily: font }}>{font}</p>
        </div>
      ))}

      {/* preview font */}
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?family=${GOOGLE_FONTS.map(f => f.replace(/ /g, "+")).join("&family=")}&display=swap`}
      />
    </div>
  )
}