/**
 * Function that checks if the input object is empty
 *
 * @param {Record<string, unknown>} obj - The input object to check
 * @returns {boolean} - A boolean value indicating if the object is empty or not
 */
function isEmpty(obj: Record<string, unknown>): boolean {
  // Get the keys of the object and check if the length of the keys is 0
  return Object.keys(obj).length === 0;
}

/**
 * returns an array of unique values from the first array that do
 * not exist in the second array, determined by a specific property.
 *
 * @param array1 The first array to compare.
 * @param array2 The second array to compare.
 * @param iteratee The function invoked for each element to extract the property to compare.
 * @returns Difference between the two arrays
 */
function differenceBy(array1: any[], array2: any[], iteratee: string): any[] {
  const set = new Set(array2.map(item => item[iteratee]));
  console.log(array1.filter(item => !set.has(item[iteratee])));
  return array1.filter(item => !set.has(item[iteratee]));
}

/**
 * Formats a number into a more human-readable format with commas and 2 decimal places.
 *
 * @param {number} num - The number to format
 * @returns {string} - The formatted number as a string
 */
function formatNumber(num: number): string {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

/**
 * Remove an object from an array if it matches the given object based on the provided property.
 * @param {T[]} arr - The array to remove the object from.
 * @param {T} obj - The object to remove from the array.
 * @param {keyof T} [prop] - The name of the property to check in the object.
 * @returns {T[]} A new array with the object removed, or the original array if the object was not found.
 * @template T
 */
function removeObjFromArray<T>(arr: T[], obj: T, propToCheck: keyof T): T[] {
  return arr.filter(item => item[propToCheck] !== obj[propToCheck]);
}

export { isEmpty, differenceBy, formatNumber, removeObjFromArray };
