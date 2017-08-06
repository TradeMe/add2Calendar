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
var add2Calendar=function(t){"use strict";function e(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var n=/-|:|\.\d+/g,o=function(){function t(t){this.event=t,this.startTime=this.formatTime(t.start),this.endTime=this.calculateEndTime(t)}return Object.defineProperty(t.prototype,"href",{get:function(){},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"uid",{get:function(){return(this.s4()+this.s4()+"-"+this.s4()+"-4"+this.s4().substr(0,3)+"-"+this.s4()+"-"+this.s4()+this.s4()+this.s4()).toLowerCase()},enumerable:!0,configurable:!0}),t.prototype.formatTime=function(t){return t.toISOString().replace(n,"")},t.prototype.calculateEndTime=function(t){if(t.end)return this.formatTime(t.end);if(!t.duration)throw new Error("You have to provide either the duration or end");return this.formatTime(new Date(t.start.getTime()+6e4*t.duration))},t.prototype.s4=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},t}(),r=function(t){function n(e){t.call(this,e),this.event=e}return e(n,t),Object.defineProperty(n.prototype,"href",{get:function(){return encodeURI("https://www.google.com/calendar/render?action=TEMPLATE&dates="+(this.startTime||"")+"/"+(this.endTime||"")+"&location="+(this.event.address||"")+"&sprop="+(this.event.url||""))+"&text="+encodeURIComponent(this.event.title||"")+"&details="+encodeURIComponent(this.event.description||"")},enumerable:!0,configurable:!0}),n}(o),i=function(t){function n(e){t.call(this,e),this.event=e}return e(n,t),Object.defineProperty(n.prototype,"href",{get:function(){return encodeURI("data:text/calendar;charset=utf8,"+["BEGIN:VCALENDAR","PRODID:-//Destination Search//ical4j 1.0//EN","VERSION:2.0","CALSCALE:GREGORIAN","X-MS-OLK-FORCEINSPECTOROPEN:true","METHOD:PUBLISH","BEGIN:VEVENT","URL:"+(this.event.url||""),"DTSTART:"+(this.startTime||""),"DTEND:"+(this.endTime||""),"SUMMARY:"+(this.event.title||""),"DESCRIPTION:"+(this.event.description||""),"LOCATION:"+(this.event.address||""),"SEQUENCE:0","DTSTAMP:"+this.dtStamp,"UID:"+this.uid,"END:VEVENT","END:VCALENDAR"].join("\n"))},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"dtStamp",{get:function(){return this.formatTime(new Date)},enumerable:!0,configurable:!0}),n}(o),a=function(t){function n(e){t.call(this,e),this.event=e}return e(n,t),Object.defineProperty(n.prototype,"href",{get:function(){return encodeURI("https://outlook.live.com/owa/?rru=addevent&path=%2fcalendar%2fview%2fMonth&authRedirect=true&realm=live.com&whr=live.com&CBCXT=out&fl=wld&startdt="+(this.startTime||"")+"&enddt="+(this.endTime||"")+"&uid="+this.uid)+"&subject="+encodeURIComponent(this.event.title||"")+"&body="+encodeURIComponent(this.event.description||"")},enumerable:!0,configurable:!0}),n}(o),s=function(t){function n(e){t.call(this,e),this.event=e}return e(n,t),n.prototype.getYahooEventDuration=function(){var t=this.event.end?(this.event.end.getTime()-this.event.start.getTime())/6e4:this.event.duration;return(t<600?"0"+Math.floor(t/60):""+Math.floor(t/60))+(t%60<10?"0"+t%60:""+t%60)},Object.defineProperty(n.prototype,"href",{get:function(){return encodeURI("http://calendar.yahoo.com/?v=60&view=d&type=20&st="+this.startTime+"&dur="+(this.getYahooEventDuration()||"")+"&in_loc="+(this.event.address||"")+"&url="+(this.event.url||""))+"&title="+encodeURIComponent(this.event.title||"")+"&desc="+encodeURIComponent(this.event.description||"")},enumerable:!0,configurable:!0}),n}(o),u=function(){function t(){}return t.getHrefFor=function(e,n){return new(t.getGeneratorFor(e))(n).href},t.getGeneratorFor=function(e){return t.factory[e]},t.stConstructor=void(t.factory=[r,s,i,i,a]),t}();return function(t){t[t.google=0]="google",t[t.yahoo=1]="yahoo",t[t.iCalendar=2]="iCalendar",t[t.outlook=3]="outlook",t[t.outlookLive=4]="outlookLive"}(t.CalendarTypeEnum||(t.CalendarTypeEnum={})),t.Add2CalendarService=u,t}({});
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
