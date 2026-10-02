/**
 * coordinateStrings.ts
 *
 * Readout strings built from the localized patterns in `controls`, so a
 * translation can reorder a value and its unit or hemisphere letter, and adjust
 * the spacing around a colon. Each factory returns a DerivedProperty that
 * follows both its numeric input and the locale.
 */

import { DerivedProperty, type TReadOnlyProperty } from "scenerystack/axon";
import { toFixed } from "scenerystack/dot";
import { StringUtils } from "scenerystack/phetcommon";
import { StringManager } from "../../i18n/StringManager.js";

const DECIMAL_PLACES = 1;

/** "23.4°" */
export function createDegreesStringProperty(valueProperty: TReadOnlyProperty<number>): TReadOnlyProperty<string> {
  const controls = StringManager.getInstance().getControls();
  return new DerivedProperty([controls.degreesPatternStringProperty, valueProperty], (pattern, value) =>
    StringUtils.fillIn(pattern, { value: toFixed(value, DECIMAL_PLACES) }),
  );
}

/** "6.5 h" */
export function createHoursStringProperty(valueProperty: TReadOnlyProperty<number>): TReadOnlyProperty<string> {
  const controls = StringManager.getInstance().getControls();
  return new DerivedProperty([controls.hoursPatternStringProperty, valueProperty], (pattern, value) =>
    StringUtils.fillIn(pattern, { value: toFixed(value, DECIMAL_PLACES) }),
  );
}

/** "40.8° N" / "33.9° S", with the localized hemisphere letter. */
export function createLatitudeStringProperty(latitudeProperty: TReadOnlyProperty<number>): TReadOnlyProperty<string> {
  const controls = StringManager.getInstance().getControls();
  return new DerivedProperty(
    [
      controls.hemisphereAnglePatternStringProperty,
      controls.northStringProperty,
      controls.southStringProperty,
      latitudeProperty,
    ],
    (pattern, north, south, latitude) =>
      StringUtils.fillIn(pattern, {
        value: toFixed(Math.abs(latitude), DECIMAL_PLACES),
        letter: latitude >= 0 ? north : south,
      }),
  );
}

/** "Label: value", with the locale's spacing around the colon. */
export function createLabelValueStringProperty(
  labelProperty: TReadOnlyProperty<string>,
  valueProperty: TReadOnlyProperty<string>,
): TReadOnlyProperty<string> {
  const controls = StringManager.getInstance().getControls();
  return new DerivedProperty(
    [controls.labelValuePatternStringProperty, labelProperty, valueProperty],
    (pattern, label, value) => StringUtils.fillIn(pattern, { label: label, value: value }),
  );
}
