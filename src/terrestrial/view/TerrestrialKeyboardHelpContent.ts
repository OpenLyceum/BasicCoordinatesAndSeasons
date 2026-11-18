/**
 * TerrestrialKeyboardHelpContent.ts
 *
 * Keyboard Shortcuts dialog for the Terrestrial Coordinates screen. The
 * observer marker on the flat map and on the globe is keyboard-draggable
 * (arrow keys nudge latitude/longitude), so the arrows-only marker section
 * documents that alongside the sky-sphere and basic actions.
 */

import { BasicActionsKeyboardHelpSection, TwoColumnKeyboardHelpContent } from "scenerystack/scenery-phet";
import { MoveMarkerKeyboardHelpSection } from "../../common/view/MoveMarkerKeyboardHelpSection.js";
import { SkySphereKeyboardHelpSection } from "../../common/view/SkySphereKeyboardHelpSection.js";

export class TerrestrialKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    super(
      [new MoveMarkerKeyboardHelpSection(), new SkySphereKeyboardHelpSection()],
      [new BasicActionsKeyboardHelpSection()],
    );
  }
}
