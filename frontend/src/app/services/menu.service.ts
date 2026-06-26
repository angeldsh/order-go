import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private appPagesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public appPages$ = this.appPagesSubject.asObservable();

  constructor() { }

  setMenu(menu: any[]): void {
    this.appPagesSubject.next(menu);
  }

  getMenu(): any[] {
    return this.appPagesSubject.getValue();
  }
}
