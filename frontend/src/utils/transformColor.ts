const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/i;

export const transformColor = (hexColor: string, відсоток: number) => {
  // перевірка на валідність вхідного кольору
  if (!HEX_COLOR_REGEX.test(hexColor)) {
    console.error("Некоректний колір:", hexColor);
    return null;
  }

  // видалення символу # з кольору
  const hex = hexColor.replace(/^#/, "");

  // преобразування HEX в RGB
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // преобразування яскравості
  r = Math.min(255, Math.max(0, r - (відсоток / 100) * r));
  g = Math.min(255, Math.max(0, g - (відсоток / 100) * g));
  b = Math.min(255, Math.max(0, b - (відсоток / 100) * b));

  // преобразування RGB назад в HEX
  const transformedColor = `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)}`;

  return transformedColor;
};
