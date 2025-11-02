import { MetricCard } from "../MetricCard";
import { Trees } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <MetricCard
        id="trees"
        title="Trees Planted"
        value="1,250"
        icon={Trees}
        description="This year's contribution"
      />
    </div>
  );
}
