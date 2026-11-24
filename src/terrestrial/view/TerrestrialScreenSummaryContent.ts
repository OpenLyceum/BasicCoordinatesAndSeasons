/**
 * TerrestrialScreenSummaryContent.ts
 *
 * The accessible screen summary for the Terrestrial Coordinates screen. Its
 * "current details" region is a live sentence describing the observer's latitude
 * and longitude, formatted with hemisphere letters (e.g. "40.8° N, 96.7° W").
 */

import { DerivedProperty, PatternStringProperty } from "scenerystack/axon";
import { ScreenSummaryContent } from "scenerystack/sim";
import { formatLatitude, formatLongitude } from "../../common/formatAngles.js";
import { StringManager } from "../../i18n/StringManager.js";
import type { TerrestrialModel } from "../model/TerrestrialModel.js";

export class TerrestrialScreenSummaryContent extends ScreenSummaryContent {
  public constructor(model: TerrestrialModel) {
    const a11y = StringManager.getInstance().getTerrestrialA11yStrings();
    const controls = StringManager.getInstance().getControls();

    const latitudeReadoutProperty = new DerivedProperty(
      [model.latitudeProperty, controls.northStringProperty, controls.southStringProperty],
      (lat, north, south) => formatLatitude(lat, 1, { north, south, east: "", west: "" }),
    );
    const longitudeReadoutProperty = new DerivedProperty(
      [model.longitudeProperty, controls.eastStringProperty, controls.westStringProperty],
      (lon, east, west) => formatLongitude(lon, 1, { north: "", south: "", east, west }),
    );

    super({
      playAreaContent: a11y.screenSummary.playAreaStringProperty,
      controlAreaContent: a11y.screenSummary.controlAreaStringProperty,
      currentDetailsContent: new PatternStringProperty(a11y.currentDetailsPatternStringProperty, {
        latitude: latitudeReadoutProperty,
        longitude: longitudeReadoutProperty,
      }),
      interactionHintContent: a11y.screenSummary.interactionHintStringProperty,
    });
  }
}
