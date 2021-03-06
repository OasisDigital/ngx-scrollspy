# Oasis Digital fork of ngx-scrollspy

This is a fork of `ngx-scrollspy`. The original project is under relatively slow
development as of early 2018.

Features added by this fork:

* Works with Universal projects; doesn't do anything during server rendering,
  therefore does not attempt to access the DOM, therefore does not cause
  Universal errors.

-----

# Original docs follow

You can use this angular2 service to spy scroll events from ```window``` or any other scrollable element.

This library implements an service to collect observables from scroll spy directives. It can be used to create you own components or if you prefer use on of the following components that leverage this library functionality to accomplish different behaviors:

* **index**: create and display and index from content inside and element.
* **affix**: make element follow scroll inside its parent.
* **parallax**: create very simple parallax effects based on scroll.
* **infinite**: infinite scroll

# Repository change

Please not that the repository and npm package changed from *ng2-scrollspy* to *ngx-scrollspy*

## Installation
First you need to install the npm module:
```sh
npm install ngx-scrollspy --save
```

If you use SystemJS to load your files, you might have to update your config with this if you don't use `defaultJSExtensions: true`:
```js
System.config({
	packages: {
		"ngx-scrollspy": {"defaultExtension": "js"}
	}
});
```

Finally, you can use ngx-scrollspy in your Angular 2 project.
It is recommended to instantiate `ScrollSpyService` in the bootstrap of your application and to never add it to the "providers" property of your components, this way you will keep it as a singleton.
If you add it to the "providers" property of a component it will instantiate a new instance of the service that won't be initialized.

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ScrollSpyModule } from 'ngx-scrollspy';

@NgModule({
  imports: [
  	BrowserModule,
  	ScrollSpyModule.forRoot()
  ],
  declarations: [ AppComponent ], 
  bootstrap: [ AppComponent ]
})
```

## Using

#### Spy window scroll

Use ```ScrollSpyDirective``` to spy on window.

```js
import { NgModule, Component, Injectable, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ScrollSpyModule, ScrollSpyService } from 'ngx-scrollspy';

@Injectable()
@Component({
	selector: 'app',
	template: `<div scrollSpy></div>`
})
export class AppComponent implements AfterViewInit {
	constructor(private scrollSpyService: ScrollSpyService) {}

	ngAfterViewInit() {
		this.scrollSpyService.getObservable('window').subscribe((e: any) => {
			console.log('ScrollSpy::window: ', e);
		});
	}
}

@NgModule({
  imports: [
  	BrowserModule,
  	ScrollSpyModule.forRoot()
  ],
  declarations: [
  	AppComponent
  ], 
  bootstrap: [ AppComponent ]
})
```

#### Spy any element scroll

Use ```ScrollSpyElementDirective``` to spy on any element. You must give an unique id to each instance.

```js
import { NgModule, Component, Injectable, AfterViewInit } from '@angular/core';
import { ScrollSpyModule, ScrollSpyService } from 'ngx-scrollspy';

@Injectable()
@Component({
	selector: 'yourComponent',
	template: `
	<div scrollSpyElement="test" style="max-height: 100px; overflow: auto;">
		<div style="height: 500px;"></div>
	</div>`
})
export class YourComponent implements AfterViewInit {

	constructor(private scrollSpyService: ScrollSpyService) {}

	ngAfterViewInit() {
		this.scrollSpyService.getObservable('test').subscribe((e: any) => {
			console.log('ScrollSpy::test: ', e);
		});
	}
}

@NgModule({
  imports: [
		ScrollSpyModule
  ],
  declarations: [
  	AppComponent
  ], 
  providers: [ ] 
})
export class YourModule { }
```

Because ```ScrollSpyService``` is a singleton, you can get any ScrollSpy observable from anywhere withing your application.

# TODO:

* Documentation/examples webpage
* Finish unit tests

## License

[MIT](LICENSE)
