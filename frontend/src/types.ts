export interface DataPoint {
    t: number;
    last: number;
    price?: number | null;
    vol?: number;
    volPct?: number;
    change?: number;
  }
  