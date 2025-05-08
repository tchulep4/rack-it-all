
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  const [isAutoDiscovery, setIsAutoDiscovery] = useState(true);
  const [scanInterval, setScanInterval] = useState(24);
  const [canSubmit, setCanSubmit] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage application preferences</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="network">Network Discovery</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold">General Settings</h2>
            <p className="text-muted-foreground">
              Manage your basic application preferences
            </p>
          </div>
          <Separator />

          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Acme Corporation" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" defaultValue="admin@example.com" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="license-key">License Key</Label>
              <Input id="license-key" defaultValue="XXXX-XXXX-XXXX-XXXX" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark mode for the application interface
                </p>
              </div>
              <Switch id="dark-mode" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold">Network Discovery</h2>
            <p className="text-muted-foreground">
              Configure automated network scanning and asset discovery
            </p>
          </div>
          <Separator />

          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-discovery">Auto Discovery</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically scan network for new devices
                </p>
              </div>
              <Switch
                id="auto-discovery"
                checked={isAutoDiscovery}
                onCheckedChange={setIsAutoDiscovery}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="scan-interval">Scan Interval (hours)</Label>
              <Input
                id="scan-interval"
                type="number"
                value={scanInterval}
                onChange={(e) => setScanInterval(parseInt(e.target.value))}
                disabled={!isAutoDiscovery}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="ip-ranges">IP Ranges to Scan</Label>
              <Textarea
                id="ip-ranges"
                defaultValue="192.168.1.0/24"
                disabled={!isAutoDiscovery}
              />
              <p className="text-sm text-muted-foreground">
                Enter IP ranges in CIDR notation, one per line
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-muted-foreground">
              Configure alerts and notification preferences
            </p>
          </div>
          <Separator />

          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send alerts and reports via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={isEmailNotifications}
                onCheckedChange={setIsEmailNotifications}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input
                id="notification-email"
                defaultValue="alerts@example.com"
                disabled={!isEmailNotifications}
              />
            </div>

            <div className="space-y-3">
              <Label>Notification Types</Label>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-device-alert" className="cursor-pointer">
                    New device discovered
                  </Label>
                  <Switch id="new-device-alert" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="license-alert" className="cursor-pointer">
                    License expiration
                  </Label>
                  <Switch id="license-alert" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="warranty-alert" className="cursor-pointer">
                    Warranty expiration
                  </Label>
                  <Switch id="warranty-alert" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compliance-alert" className="cursor-pointer">
                    License compliance issues
                  </Label>
                  <Switch id="compliance-alert" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold">Integrations</h2>
            <p className="text-muted-foreground">
              Connect with other systems and services
            </p>
          </div>
          <Separator />

          <div className="grid gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Active Directory</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to AD to import users and computers
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <Separator />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Qualys</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrate with Qualys for vulnerability data
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <Separator />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Wazuh</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to Wazuh security monitoring
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <Separator />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Trend Micro</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrate with Trend Micro security solutions
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <Separator />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SonarQube</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to SonarQube for code quality analysis
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <Separator />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">OWASP ZAP</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrate with ZAP for security analysis
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;
