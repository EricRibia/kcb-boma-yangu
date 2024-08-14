import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WindowSizeDirective} from "../directives/window-size.directive";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WindowSizeDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'boma-yangu';
}
