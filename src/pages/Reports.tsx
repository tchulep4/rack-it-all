
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hardwareAssets, softwareAssets, licenses } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FileDown } from "lucide-react";

const Reports = () => {
  // Generate hardware by location data
  const hardwareByLocation = hardwareAssets.reduce((acc: Record<string, number>, asset) => {
    const location = asset.location || "Unknown";
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const hardwareLocationData = Object.entries(hardwareByLocation)
    .map(([location, count]) => ({
      name: location,
      value: count,
    }))
    .sort((a, b) => b.value - a.value);

  // Generate software by publisher data
  const softwareByPublisher = softwareAssets.reduce((acc: Record<string, number>, asset) => {
    acc[asset.publisher] = (acc[asset.publisher] || 0) + 1;
    return acc;
  }, {});

  const softwarePublisherData = Object.entries(softwareByPublisher)
    .map(([publisher, count]) => ({
      name: publisher,
      value: count,
    }))
    .sort((a, b) => b.value - a.value);

  // License usage data for chart
  const licenseUsageData = licenses
    .map((license) => ({
      name: license.name,
      used: license.usedSeats,
      available: license.seats - license.usedSeats,
    }))
    .sort((a, b) => b.used - a.used)
    .slice(0, 5);

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate insights from your inventory data
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Hardware by Location</CardTitle>
                <CardDescription>Distribution of hardware assets by location</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hardwareLocationData}
                margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
              >
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3182CE" name="Assets" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Software by Publisher</CardTitle>
                <CardDescription>Distribution of software by publisher</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={softwarePublisherData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {softwarePublisherData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Top 5 License Utilization</CardTitle>
                <CardDescription>Shows used vs. available license seats</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={licenseUsageData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="used" stackId="a" fill="#3182CE" name="Used Seats" />
                <Bar
                  dataKey="available"
                  stackId="a"
                  fill="#E2E8F0"
                  name="Available Seats"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
