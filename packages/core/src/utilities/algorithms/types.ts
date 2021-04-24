import type {
  RectEntry,
  ViewRect,
  UniqueIdentifier,
  Coordinates,
} from '../../types';

export type CollisionDetection = (
  entries: RectEntry[],
  target: ViewRect,
  coordinates?: Coordinates | null
) => UniqueIdentifier | null;
