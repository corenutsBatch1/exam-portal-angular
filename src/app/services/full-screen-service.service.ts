import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullScreenServiceService {

  enableFullscreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }

  disableFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  exitFullscreenOnEscape(event: KeyboardEvent) {
    event.preventDefault(); // Prevents the default escape key behavior
  }

  // preventExitOnEscape(event: KeyboardEvent) {
  //   const element = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  //   if (element && event.key === 'Escape') {
  //     event.preventDefault();
  //   }
  // }
}
