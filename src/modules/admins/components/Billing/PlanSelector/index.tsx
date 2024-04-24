import { RadioTileGroup } from "rsuite";
import { EPlan } from "src/modules/shared";
import { PlanItem } from "./Item";

interface PlanSelectorProps {
  currentPlan: EPlan;
  plan: EPlan;
  onlyPaid?: boolean;
  onChange: (plan: EPlan) => void;
}

export function PlanSelector(props: PlanSelectorProps) {
  const { plan, currentPlan, onlyPaid, onChange } = props;

  return (
    <RadioTileGroup defaultValue={plan} aria-label="Create new project">
      {Object.values(EPlan)
        .filter((p) => (onlyPaid ? p !== EPlan.TRIAL : true))
        .map((p, index) => (
          <PlanItem
            key={index}
            plan={p}
            currentPlan={currentPlan}
            onChange={onChange}
            disabled={currentPlan === p}
          />
        ))}
    </RadioTileGroup>
  );
}
