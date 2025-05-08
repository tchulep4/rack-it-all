
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Monitor, Package, User, AlertCircle } from "lucide-react";

interface Activity {
  id: string;
  message: string;
  timestamp: string;
  type: 'hardware' | 'software' | 'user' | 'alert';
  user: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'hardware':
        return <Monitor className="h-4 w-4" />;
      case 'software':
        return <Package className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 border-b border-border pb-3 last:border-0 last:pb-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              {getActivityIcon(activity.type)}
            </div>
            <div className="space-y-1">
              <p className="text-sm">{activity.message}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{activity.user}</span>
                <span className="mx-1">•</span>
                <span>{formatTime(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
