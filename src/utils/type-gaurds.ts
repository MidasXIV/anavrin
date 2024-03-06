function isEveryPropertyEmpty<T>(value: T): boolean {
  let isAllPropsEmpty = true;
  if (typeof value === "object" && !Array.isArray(value)) {
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i += 1) {
      const prop = keys[i];
      if (Object.prototype.hasOwnProperty.call(value, prop)) {
        const propValue = (value as { [key: string]: T })[prop];
        if (propValue !== undefined && propValue !== null && propValue !== "") {
          isAllPropsEmpty = false;
          break;
        }
      }
    }
  }
  return isAllPropsEmpty;
}

/**
 * Check for an empty value for data items like GPString and Field.
 * @param value data item value.
 * @returns whether the value is considered empty.
 */
export default function isEmptyDataItem<T>(value: T): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value === "") ||
    (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) ||
    (Array.isArray(value) && value.length < 1) ||
    (typeof value === "object" && !Array.isArray(value) && isEveryPropertyEmpty(value))
  );
}
