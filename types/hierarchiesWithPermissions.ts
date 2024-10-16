  

export interface HierarchiesWithPermission {
    hierarchyId: string;
    hierarchyName: string| null; 
    permissions: HierarchyPermissions[]; 
}
type HierarchyPermissions={
    permissionName:string;
    permissionId:number
}