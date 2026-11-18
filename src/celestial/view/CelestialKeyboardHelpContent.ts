/**
 * CelestialKeyboardHelpContent.ts
 *
 * Keyboard Shortcuts dialog for the Celestial Coordinates screen. The star on
 * the flat sky map and the guide star on the celestial sphere are keyboard-
 * draggable (arrow keys nudge right ascension/declination), and the sphere
 * itself rotates with the arrow keys when focused — covered by the marker and
 * sky-sphere sections.
 */

import { BasicActionsKeyboardHelpSection, TwoColumnKeyboardHelpContent } from "scenerystack/scenery-phet";
import { MoveMarkerKeyboardHelpSection } from "../../common/view/MoveMarkerKeyboardHelpSection.js";
import { SkySphereKeyboardHelpSection } from "../../common/view/SkySphereKeyboardHelpSection.js";

export class CelestialKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    super(
      [new MoveMarkerKeyboardHelpSection(), new SkySphereKeyboardHelpSection()],
      [new BasicActionsKeyboardHelpSection()],
    );
  }
}
