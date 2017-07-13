# Add2Calendar

A simple JS library that enables you to "add to calendar" your upcoming events.

## Inspiration

This project was inspired by [OuiCal](https://github.com/carlsednaoui/add-to-calendar-buttons) add to calendar library.

## How to use it?

Call ```Add2CalendarService.getHrefFor``` with your event info, and it returns the url for it.

The only fields that are mandatory are:

  - Event title
  - Start time
  - Event duration, in minutes

## Example
```javascript
    var url = Add2CalendarService.getHrefFor(
    	CalendarTypeEnum.google, 
        {
			// Event title
          	title: 'Get on the front page of HN',

            // Event start date
            start: new Date('June 15, 2013 19:00'),

            // Event duration (IN MINUTES)
            duration: 120,

            // You can also choose to set an end time
            // If an end time is set, this will take precedence over duration
            end: new Date('June 15, 2013 23:00'),     

            // Event Address
            address: 'The internet',

            // Event Description
            description: 'Get on the front page of HN, then prepare for world domination.'      
    	});
        
   	document.querySelector('#some-link').appendChild(myCalendar).href = url;
```


## You can deploy it in three different flavours

*  CommonJS, suitable for Node and Browserify/Webpack
 	* ```npm run build```
* A self-executing function, suitable for inclusion as a \<script> tag. (If you want to create a bundle for your application, you probably want to use this, because it leads to smaller file sizes.)
	* ```npm run build:iife```
* Universal Module Definition, works as amd, cjs and iife all in one
	*  ```npm run build:umd```

## Want to try it out on your console?

Copy this on your console:


``` javascript
var add2Calendar=function(t){"use strict";function e(t,e){function n(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var n=/-|:|\.\d+/g,r=function(){function t(t){this.event=t,this.startTime=this.formatTime(t.start),this.endTime=this.calculateEndTime(t)}return Object.defineProperty(t.prototype,"href",{get:function(){},enumerable:!0,configurable:!0}),t.prototype.formatTime=function(t){return t.toISOString().replace(n,"")},t.prototype.calculateEndTime=function(t){return t.end?this.formatTime(t.end):this.formatTime(new Date(t.start.getTime()+6e4*t.duration))},t}(),o=function(t){function n(e){t.call(this,e),this.event=e}return e(n,t),Object.defineProperty(n.prototype,"href",{get:function(){return encodeURI(["https://www.google.com/calendar/render?action=TEMPLATE","&text="+(this.event.title||""),"&dates="+(this.startTime||""),"/"+(this.endTime||""),"&details="+(this.event.description||""),"&location="+(this.event.address||""),"&sprop=&sprop=name:"].join(""))},enumerable:!0,configurable:!0}),n}(r),i=function(t){function n(e){t.call(this,e),this.event=e}return e(n,t),n.prototype.getYahooEventDuration=function(){var t=this.event.end?(this.event.end.getTime()-this.event.start.getTime())/6e4:this.event.duration;return(t<600?"0"+Math.floor(t/60):Math.floor(t/60)+"")+(t%60<10?"0"+t%60:t%60+"")},n.prototype.getSt=function(){return this.formatTime(new Date(this.event.start-6e4*this.event.start.getTimezoneOffset()))||""},Object.defineProperty(n.prototype,"href",{get:function(){return encodeURI(["http://calendar.yahoo.com/?v=60&view=d&type=20","&title="+(this.event.title||""),"&st="+this.getSt(),"&dur="+(this.getYahooEventDuration()||""),"&desc="+(this.event.description||""),"&in_loc="+(this.event.address||"")].join(""))},enumerable:!0,configurable:!0}),n}(r),a=function(t){function n(e){t.call(this,e),this.event=e}return e(n,t),Object.defineProperty(n.prototype,"href",{get:function(){return encodeURI("data:text/calendar;charset=utf8,"+["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT","URL:"+this.event.documentURL,"DTSTART:"+(this.startTime||""),"DTEND:"+(this.endTime||""),"SUMMARY:"+(this.event.title||""),"DESCRIPTION:"+(this.event.description||""),"LOCATION:"+(this.event.address||""),"END:VEVENT","END:VCALENDAR"].join("\n"))},enumerable:!0,configurable:!0}),n}(r),c=function(){function t(){}return t.getFor=function(e){return t._factory[e]},t.getHrefFor=function(e,n){return new(0,t._factory[e])(n).href},t._constructor=void(t._factory=[o,i,a,a]),t}();return function(t){t[t.google=0]="google",t[t.yahoo=1]="yahoo",t[t.iCalendar=2]="iCalendar",t[t.outlook=3]="outlook"}(t.CalendarTypeEnum||(t.CalendarTypeEnum={})),t.Add2CalendarService=c,t}({});
```

And then copy:
```javascript
add2Calendar.Add2CalendarService.getHrefFor(
    	add2Calendar.CalendarTypeEnum.google,
        {
            title: 'Get on the front page of HN',
            start: new Date('June 15, 2013 19:00'),
            duration: 120,
            end: new Date('June 15, 2013 23:00'),
            address: 'The internet',
            description: 'Get on the front page of HN, then prepare for world domination.'      
    	});
```

\#winning!
