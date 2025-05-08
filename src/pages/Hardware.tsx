
import { useState } from "react";
import { hardwareAssets } from "@/data/mockData";
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
import { HardwareAsset } from "@/types";
import { Filter, Plus, Search, RefreshCw } from "lucide-react";

const Hardware = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Filter hardware assets based on search query and filters
  const filteredAssets = hardwareAssets.filter((asset) => {
    const matchesSearch =
      searchQuery === "" ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());

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
          <h1 className="text-3xl font-bold tracking-tight">Hardware Assets</h1>
          <p className="text-muted-foreground">
            Manage your hardware inventory
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Hardware
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hardware assets..."
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
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="computer">Computers</SelectItem>
              <SelectItem value="server">Servers</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="printer">Printers</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="peripheral">Peripherals</SelectItem>
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
            <p className="text-muted-foreground">No hardware assets found.</p>
            <Button variant="link" className="mt-2">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hardware;
