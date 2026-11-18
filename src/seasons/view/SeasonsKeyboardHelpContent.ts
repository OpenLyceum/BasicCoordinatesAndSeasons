/**
 * SeasonsKeyboardHelpContent.ts
 *
 * Keyboard Shortcuts dialog for the Seasons screen. Earth is keyboard-draggable
 * around its orbit (arrow keys change the date) and the celestial sphere rotates
 * with the arrow keys — covered by the marker and sky-sphere sections. The latitude
 * NumberControl adds a slider section, and play/pause adds a time-controls
 * section.
 */

import {
  BasicActionsKeyboardHelpSection,
  SliderControlsKeyboardHelpSection,
  TimeControlsKeyboardHelpSection,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";
import { MoveMarkerKeyboardHelpSection } from "../../common/view/MoveMarkerKeyboardHelpSection.js";
import { SkySphereKeyboardHelpSection } from "../../common/view/SkySphereKeyboardHelpSection.js";

export class SeasonsKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    super(
      [
        new MoveMarkerKeyboardHelpSection(),
        new SkySphereKeyboardHelpSection(),
        new SliderControlsKeyboardHelpSection(),
      ],
      [new TimeControlsKeyboardHelpSection(), new BasicActionsKeyboardHelpSection()],
    );
  }
}
