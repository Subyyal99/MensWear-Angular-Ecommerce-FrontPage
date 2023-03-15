import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  display: any = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 480) {
      this.display = false;
    }
    if (window.innerWidth > 480) {
      this.display = true;
    }
    console.log(this.display);
  }
  
  changingView = () => {
    this.display = !this.display;
  };
}
