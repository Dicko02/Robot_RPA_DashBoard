import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyDisplayComponent } from './body/body-display/body-display.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    BodyDisplayComponent,
    NavbarComponent,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
