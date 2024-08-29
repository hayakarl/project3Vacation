import './TotalDestinations.css';

export function TotalDestinations(): JSX.Element {
  const count = 0;

  return (
    <div className="TotalDestinations">
      <div>
        <span>=======</span>
      </div>
      {count > 0 && <span className="border">מספר חופשות: {count}</span>}
    </div>
  );
}
