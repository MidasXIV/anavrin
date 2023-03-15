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
  console.log("bruh");
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

export { isEmpty, differenceBy, formatNumber };
