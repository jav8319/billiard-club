import { Player } from './player';

// Represents a match in progress or completed
export interface Match {
  player: Player;        // Player participating in the match
  score: number;         // Match score
  isongoing: boolean;    // Whether the match is ongoing
}
