/**
 * CityData.ts
 *
 * The reference cities shown on the Terrestrial flat map when "Show cities" is on.
 * Transcribed from `cityList` in the decompiled NAAP mapExplorer010
 * (`Map.as`), converting each deg/min/hemisphere entry to signed decimal degrees
 * (+N latitude, +E longitude). The original's `side` field is kept to place each
 * label clear of its dot; it defaults to "right".
 *
 * Note: the NAAP data has Lincoln's latitude direction as "W" (a typo); the Flash
 * code only negates on "S", so it renders as 40.82° N / 96.67° W — which is exactly
 * the sim's default observer location. Transcribed here as N to match.
 */

/** One key per city in the `cities` group of strings_*.json. */
export type CityKey =
  | "buenosAires"
  | "lima"
  | "casablanca"
  | "monrovia"
  | "saoPaulo"
  | "lincoln"
  | "baghdad"
  | "greenwich"
  | "singapore"
  | "havana"
  | "canberra"
  | "calcutta"
  | "beijing"
  | "reykjavik"
  | "murmansk"
  | "washingtonDC"
  | "barrow"
  | "moscow"
  | "capeTown"
  | "mcMurdo";

export type CityLabelSide = "left" | "right" | "top" | "bottom";

export type City = {
  /** Key of the city's localized display name in the `cities` string group. */
  readonly key: CityKey;
  /** Latitude in decimal degrees (+N). */
  readonly latitude: number;
  /** Longitude in decimal degrees (+E). */
  readonly longitude: number;
  /** Which side of the dot to place the label (defaults to "right"). */
  readonly side: CityLabelSide;
};

export const CITIES: readonly City[] = [
  { key: "buenosAires", latitude: -34.3333, longitude: -58.5, side: "left" },
  { key: "lima", latitude: -12.1, longitude: -76.9167, side: "left" },
  { key: "casablanca", latitude: 33.5333, longitude: -7.6833, side: "bottom" },
  { key: "monrovia", latitude: 6.3333, longitude: -10.7667, side: "right" },
  { key: "saoPaulo", latitude: -23.5667, longitude: -46.6333, side: "bottom" },
  { key: "lincoln", latitude: 40.8167, longitude: -96.6667, side: "left" },
  { key: "baghdad", latitude: 33.2333, longitude: 44.3667, side: "right" },
  { key: "greenwich", latitude: 51.6667, longitude: 0, side: "left" },
  { key: "singapore", latitude: 1.3667, longitude: 103.75, side: "left" },
  { key: "havana", latitude: 23.1333, longitude: -82.3833, side: "bottom" },
  { key: "canberra", latitude: -35.3, longitude: 149.1333, side: "bottom" },
  { key: "calcutta", latitude: 22.5333, longitude: 88.3667, side: "bottom" },
  { key: "beijing", latitude: 39.9167, longitude: 116.3833, side: "right" },
  { key: "reykjavik", latitude: 64.15, longitude: -21.9667, side: "right" },
  { key: "murmansk", latitude: 68.9833, longitude: 33.1333, side: "top" },
  { key: "washingtonDC", latitude: 38.8833, longitude: -77.0333, side: "right" },
  { key: "barrow", latitude: 71.2833, longitude: -156.7833, side: "right" },
  { key: "moscow", latitude: 55.75, longitude: 37.6167, side: "right" },
  { key: "capeTown", latitude: -33.9167, longitude: 18.45, side: "bottom" },
  { key: "mcMurdo", latitude: -77.85, longitude: 166.6667, side: "left" },
];
