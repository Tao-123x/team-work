export const entryThemes = [
  {
    id: "bell",
    name: "Demo A",
    headline: "Bell Hero",
    summary: "A formal campus welcome with a rising green bell tower and a calm dawn gradient.",
    campusTag: "Hubei green bell",
    deliveryTag: "Fast clarity",
    supportLabel: "Formal and calm",
    heroKind: "bell",
    shell: {
      bgStart: "#ebfdf3",
      bgEnd: "#bbf0d2",
      accent: "#0ea959",
      accentSoft: "#86e4b2",
      secondary: "#1d6aea",
      panel: "#ffffff",
      textStrong: "#0b1426",
      textMuted: "#475569",
      button: "#0a0a0a"
    },
    splash: {
      eyebrow: "Campus ceremonial concept",
      title: "Trusted help from shelf to door.",
      subtitle: "Built for Hubei University students, with a delivery-app rhythm and a calmer campus tone.",
      kicker: "The first screen feels reliable before it feels fast.",
      primaryLabel: "Preview login",
      secondaryLabel: "Preview register"
    },
    login: {
      eyebrow: "Student sign in",
      title: "Enter fast. Stay trusted.",
      subtitle: "Big action, clean form, and a bell-shaped campus identity.",
      highlight: "A steadier composition for teachers who value clarity first."
    },
    register: {
      eyebrow: "Create account",
      title: "Join your dorm delivery circle.",
      subtitle: "Register once, then post or accept requests with a clear student profile.",
      highlight: "This version makes the campus identity feel formal and credible."
    }
  },
  {
    id: "card",
    name: "Demo B",
    headline: "Delivery Card",
    summary: "A sharper product feel with stacked cards, strong CTA focus, and a bold green-to-blue split.",
    campusTag: "MMU blue support",
    deliveryTag: "Card hierarchy",
    supportLabel: "Chosen direction",
    heroKind: "card",
    shell: {
      bgStart: "#f0f8ff",
      bgEnd: "#c8e4fc",
      accent: "#12b05b",
      accentSoft: "#81e2b0",
      secondary: "#0a5ced",
      panel: "#ffffff",
      textStrong: "#08111f",
      textMuted: "#475569",
      button: "#000000"
    },
    splash: {
      eyebrow: "Delivery-app composition",
      title: "Move a request in seconds.",
      subtitle: "Inspired by delivery products, reworked for campus trust, dorm identity, and quick scanability.",
      kicker: "This route feels the most product-ready for class presentation.",
      primaryLabel: "Open login",
      secondaryLabel: "Open register"
    },
    login: {
      eyebrow: "Quick access",
      title: "A stronger first-screen CTA.",
      subtitle: "This concept uses stacked cards and bold spacing to feel more product-like.",
      highlight: "The strongest candidate for the final integrated business flow."
    },
    register: {
      eyebrow: "New student setup",
      title: "One form. Clear dorm identity.",
      subtitle: "The fields sit inside a bold panel so the page stays easy to scan on mobile.",
      highlight: "The panel hierarchy makes the form look more finished and more trustworthy."
    }
  },
  {
    id: "route",
    name: "Demo C",
    headline: "Campus Route",
    summary: "An animated route from takeaway shelf to dorm room, with soft path lines and layered blue-green motion.",
    campusTag: "Shelf-to-door path",
    deliveryTag: "Route animation",
    supportLabel: "Story-led motion",
    heroKind: "route",
    shell: {
      bgStart: "#f3fdf8",
      bgEnd: "#d0e9fe",
      accent: "#0a9b6c",
      accentSoft: "#73dcbb",
      secondary: "#007aff",
      panel: "#ffffff",
      textStrong: "#061022",
      textMuted: "#4e5f7a",
      button: "#070c17"
    },
    splash: {
      eyebrow: "Route-based concept",
      title: "From takeaway shelf to your room.",
      subtitle: "This concept turns the service path into the hero animation so the product purpose is visible at once.",
      kicker: "The service story becomes visible before the user reads any text.",
      primaryLabel: "See login",
      secondaryLabel: "See register"
    },
    login: {
      eyebrow: "Route login",
      title: "The motion tells the service story.",
      subtitle: "The shelf-to-door path becomes the visual anchor while the form stays clean and fast.",
      highlight: "Best for showing concept storytelling and motion experiments."
    },
    register: {
      eyebrow: "Register route",
      title: "Map your dorm identity.",
      subtitle: "Registration feels like joining a campus route network rather than filling a generic sign-up page.",
      highlight: "This version gives the clearest explanation of what the service actually does."
    }
  }
];

export function getEntryTheme(themeId) {
  return entryThemes.find((theme) => theme.id === themeId) || entryThemes[0];
}
