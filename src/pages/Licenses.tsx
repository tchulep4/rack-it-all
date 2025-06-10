
import { useState } from "react";
import { licenses } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, Check, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Licenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [licenseKeyInput, setLicenseKeyInput] = useState("");
  const [validationResult, setValidationResult] = useState<'valid' | 'invalid' | null>(null);
  const { toast } = useToast();

  // Filter licenses based on search query
  const filteredLicenses = licenses.filter((license) => {
    return (
      searchQuery === "" ||
      license.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (license.contractNumber &&
        license.contractNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const validateLicenseKey = () => {
    if (!licenseKeyInput.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave de licença",
        variant: "destructive"
      });
      return;
    }

    // Validate license key format (simplified validation)
    const isValid = /^(TRL|STD|ENT)-[A-Z]{3}-[A-Z0-9]{6}-[A-Z0-9]{8}$/.test(licenseKeyInput.trim());
    
    setValidationResult(isValid ? 'valid' : 'invalid');
    
    toast({
      title: isValid ? "Licença Válida" : "Licença Inválida",
      description: isValid 
        ? "A chave de licença é válida e autêntica" 
        : "A chave de licença não é válida ou está malformada",
      variant: isValid ? "default" : "destructive"
    });
  };

  const getProgressColor = (usedSeats: number, totalSeats: number): string => {
    const usagePercentage = (usedSeats / totalSeats) * 100;
    if (usagePercentage >= 90) return "bg-destructive";
    if (usagePercentage >= 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getLicenseStatus = (license: typeof licenses[0]) => {
    if (!license.expirationDate) return "perpetual";
    
    const today = new Date();
    const expiryDate = new Date(license.expirationDate);
    
    if (expiryDate < today) {
      return "expired";
    }
    
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    if (expiryDate < thirtyDaysFromNow) {
      return "expiring-soon";
    }
    
    return "active";
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "perpetual":
        return (
          <Badge className="bg-blue-100 text-blue-800" variant="outline">
            Perpetual
          </Badge>
        );
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-800" variant="outline">
            Active
          </Badge>
        );
      case "expiring-soon":
        return (
          <Badge className="bg-amber-100 text-amber-800" variant="outline">
            Expiring Soon
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-800" variant="outline">
            Expired
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">License Management</h1>
          <p className="text-muted-foreground">
            Track software licenses and compliance
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add License
        </Button>
      </div>

      {/* License Key Validation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Validador de Licenças</CardTitle>
          <CardDescription>
            Insira uma chave de licença para validar sua autenticidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Ex: STD-RAC-ABC123-DEF45678"
              value={licenseKeyInput}
              onChange={(e) => setLicenseKeyInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={validateLicenseKey}>
              Validar
            </Button>
          </div>
          
          {validationResult && (
            <Alert className={`mt-4 ${validationResult === 'valid' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-center gap-2">
                {validationResult === 'valid' ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={validationResult === 'valid' ? 'text-green-800' : 'text-red-800'}>
                  {validationResult === 'valid' 
                    ? 'Licença válida - Gerada por 2lecybersec.com' 
                    : 'Licença inválida ou formato incorreto'
                  }
                </AlertDescription>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Software Licenses</CardTitle>
              <CardDescription>
                Manage your organization's software licenses
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search licenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLicenses.map((license) => {
                const usagePercentage = Math.round(
                  (license.usedSeats / license.seats) * 100
                );
                const status = getLicenseStatus(license);
                
                return (
                  <TableRow key={license.id}>
                    <TableCell className="font-medium">{license.name}</TableCell>
                    <TableCell>{license.publisher}</TableCell>
                    <TableCell>{renderStatusBadge(status)}</TableCell>
                    <TableCell>
                      {license.expirationDate
                        ? new Date(license.expirationDate).toLocaleDateString()
                        : "Never"}
                    </TableCell>
                    <TableCell>
                      {license.usedSeats} / {license.seats}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={usagePercentage}
                          className={`h-2 w-[80px] ${getProgressColor(
                            license.usedSeats,
                            license.seats
                          )}`}
                        />
                        <span className="text-xs">{usagePercentage}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredLicenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No licenses found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Licenses;
