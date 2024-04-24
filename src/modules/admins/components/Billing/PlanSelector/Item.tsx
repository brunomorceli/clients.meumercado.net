import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, RadioTile, Text } from "rsuite";
import { EPlan, EPlanHandler, GeneralUtils } from "src/modules/shared";

interface PlanItemProps {
  plan: EPlan;
  currentPlan?: EPlan;
  disabled?: boolean;
  onChange: (paln: EPlan) => void;
}

export function PlanItem(props: PlanItemProps) {
  const { plan, currentPlan, disabled, onChange } = props;

  const label = `${EPlanHandler.label(plan)}${
    plan === currentPlan ? " (Plano atual)" : ""
  }`;
  const icon = EPlanHandler.icon(plan);
  const description = EPlanHandler.description(plan);
  const perks = EPlanHandler.perks(plan);
  const price = EPlanHandler.price(plan);

  return (
    <RadioTile
      icon={icon}
      label={label}
      value={plan}
      onClick={() => onChange(plan)}
      disabled={disabled}
    >
      <Text>{description}</Text>
      {perks.map((perk, index) => (
        <div key={index}>
          <FontAwesomeIcon style={{ color: "#689F38" }} icon={faCircleCheck} />
          &nbsp;
          {perk}
        </div>
      ))}
      <Heading level={1}>
        {GeneralUtils.getAmountLabel(price)}
        <span style={{ fontSize: 20 }}>/ mês</span>
      </Heading>
    </RadioTile>
  );
}
