/**
 * Generates a random hex color code.
 *
 * @returns {string} - The randomly generated color code.
 */
export function generateRandomColor() {
  const validColors = [
    "amber",
    "zinc",
    "stone",
    "fuchsia",
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "emerald",
    "pink",
    "teal",
    "gray",
    "cyan",
    "sky",
    "blue",
    "slate",
    "indigo",
    "violet",
    "purple",
    "rose",
    "neutral"
  ];
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
