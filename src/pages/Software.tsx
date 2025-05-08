
import { useState } from "react";
import { softwareAssets } from "@/data/mockData";
import { 
  Input 
} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AssetListItem from "@/components/assets/AssetListItem";
import { SoftwareAsset } from "@/types";
import { Filter, Plus, Search, RefreshCw } from "lucide-react";

const Software = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Filter software assets based on search query and filters
  const filteredAssets = softwareAssets.filter((asset) => {
    const matchesSearch =
      searchQuery === "" ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.version.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || asset.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" || asset.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Software Assets</h1>
          <p className="text-muted-foreground">
            Manage your software inventory
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Software
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search software assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="os">Operating Systems</SelectItem>
              <SelectItem value="productivity">Productivity</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <AssetListItem 
              key={asset.id} 
              asset={asset} 
              onClick={(asset) => console.log("Clicked asset:", asset)}
            />
          ))
        ) : (
          <div className="text-center py-12 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">No software assets found.</p>
            <Button variant="link" className="mt-2">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Software;
