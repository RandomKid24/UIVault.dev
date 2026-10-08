import * as React from 'react';
import { PermissionMatrix, type Grants } from '@/components/ui/permission-matrix';

const roles = [
  { id: 'owner', label: 'Owner', hint: 'Always full access' },
  { id: 'admin', label: 'Admin' },
  { id: 'manager', label: 'Manager' },
  { id: 'viewer', label: 'Viewer' },
];
const permissions = [
  { id: 'view', label: 'View' },
  { id: 'create', label: 'Create' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
  { id: 'export', label: 'Export' },
];

export default function PermissionMatrixDemo() {
  const [grants, setGrants] = React.useState<Grants>({
    owner: ['view', 'create', 'edit', 'delete', 'export'],
    admin: ['view', 'create', 'edit', 'delete'],
    manager: ['view', 'create', 'edit'],
    viewer: ['view'],
  });
  return <PermissionMatrix className="w-full max-w-2xl" roles={roles} permissions={permissions} value={grants} onChange={setGrants} locked={['owner']} />;
}
