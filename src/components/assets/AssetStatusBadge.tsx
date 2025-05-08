
import { Badge } from "@/components/ui/badge";
import { AssetStatus } from "@/types";
import { cn } from "@/lib/utils";

interface AssetStatusBadgeProps {
  status: AssetStatus;
  className?: string;
}

const AssetStatusBadge = ({ status, className }: AssetStatusBadgeProps) => {
  const getStatusConfig = (status: AssetStatus) => {
    switch (status) {
      case "active":
        return { label: "Active", variant: "bg-emerald-100 text-emerald-800" };
      case "inactive":
        return { label: "Inactive", variant: "bg-slate-100 text-slate-800" };
      case "maintenance":
        return { label: "Maintenance", variant: "bg-amber-100 text-amber-800" };
      case "retired":
        return { label: "Retired", variant: "bg-red-100 text-red-800" };
      case "lost":
        return { label: "Lost", variant: "bg-purple-100 text-purple-800" };
      default:
        return { label: "Unknown", variant: "bg-gray-100 text-gray-800" };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={cn("font-medium", config.variant, className)} variant="outline">
      {config.label}
    </Badge>
  );
};

export default AssetStatusBadge;
