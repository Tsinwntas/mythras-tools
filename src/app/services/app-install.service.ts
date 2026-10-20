import { Injectable, NgZone, isDevMode } from '@angular/core';

interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{outcome:'accepted'|'dismissed'}>;
}

@Injectable({providedIn:'root'})
export class AppInstallService {
  private promptEvent?: InstallPrompt;
  private registration?: ServiceWorkerRegistration;
  installed = window.matchMedia('(display-mode: standalone)').matches || !!(navigator as Navigator & {standalone?:boolean}).standalone;
  readonly isAppleMobile = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  offlineReady = false;
  updateAvailable = false;
  message = '';

  constructor(private zone: NgZone) {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.zone.run(() => this.promptEvent=event as InstallPrompt);
    });
    window.addEventListener('appinstalled', () => this.zone.run(() => { this.installed=true; this.promptEvent=undefined; this.message='App installed. Open Mythras Tools from your home screen.'; }));
    if ('serviceWorker' in navigator && !isDevMode() && window.isSecureContext) {
      // Keep service-worker bookkeeping out of Angular's change detection loop.
      this.zone.runOutsideAngular(() => {
        if (document.readyState === 'complete') void this.register();
        else window.addEventListener('load', () => void this.register(), {once:true});
      });
    }
  }

  get canPrompt(): boolean { return !!this.promptEvent && !this.installed; }

  async install(): Promise<void> {
    const prompt=this.promptEvent;
    if (!prompt) return;
    this.promptEvent=undefined;
    try {
      await prompt.prompt();
      const choice=await prompt.userChoice;
      this.message=choice.outcome==='accepted' ? 'Installation requested. Look for Mythras Tools on your home screen.' : 'Installation dismissed. You can still use the browser or install from its menu.';
      if (choice.outcome==='accepted' && navigator.storage?.persist) void navigator.storage.persist().catch(() => false);
    } catch { this.message='Use your browser menu to install or add Mythras Tools to your home screen.'; }
  }

  private async register(): Promise<void> {
    try {
      const base=new URL('.', document.baseURI);
      this.registration=await navigator.serviceWorker.register(new URL('sw.js',base), {scope:base.pathname,updateViaCache:'none'});
      const check=() => this.zone.run(() => {
        this.offlineReady=!!this.registration?.active;
        this.updateAvailable=!!this.registration?.waiting && !!navigator.serviceWorker.controller;
      });
      const watch=() => {
        const worker=this.registration?.installing;
        worker?.addEventListener('statechange', check);
        check();
      };
      this.registration.addEventListener('updatefound', watch);
      navigator.serviceWorker.addEventListener('controllerchange', check);
      watch();
      await navigator.serviceWorker.ready;
      check();
    } catch { this.zone.run(() => this.message='Offline files could not be prepared. You can keep using Mythras Tools online.'); }
  }

  applyUpdate(): void {
    const waiting=this.registration?.waiting;
    if (!waiting) return;
    // Existing editors flush on pagehide. Activation happens only on this explicit action.
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), {once:true});
    waiting.postMessage({type:'ACTIVATE_UPDATE'});
  }
}
