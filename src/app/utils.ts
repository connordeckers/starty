export interface Position {
  latitude: number;
  longitude: number;
}

export function distance(pointA: Position, pointB: Position) {
  if (
    pointA.latitude == pointB.latitude &&
    pointB.longitude == pointB.longitude
  ) {
    return 0;
  }

  const radlat1 = (Math.PI * pointA.latitude) / 180;
  const radlat2 = (Math.PI * pointB.latitude) / 180;
  const theta = pointA.latitude - pointB.latitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  /**
   * if (unit == 'K') {
   *   dist = dist * 1.609344;
   * }
   * if (unit == 'N') {
   *   dist = dist * 0.8684;
   * }
   */
  return dist;
}

type PositionContainingObject = { location: Position; [key: string]: any };
export function nearestPoint(
  reference: Position,
  points: Position[] | PositionContainingObject[]
) {
  if (!Array.isArray(points)) return null;
  if ('location' in points[0]) {
    // This is a collection of objects with a location key
    const closest = (points as PositionContainingObject[]).reduce(
      (shortest, point) => {
        const difference = distance(reference, point.location);
        if (difference < shortest) return difference;
        return shortest;
      },
      Number.MAX_VALUE
    );

    if (closest == Number.MAX_VALUE) return null;
    return closest;
  } else {
    return null;
  }
}
