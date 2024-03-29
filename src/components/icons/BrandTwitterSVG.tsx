/* eslint-disable react/require-default-props */
const BrandTwitterSVG = ({
  width = 16,
  height = 16
}: {
  width?: number;
  height?: number;
}): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
    <path
      fill="gray"
      d="M8 2H1l8.26 11.014L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886L8 2Zm9 18L5 4h2l12 16h-2Z"
    />
  </svg>
);

export default BrandTwitterSVG;
