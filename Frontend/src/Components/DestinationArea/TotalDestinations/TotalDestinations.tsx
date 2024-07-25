import { useSelector } from "react-redux";
import "./TotalDestinations.css";
import { AppState } from "../../../Redux/store";

export function TotalDestinations(): JSX.Element {

  // Registering to the global state and getting destination count:
  const count = useSelector<AppState, number>(store => store.destinations?.length || 0);

  return (
  <div className="TotalDestinations">
    <div>
         <span>=======</span>
    </div>
     {count > 0 && <span className="border">מספר חופשות: {count}</span>}
  </div>
  );
}
