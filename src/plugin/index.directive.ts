import {
  Directive,
  Injectable,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  OnDestroy
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { ScrollSpyIndexService } from './index.service';

export interface ScrollSpyIndexOptions {
  id?: string;
  selector?: string;
}

@Injectable()
@Directive({
  selector: '[scrollSpyIndex]'
})
export class ScrollSpyIndexDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input('scrollSpyIndex') public options: ScrollSpyIndexOptions;

  public defaultOptions: ScrollSpyIndexOptions = {
    selector: 'anchor'
  };

  public el: HTMLElement;

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private scrollSpyIndex: ScrollSpyIndexService
  ) {
    this.el = elRef.nativeElement;
  }

  ngOnInit() {
    if (!this.options) {
      this.options = {};
    }

    if (!this.options.id) {
      return console.warn('ScrollSpyIndex: Missing id.');
    }

    this.options = Object.assign(this.defaultOptions, this.options);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollSpyIndex.setIndex(this.options.id, this.el.getElementsByClassName(this.options.selector));
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollSpyIndex.deleteIndex(this.options.id);
    }
  }
}
