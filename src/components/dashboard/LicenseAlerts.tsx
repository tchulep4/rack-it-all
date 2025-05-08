
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { License } from "@/types";

interface LicenseAlertsProps {
  licenses: License[];
}

const LicenseAlerts = ({ licenses }: LicenseAlertsProps) => {
  // Sort licenses by usage percentage (highest to lowest)
  const sortedLicenses = [...licenses]
    .sort((a, b) => (b.usedSeats / b.seats) - (a.usedSeats / a.seats))
    .slice(0, 5);

  const getProgressColor = (usedSeats: number, totalSeats: number): string => {
    const usagePercentage = (usedSeats / totalSeats) * 100;
    if (usagePercentage >= 90) return "bg-destructive";
    if (usagePercentage >= 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Utilization</CardTitle>
        <CardDescription>Top 5 license usage by percentage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedLicenses.map((license) => {
          const usagePercentage = Math.round((license.usedSeats / license.seats) * 100);
          return (
            <div key={license.id} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium">{license.name}</span>
                <span className="text-xs text-muted-foreground">
                  {license.usedSeats} / {license.seats} ({usagePercentage}%)
                </span>
              </div>
              <Progress 
                value={usagePercentage} 
                className={`h-2 ${getProgressColor(license.usedSeats, license.seats)}`} 
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default LicenseAlerts;
