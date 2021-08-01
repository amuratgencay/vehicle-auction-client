import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionProvider } from '../abstract/permission-provider';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessCheckerService {

  constructor(private permissionProvider: PermissionProvider) { }
  /**
   * Checks whether access is granted or not
   *
   * @param {string} permission
   * @param {string} resource
   * @returns {Observable<boolean>}
   */
  isGranted(perm: string): Observable<boolean> {
    return this.permissionProvider.getPermissions()
      .pipe(
        map((permission: string | string[]) => Array.isArray(permission) ? permission : [permission]),
        map((permissions: string[]) => {
          return permissions.some(permission => permission === perm) || perm === '*';
        }),
      );
  }
}
