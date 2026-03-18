export const entryThemes = [
  {
    id: "bell",
    name: "Demo A",
    headline: "Bell Hero",
    summary: "A formal campus welcome with a rising green bell tower and a calm dawn gradient.",
    campusTag: "Hubei green bell",
    deliveryTag: "Fast clarity",
    heroKind: "bell",
    shell: {
      bgStart: "#f5fbf7",
      bgEnd: "#d8efe0",
      accent: "#1e7b4d",
      accentSoft: "#8bc8a2",
      secondary: "#114c95",
      panel: "#fefefe",
      textStrong: "#0f172a",
      textMuted: "#4b5563",
      button: "#111111"
    },
    splash: {
      eyebrow: "Campus ceremonial concept",
      title: "Trusted help from shelf to door.",
      subtitle: "Built for Hubei University students, with a delivery-app rhythm and a calmer campus tone.",
      primaryLabel: "Preview login",
      secondaryLabel: "Preview register"
    },
    login: {
      eyebrow: "Student sign in",
      title: "Enter fast. Stay trusted.",
      subtitle: "Big action, clean form, and a bell-shaped campus identity."
    },
    register: {
      eyebrow: "Create account",
      title: "Join your dorm delivery circle.",
      subtitle: "Register once, then post or accept requests with a clear student profile."
    }
  },
  {
    id: "card",
    name: "Demo B",
    headline: "Delivery Card",
    summary: "A sharper product feel with stacked cards, strong CTA focus, and a bold green-to-blue split.",
    campusTag: "MMU blue support",
    deliveryTag: "Card hierarchy",
    heroKind: "card",
    shell: {
      bgStart: "#eef7f1",
      bgEnd: "#d5e8ff",
      accent: "#199f56",
      accentSoft: "#9de4b4",
      secondary: "#0a4ebd",
      panel: "#ffffff",
      textStrong: "#08111f",
      textMuted: "#475569",
      button: "#0b0b0b"
    },
    splash: {
      eyebrow: "Delivery-app composition",
      title: "Move a request in seconds.",
      subtitle: "Inspired by delivery products, reworked for campus trust, dorm identity, and quick scanability.",
      primaryLabel: "Open login",
      secondaryLabel: "Open register"
    },
    login: {
      eyebrow: "Quick access",
      title: "A stronger first-screen CTA.",
      subtitle: "This concept uses stacked cards and bold spacing to feel more product-like."
    },
    register: {
      eyebrow: "New student setup",
      title: "One form. Clear dorm identity.",
      subtitle: "The fields sit inside a bold panel so the page stays easy to scan on mobile."
    }
  },
  {
    id: "route",
    name: "Demo C",
    headline: "Campus Route",
    summary: "An animated route from takeaway shelf to dorm room, with soft path lines and layered blue-green motion.",
    campusTag: "Shelf-to-door path",
    deliveryTag: "Route animation",
    heroKind: "route",
    shell: {
      bgStart: "#f5faf8",
      bgEnd: "#d9e9fb",
      accent: "#18794e",
      accentSoft: "#95d0a8",
      secondary: "#2162d8",
      panel: "#ffffff",
      textStrong: "#0b1325",
      textMuted: "#526072",
      button: "#0f172a"
    },
    splash: {
      eyebrow: "Route-based concept",
      title: "From takeaway shelf to your room.",
      subtitle: "This concept turns the service path into the hero animation so the product purpose is visible at once.",
      primaryLabel: "See login",
      secondaryLabel: "See register"
    },
    login: {
      eyebrow: "Route login",
      title: "The motion tells the service story.",
      subtitle: "The shelf-to-door path becomes the visual anchor while the form stays clean and fast."
    },
    register: {
      eyebrow: "Register route",
      title: "Map your dorm identity.",
      subtitle: "Registration feels like joining a campus route network rather than filling a generic sign-up page."
    }
  }
];

export function getEntryTheme(themeId) {
  return entryThemes.find((theme) => theme.id === themeId) || entryThemes[0];
}
