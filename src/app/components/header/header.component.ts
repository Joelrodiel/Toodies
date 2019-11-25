import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  navbarOpen = false;
  offline: boolean;

  onNetworkStatusChange() {
      this.offline = !navigator.onLine;
      if (this.offline) {
          console.log("Oh shit we offline.");
      }
  }

  ngOnInit() {
      window.addEventListener('online', this.onNetworkStatusChange.bind(this));
      window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }

  toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
  }

}
