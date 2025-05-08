
import { HardwareAsset, SoftwareAsset } from "@/types";
import AssetStatusBadge from "./AssetStatusBadge";
import { formatDate } from "@/lib/utils";

interface AssetListItemProps {
  asset: HardwareAsset | SoftwareAsset;
  onClick?: (asset: HardwareAsset | SoftwareAsset) => void;
}

const AssetListItem = ({ asset, onClick }: AssetListItemProps) => {
  // Format the purchase date
  const formattedPurchaseDate = asset.purchaseDate
    ? new Date(asset.purchaseDate).toLocaleDateString()
    : "N/A";

  // Determine what subtitle to show based on asset type
  const getSubtitle = () => {
    if (asset.type === "hardware") {
      return `${asset.manufacturer} ${asset.model} - S/N: ${asset.serialNumber}`;
    } else {
      return `${asset.publisher} - v${asset.version}`;
    }
  };

  // Handle click event
  const handleClick = () => {
    if (onClick) {
      onClick(asset);
    }
  };

  return (
    <div 
      className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">{asset.name}</h3>
          <p className="text-sm text-muted-foreground">{getSubtitle()}</p>
        </div>
        <AssetStatusBadge status={asset.status} />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <div>
          <span className="text-muted-foreground">Location: </span>
          <span>{asset.location || "Unknown"}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Department: </span>
          <span>{asset.department || "Unassigned"}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Purchased: </span>
          <span>{formattedPurchaseDate}</span>
        </div>
        <div>
          <span className="text-muted-foreground">ID: </span>
          <span className="font-mono">{asset.id}</span>
        </div>
      </div>
    </div>
  );
};

export default AssetListItem;
