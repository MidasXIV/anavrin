interface DataItem {
  token: string;
  fiat?: number;
  shares?: number;
}

export interface ValidationResult {
  valid: DataItem[];
  invalid: DataItem[];
}

export function validateData(data: DataItem[]): ValidationResult {
  const valid: DataItem[] = [];
  const invalid: DataItem[] = [];

  data.shift();
  data.forEach(item => {
    const { token, fiat, shares } = item;

    if (typeof token === "string" && typeof fiat === "number" && typeof shares === "number") {
      valid.push(item);
    } else {
      invalid.push(item);
    }
  });

  return { valid, invalid };
}

