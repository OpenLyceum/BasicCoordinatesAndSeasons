/**
 * SeasonsKeyboardHelpContent.ts
 *
 * Keyboard Shortcuts dialog for the Seasons screen. Earth is keyboard-draggable
 * around its orbit (arrow keys change the date) and the celestial sphere rotates
 * with the arrow keys — both covered by "move draggable items". The latitude
 * NumberControl adds a slider section, and play/pause adds a time-controls
 * section.
 */

import {
  BasicActionsKeyboardHelpSection,
  MoveDraggableItemsKeyboardHelpSection,
  SliderControlsKeyboardHelpSection,
  TimeControlsKeyboardHelpSection,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";
import { SkySphereKeyboardHelpSection } from "../../common/view/SkySphereKeyboardHelpSection.js";

export class SeasonsKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    super(
      [
        new MoveDraggableItemsKeyboardHelpSection(),
        new SkySphereKeyboardHelpSection(),
        new SliderControlsKeyboardHelpSection(),
      ],
      [new TimeControlsKeyboardHelpSection(), new BasicActionsKeyboardHelpSection()],
    );
  }
}
