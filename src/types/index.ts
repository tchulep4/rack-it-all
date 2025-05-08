
// Asset Types
export type AssetStatus = 'active' | 'inactive' | 'maintenance' | 'retired' | 'lost';

export type AssetType = 'hardware' | 'software';

export interface BaseAsset {
  id: string;
  name: string;
  status: AssetStatus;
  purchaseDate?: string;
  purchaseCost?: number;
  location?: string;
  department?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastUpdatedBy: string;
}

export interface HardwareAsset extends BaseAsset {
  type: 'hardware';
  manufacturer: string;
  model: string;
  serialNumber: string;
  macAddress?: string;
  ipAddress?: string;
  category: HardwareCategory;
  warranty?: {
    expiryDate: string;
    provider: string;
    contractNumber?: string;
  };
}

export interface SoftwareAsset extends BaseAsset {
  type: 'software';
  publisher: string;
  version: string;
  licenseType: string;
  licenseKey?: string;
  installDate?: string;
  expiryDate?: string;
  supportEmail?: string;
  category: SoftwareCategory;
}

export type Asset = HardwareAsset | SoftwareAsset;

export type HardwareCategory = 
  | 'computer'
  | 'server'
  | 'network'
  | 'printer'
  | 'mobile'
  | 'peripheral'
  | 'other';

export type SoftwareCategory = 
  | 'os'
  | 'productivity'
  | 'security'
  | 'development'
  | 'design'
  | 'business'
  | 'other';

// License Types
export interface License {
  id: string;
  name: string;
  publisher: string;
  purchaseDate: string;
  expirationDate?: string;
  seats: number;
  usedSeats: number;
  cost?: number;
  notes?: string;
  contractNumber?: string;
  contactPerson?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export type UserRole = 'admin' | 'manager' | 'technician' | 'user';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  lastLogin?: string;
  createdAt: string;
  active: boolean;
}
