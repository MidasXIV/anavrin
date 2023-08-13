/* eslint-disable react/require-default-props */
const BrandMediumSVG = ({
  width = 16,
  height = 16
}: {
  width?: number;
  height?: number;
}): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-brand-medium"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#2c3e50"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
    <path d="M8 9h1l3 3l3 -3h1" />
    <path d="M8 15l2 0" />
    <path d="M14 15l2 0" />
    <path d="M9 9l0 6" />
    <path d="M15 9l0 6" />
  </svg>
);

export default BrandMediumSVG;
