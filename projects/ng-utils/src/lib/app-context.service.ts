import { Injectable } from '@angular/core';


/**
 * Service to get application/system relevant information. Such as device information, screen orientation or browser language.
 */
@Injectable({
  providedIn: 'root'
})
export class AppContext {

  /**
   * Checks if current device is a mobile device.
   * @returns True if it's a mobile device.
   */
  public isMobileDevice(): boolean {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return false;
    }
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Check if current screen orientation is portrait.
   * @returns True if orientation is portrait.
   */
  public isOrientationPortrait(): boolean {
    if (typeof window === 'undefined') {
      return undefined;
    }
    const screen = window.screen;

    if (screen && screen.orientation && screen.orientation.type) {
      return screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary';
    }

    // SAFARI: window.screen.orientation not supported in safari!
    const mql = window.matchMedia('(orientation: portrait)');
    return mql && mql.matches;
  }

  /**
   * Gets the preferred language from the browser, e.g "en".
   * @returns Language code in ISO 639-1 format.
   */
  public getBrowserLanguage(): string {
    if (!navigator) {
      return undefined;
    }
    let browserLang: string = navigator.languages && navigator.languages.length > 0 ? navigator.languages[0] : window.navigator.language;

    if (browserLang && browserLang.includes('-')) {
      browserLang = browserLang.split('-')[0];
    } else if (browserLang && browserLang.includes('_')) {
      browserLang = browserLang.split('_')[0];
    }

    return browserLang.length > 0 ? browserLang : undefined;
  }
}
