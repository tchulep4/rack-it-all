
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LicenseGenerator from '@/components/admin/LicenseGenerator';

const Admin = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <LicenseGenerator />
    </ProtectedRoute>
  );
};

export default Admin;
