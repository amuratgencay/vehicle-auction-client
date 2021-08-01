import { Observable } from 'rxjs';

export abstract class PermissionProvider {
     /**
   * Returns current user role
   * @returns {Observable<string | string[]>}
   */
  abstract getPermissions(): Observable<string|string[]>;
}
