export function excludeProperty<
  T extends Record<string, any>,
  K extends keyof T,
>({ obj, property }: { obj: T; property: K }): Omit<T, K> {
  const { [property]: omitted, ...rest } = obj;
  return rest;
}

// // Example usage:
// const originalObject = { a: 1, b: 2, c: 3 };
// const excludedProperty = 'b';

// const newObj = excludeProperty(originalObject, excludedProperty);
// console.log(newObj); // Output: { a: 1, c: 3 }
