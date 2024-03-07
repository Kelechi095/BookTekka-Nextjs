interface HeadingProps {
  title: string;
  center?: boolean;
  theme?: boolean;
}

const Heading = ({ title, center, theme }: HeadingProps) => {
  return (
    <header
      className={`
    ${center ? "text-center" : "text-start"}
    ${theme && "text-rose-400"}
    `}
    >
      <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
    </header>
  );
};

export default Heading;
