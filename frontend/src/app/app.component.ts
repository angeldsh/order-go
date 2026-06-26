import { Component, HostListener } from '@angular/core';
import { AutenticacionService } from './auth/services/autenticacion.service';
import { Router } from '@angular/router';
import { MenuService } from './services/menu.service';
import { RedirectService } from './services/redirect.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: any[] = [];
  public darkMode: boolean = false;
  
  constructor(public autenticacionService: AutenticacionService, private redirectService: RedirectService, private router: Router, private menuService: MenuService) {
    this.checkDarkMode();
  }
  
  ngOnInit(): void {
    this.menuService.appPages$.subscribe(menu => {
      this.appPages = menu;
    });
  }

  checkDarkMode() {
    // Check local storage or system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark.matches)) {
      this.darkMode = true;
      document.body.classList.add('dark');
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: any) {
    localStorage.removeItem('codigoMesa');
  }


  logout() {
    this.autenticacionService.cerrarSesion();
    localStorage.removeItem('codigoMesa');
    this.appPages = [];
    this.router.navigateByUrl('/auth/login');
  }
  isPedidoMesa(): boolean {
    return localStorage.getItem('codigoMesa') !== null;
  }
}
