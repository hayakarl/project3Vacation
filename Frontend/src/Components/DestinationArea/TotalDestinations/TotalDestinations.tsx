import './TotalDestinations.css';


export function TotalDestinations(): JSX.Element {
  // Registering to the global state and getting destination count:
//   const count = useSelector<AppState, number>((store) => store.destinations?.length || 0);
const count = 0

  return (
    <div className="TotalDestinations">
      <div>
        <span>=======</span>
      </div>
      {count > 0 && <span className="border">מספר חופשות: {count}</span>}
    </div>
  );
}
