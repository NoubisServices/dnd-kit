import type {LayoutRect, Coordinates} from '../../types';
import type {CollisionDetection} from './types';

const testIntersection = (
  entry: LayoutRect,
  pointerCoordinates: Coordinates
) => {
  const {x, y} = pointerCoordinates;
  const isWithinX = x > entry.offsetLeft && x < entry.offsetLeft + entry.width;
  const isWithinY = y > entry.offsetTop && y < entry.offsetTop + entry.height;

  return isWithinX && isWithinY ? true : false;
};
/**
 * Returns the rectangle that is intersecting with pointer
 */
export const pointerIntersection: CollisionDetection = (
  entries,
  _,
  coordinates
) => {
  const intersections = entries.map(([_, entry]) =>
    testIntersection(entry, coordinates!)
  );

  const firstIndex = intersections.findIndex(Boolean);
  if (firstIndex !== -1) {
    return entries[firstIndex][0];
  }
  return null;
};
