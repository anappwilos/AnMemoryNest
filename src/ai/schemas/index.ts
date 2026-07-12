export type AIResult<T> = {
  data: T;
  warnings?: string[];
  confidence?: number;
};
