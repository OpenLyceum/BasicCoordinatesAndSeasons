/**
 * SkyCoordinates.test.ts
 *
 * Unit tests for the pure spherical-astronomy transforms. These pin down the
 * behaviour the whole sim relies on: the NCP sits at an altitude equal to the
 * observer's latitude, equatorial objects transit/rise/set where expected, and
 * the equatorial↔horizontal transforms round-trip.
 */

import { Vector3 } from "scenerystack/dot";
import { describe, expect, it } from "vitest";
import {
  altitudeAtHourAngle,
  declinationBand,
  degToRad,
  equatorialToHorizontal,
  equatorialToHorizonVector,
  greatCircleDeclination,
  horizontalToEquatorial,
  NORTH_GALACTIC_POLE_DEC_DEGREES,
  NORTH_GALACTIC_POLE_RA_HOURS,
  raDecToVector3,
} from "../src/common/SkyCoordinates.js";

describe("equatorialToHorizontal", () => {
  it("places the North Celestial Pole at an altitude equal to the latitude (due north)", () => {
    const { altDeg, azDeg } = equatorialToHorizontal(0, 90, 40, 12);
    expect(altDeg).toBeCloseTo(40, 6);
    expect(azDeg).toBeCloseTo(0, 6);
  });

  it("places the NCP below the horizon for a southern observer", () => {
    const { altDeg } = equatorialToHorizontal(5, 90, -30, 3);
    expect(altDeg).toBeCloseTo(-30, 6);
  });

  it("transits an equatorial star on the meridian at altitude 90° − |lat|, due south", () => {
    // Hour angle 0 ⇒ LST == RA.
    const { altDeg, azDeg } = equatorialToHorizontal(6, 0, 40, 6);
    expect(altDeg).toBeCloseTo(50, 6);
    expect(azDeg).toBeCloseTo(180, 6);
  });

  it("puts an equatorial star due east on the horizon as it rises (H = −6h)", () => {
    const { altDeg, azDeg } = equatorialToHorizontal(6, 0, 40, 0); // LST − RA = −6h
    expect(altDeg).toBeCloseTo(0, 6);
    expect(azDeg).toBeCloseTo(90, 6);
  });

  it("puts an equatorial star due west on the horizon as it sets (H = +6h)", () => {
    const { altDeg, azDeg } = equatorialToHorizontal(6, 0, 40, 12); // LST − RA = +6h
    expect(altDeg).toBeCloseTo(0, 6);
    expect(azDeg).toBeCloseTo(270, 6);
  });
});

describe("equatorialToHorizonVector", () => {
  it("matches equatorialToHorizontal away from the zenith/nadir", () => {
    const ra = 6;
    const dec = 20;
    const lat = 40;
    const lst = 8;
    const { altDeg } = equatorialToHorizontal(ra, dec, lat, lst);
    const fromHorizontal = equatorialToHorizonVector(ra, dec, lat, lst);
    const back = horizontalToEquatorial(
      (Math.asin(fromHorizontal.z) * 180) / Math.PI,
      (Math.atan2(fromHorizontal.y, fromHorizontal.x) * 180) / Math.PI,
      lat,
      lst,
    );
    expect(back.raHours).toBeCloseTo(ra, 5);
    expect(back.decDeg).toBeCloseTo(dec, 5);
    expect(altDeg).toBeCloseTo((Math.asin(fromHorizontal.z) * 180) / Math.PI, 5);
  });

  it("maps the hour circle through zenith and nadir at the north pole without azimuth jumps", () => {
    const points = Array.from({ length: 25 }, (_, i) => equatorialToHorizonVector(0, -90 + i * 7.5, 90, 3));
    expect(points[0]?.z).toBeCloseTo(-1, 5);
    expect(points.at(-1)?.z).toBeCloseTo(1, 5);
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      if (!(a && b)) {
        throw new Error("expected consecutive horizon points to exist");
      }
      expect(a.dot(b)).toBeGreaterThan(0.95);
    }
  });
});

describe("horizontalToEquatorial", () => {
  it("inverts equatorialToHorizontal (round-trip)", () => {
    const ra = 8;
    const dec = 23;
    const lat = 35;
    const lst = 14;
    const horizontal = equatorialToHorizontal(ra, dec, lat, lst);
    const back = horizontalToEquatorial(horizontal.altDeg, horizontal.azDeg, lat, lst);
    expect(back.raHours).toBeCloseTo(ra, 5);
    expect(back.decDeg).toBeCloseTo(dec, 5);
  });

  it("maps the zenith to RA = LST and Dec = latitude", () => {
    const { raHours, decDeg } = horizontalToEquatorial(90, 0, 40, 7);
    expect(decDeg).toBeCloseTo(40, 6);
    expect(raHours).toBeCloseTo(7, 6);
  });
});

describe("altitudeAtHourAngle", () => {
  it("is highest at upper culmination (H = 0)", () => {
    const upper = altitudeAtHourAngle(20, 40, 0);
    const lower = altitudeAtHourAngle(20, 40, 12);
    expect(upper).toBeGreaterThan(lower);
    expect(upper).toBeCloseTo(70, 6); // 90 − |40 − 20|
  });
});

describe("declinationBand", () => {
  it("classifies high-declination stars as circumpolar at mid-northern latitude", () => {
    expect(declinationBand(70, 40)).toBe("circumpolar"); // dec ≥ 90 − 40
  });

  it("classifies equatorial stars as rising-and-setting", () => {
    expect(declinationBand(0, 40)).toBe("risesAndSets");
  });

  it("classifies far-southern stars as never rising for a northern observer", () => {
    expect(declinationBand(-70, 40)).toBe("neverRises");
  });

  it("flips circumpolar/never-rises in the southern hemisphere", () => {
    expect(declinationBand(-70, -40)).toBe("circumpolar");
    expect(declinationBand(70, -40)).toBe("neverRises");
  });
});

describe("greatCircleDeclination", () => {
  it("puts the ecliptic at 0° at the equinoxes and ±ε at the solstices", () => {
    expect(greatCircleDeclination(0, 18, 90 - 23.4)).toBeCloseTo(0, 6);
    expect(greatCircleDeclination(6, 18, 90 - 23.4)).toBeCloseTo(23.4, 6);
    expect(greatCircleDeclination(18, 18, 90 - 23.4)).toBeCloseTo(-23.4, 6);
  });

  it("matches tan δ = tan ε sin α for the ecliptic at RA 3ʰ (≈17.0°, not 16.3°)", () => {
    const expected = (Math.atan(Math.tan(degToRad(23.4)) * Math.sin(degToRad(45))) * 180) / Math.PI;
    expect(greatCircleDeclination(3, 18, 90 - 23.4)).toBeCloseTo(expected, 6);
  });

  it("returns points perpendicular to the galactic pole", () => {
    const pole = raDecToVector3(NORTH_GALACTIC_POLE_RA_HOURS, NORTH_GALACTIC_POLE_DEC_DEGREES);
    for (const ra of [0, 4, 8.5, 12, 19.25]) {
      const point = raDecToVector3(
        ra,
        greatCircleDeclination(ra, NORTH_GALACTIC_POLE_RA_HOURS, NORTH_GALACTIC_POLE_DEC_DEGREES),
      );
      expect(point.dot(pole)).toBeCloseTo(0, 9);
    }
  });
});

describe("transforms at the geographic poles", () => {
  // Horizon-frame unit vector (+X north, +Y east, +Z up) for an alt/az pair.
  const altAzVector = (altDeg: number, azDeg: number): Vector3 => {
    const alt = degToRad(altDeg);
    const az = degToRad(azDeg);
    return new Vector3(Math.cos(alt) * Math.cos(az), Math.cos(alt) * Math.sin(az), Math.sin(alt));
  };

  it.each([-90, -89.999999, 89.999999, 90])("round-trips at latitude %s without polar divisions", (latitude) => {
    for (const ra of [0, 2, 6, 17.9]) {
      for (const dec of [-90, -30, 0, 30, 90]) {
        const horizontal = equatorialToHorizontal(ra, dec, latitude, 0);
        const vector = altAzVector(horizontal.altDeg, horizontal.azDeg);
        expect(vector.distance(equatorialToHorizonVector(ra, dec, latitude, 0))).toBeLessThan(1e-12);
        const back = horizontalToEquatorial(horizontal.altDeg, horizontal.azDeg, latitude, 0);
        // RA is undefined at the celestial poles; compare sky directions instead.
        expect(raDecToVector3(back.raHours, back.decDeg).distance(raDecToVector3(ra, dec))).toBeLessThan(1e-12);
      }
    }
  });

  it("keeps azimuth tied to the hour angle for a north-pole observer", () => {
    // The old cos(latitude) division pinned every star at azimuth 270° here.
    const horizontal = equatorialToHorizontal(2, 30, 90, 0);
    expect(horizontal.azDeg).toBeCloseTo(150, 10);
    expect(horizontal.altDeg).toBeCloseTo(30, 10);
    const back = horizontalToEquatorial(horizontal.altDeg, horizontal.azDeg, 90, 0);
    expect(back.raHours).toBeCloseTo(2, 10);
    expect(back.decDeg).toBeCloseTo(30, 10);
  });
});
