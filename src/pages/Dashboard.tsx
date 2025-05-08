
import { useEffect, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import AssetDonutChart from "@/components/dashboard/AssetDonutChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import LicenseAlerts from "@/components/dashboard/LicenseAlerts";
import { hardwareAssets, softwareAssets, licenses } from "@/data/mockData";
import { HardwareCategory, SoftwareCategory } from "@/types";
import { 
  Monitor, 
  Package, 
  Key, 
  Users,
  Award
} from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate hardware assets by category
  const hardwareByCategory = hardwareAssets.reduce<Record<HardwareCategory, number>>(
    (acc, asset) => {
      acc[asset.category] = (acc[asset.category] || 0) + 1;
      return acc;
    },
    {} as Record<HardwareCategory, number>
  );

  // Calculate software assets by category
  const softwareByCategory = softwareAssets.reduce<Record<SoftwareCategory, number>>(
    (acc, asset) => {
      acc[asset.category] = (acc[asset.category] || 0) + 1;
      return acc;
    },
    {} as Record<SoftwareCategory, number>
  );

  // Format data for hardware chart
  const hardwareChartData = Object.entries(hardwareByCategory).map(([category, count]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: count,
    color: getCategoryColor(category),
  }));

  // Format data for software chart
  const softwareChartData = Object.entries(softwareByCategory).map(([category, count]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: count,
    color: getCategoryColor(category),
  }));

  // Mock recent activity data
  const recentActivities = [
    {
      id: '1',
      message: 'New hardware asset added: Dell Latitude 7420',
      timestamp: '2023-05-07T14:32:00Z',
      type: 'hardware' as const,
      user: 'John Smith',
    },
    {
      id: '2',
      message: 'Software license for Adobe Creative Cloud updated',
      timestamp: '2023-05-07T11:15:00Z',
      type: 'software' as const,
      user: 'Sarah Johnson',
    },
    {
      id: '3',
      message: 'Warning: Microsoft Office licenses at 92% utilization',
      timestamp: '2023-05-06T16:45:00Z',
      type: 'alert' as const,
      user: 'System',
    },
    {
      id: '4',
      message: 'User Robert Wilson added to IT department',
      timestamp: '2023-05-06T10:22:00Z',
      type: 'user' as const,
      user: 'Admin',
    },
    {
      id: '5',
      message: 'Hardware asset HP LaserJet Pro assigned to Marketing',
      timestamp: '2023-05-05T15:10:00Z',
      type: 'hardware' as const,
      user: 'Sarah Johnson',
    },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your IT asset inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Hardware Assets" 
          value={hardwareAssets.length} 
          description="All hardware devices" 
          icon={<Monitor />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Total Software Assets" 
          value={softwareAssets.length} 
          description="All software applications" 
          icon={<Package />} 
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard 
          title="Active Licenses" 
          value={licenses.length} 
          description="Software licenses in use" 
          icon={<Key />} 
          trend={{ value: 0, isPositive: true }}
        />
        <StatCard 
          title="Warranty Expiring Soon" 
          value={2} 
          description="In the next 30 days" 
          icon={<Award />} 
          trend={{ value: 1, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AssetDonutChart 
            title="Hardware by Category" 
            description="Distribution of hardware assets" 
            data={hardwareChartData} 
          />
          <AssetDonutChart 
            title="Software by Category" 
            description="Distribution of software assets" 
            data={softwareChartData} 
          />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <LicenseAlerts licenses={licenses} />
        </div>
      </div>

      <div>
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
};

// Helper function to get color for category
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    // Hardware categories
    computer: '#4C51BF',
    server: '#3182CE',
    network: '#38B2AC',
    printer: '#9F7AEA',
    mobile: '#ED8936',
    peripheral: '#667EEA',
    other: '#718096',
    
    // Software categories
    os: '#2B6CB0',
    productivity: '#38A169',
    security: '#E53E3E',
    development: '#805AD5',
    design: '#D69E2E',
    business: '#3182CE',
  };

  return colors[category] || '#CBD5E0';
}

export default Dashboard;
