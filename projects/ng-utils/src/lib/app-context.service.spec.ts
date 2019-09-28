import { TestBed } from '@angular/core/testing';
// ng-utils
import { AppContext } from './app-context.service';

describe('AppContext', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppContext = TestBed.get(AppContext);
    expect(service).toBeTruthy();
  });

  describe('isMobileDevice', () => {
    it('isMobileDevice: false', () => {
      const service: AppContext = TestBed.get(AppContext);
      expect(service.isMobileDevice()).toBeFalsy(`ouu it's a mobile device?`);
    });

    function isMobileDeviceTrue(userAgentMock: string): void {
      it(`isMobileDevice: ${userAgentMock}`, () => {
        const service: AppContext = TestBed.get(AppContext);
        spyOnProperty(navigator, 'userAgent').and.returnValue(userAgentMock);

        expect(service.isMobileDevice()).toBeTruthy(`mock of userAgent not working?`);
      });
    }
    isMobileDeviceTrue('Android 9.0');
    isMobileDeviceTrue('apples iPhone');
    isMobileDeviceTrue('apples iPad');
    isMobileDeviceTrue('BlackBerry');
    isMobileDeviceTrue('MS IEMobile');
    isMobileDeviceTrue('Opera mini');
  });

  describe('isOrientationPortrait', () => {
    it('isOrientationPortrait: false', () => {
      const service: AppContext = TestBed.get(AppContext);
      expect(service.isOrientationPortrait()).toBeFalsy(`ouu default is not landscape ?`);
    });

    function isOrientationPortraitTrue(type: OrientationType): void {
      it(`isOrientationPortrait: orientation ${type}`, () => {
        const service: AppContext = TestBed.get(AppContext);
        spyOnProperty(window.screen.orientation, 'type').and.returnValue(type);

        expect(service.isOrientationPortrait()).toBeTruthy(`mock of screen.orientation not working?`);
      });
    }
    isOrientationPortraitTrue('portrait-primary');
    isOrientationPortraitTrue('portrait-secondary');

    it('isOrientationPortrait: safari', () => {
      const service: AppContext = TestBed.get(AppContext);
      spyOnProperty(window.screen, 'orientation').and.returnValue(undefined);
      const spyMatchMedia = spyOn(window, 'matchMedia').and.returnValue({
        matches: true, media: '(orientation: portrait)',
        onchange: undefined, dispatchEvent: undefined, addEventListener: undefined,
        addListener: undefined, removeEventListener: undefined, removeListener: undefined
      });

      expect(service.isOrientationPortrait()).toBeTruthy(`ouu for safari not working ?`);
      expect(spyMatchMedia).toHaveBeenCalledWith('(orientation: portrait)');
    });
  });

  describe('getBrowserLanguage', () => {
    it('navigator undefined', () => {
      const service: AppContext = TestBed.get(AppContext);
      spyOnProperty(window, 'navigator').and.returnValue(null);
      expect(service.getBrowserLanguage()).toBeUndefined(`ouu a language without navigator ?`);
    });

    it('already ISO 639-1 in languages', () => {
      const service: AppContext = TestBed.get(AppContext);
      spyOnProperty(window.navigator, 'languages').and.returnValue(['de', 'en-US']);
      expect(service.getBrowserLanguage()).toEqual('de');
    });

    it('culture in languages with dash', () => {
      const service: AppContext = TestBed.get(AppContext);
      spyOnProperty(window.navigator, 'languages').and.returnValue(['en-US', 'de-CH']);
      expect(service.getBrowserLanguage()).toEqual('en');
    });

    it('culture in languages with underscore', () => {
      const service: AppContext = TestBed.get(AppContext);
      spyOnProperty(window.navigator, 'languages').and.returnValue(['de_CH', 'en_US']);
      expect(service.getBrowserLanguage()).toEqual('de');
    });

    it('languages not set but language', () => {
      const service: AppContext = TestBed.get(AppContext);
      spyOnProperty(window.navigator, 'languages').and.returnValue([]);
      spyOnProperty(window.navigator, 'language').and.returnValue('de-CH');
      expect(service.getBrowserLanguage()).toEqual('de');
    });

    it('nothing set', () => {
      const service: AppContext = TestBed.get(AppContext);
      spyOnProperty(window.navigator, 'languages').and.returnValue([]);
      spyOnProperty(window.navigator, 'language').and.returnValue('');
      expect(service.getBrowserLanguage()).toBeUndefined();
    });

  });
});
