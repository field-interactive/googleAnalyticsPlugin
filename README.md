# googleAnalyticsPlugin
A Simple Plugin to use Google Analytics with jQuery

## Options
| Option       | Type   | Default             | Description                                      |
|--------------|--------|---------------------|--------------------------------------------------|
| trackingCode | string | ''                  | Tracking Code of Google Analytics                |
| elements     | array  | []                  | Array of Objects for specialized event tracking  |
| optOutClass  | string | '.disableAnalytics' | Selector for OptOut                              |

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
            optOutClass: '.disableAnalytics'
    }
);
```
