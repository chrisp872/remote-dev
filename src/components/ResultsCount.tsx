type ResultsCountProps = {
  totalJobItems: number;
};

export default function ResultsCount({ totalJobItems }: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalJobItems}</span> results
    </p>
  );
}
