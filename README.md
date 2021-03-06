# googleAnalyticsPlugin
A Simple Plugin to use Google Analytics with jQuery.<br>
You **don't** need to put you tracking in the `head` anymore, just initialize the Plugin with your Tracking-ID.


## Options
| Option       | Type   | Default             | Description                                                          |
|--------------|--------|---------------------|----------------------------------------------------------------------|
| trackingCode | string | ''                  | Tracking Code of Google Analytics                                    |
| elements     | array  | []                  | Array of Objects for specialized event tracking                      |
| selector     | string | ''                  | Selector for Element to track                                        |
| category     | string | ''                  | A Category for the Event                                             |
| event        | string | ''                  | Eventname e.g. click, play, hover                                    |
| attrLabel    | string | ''                  | Attribute of Selected Element, if this does not exist just the label |
| optOutClass  | string | '.disableAnalytics' | Selector for OptOut                                                  |
| optOutCallback  | function | null | Callback called after click on optout-button                                   |

## Usage
```javascript
import jQuery from 'jquery';
import 'googleAnalytics';

jQuery(window).googleAnalytics({
            trackingCode: 'UA-XXXXXXXX-X',
            elements: [
                {
                    selector: '.accept',
                    category: 'Accept clicked',
                    event: 'click',
                    attrLabel: 'attrLabel'
                }, {
                    selector: 'ul li a.foo',
                    category: 'Nav clicked',
                    event: 'click',
                    attrLabel: 'href'
                }
            ],
            optOutClass: '.disableAnalytics',
            optOutCallback: _ => alert('Analytics disabled')
    }
);
```
