googlenews NodeRED Node
=====================

Installing with npm
-------

`npm install node-red-contrib-googlenews`

Adding nodes to the palette
-------
Using the Editor
You can install nodes directly within the editor by selecting the Manage Palette option from the main menu to open the Palette Manager.

The ‘Nodes’ tab lists all of the modules you have installed. It shows which you are using and whether updates are available for any of them.

The ‘Install’ tab lets you search the catalogue of available node modules and install them.

<a href="https://www.buymeacoffee.com/gagagiga" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

Example
------
- serve google news to json

## Parameters
Method (defaults to TOP_NEWS or HIGHLIGHTS)

Query (this is ignored when method is TOP_NEWS or HIGHLIGHTS)

### Locale (defaults to en-GB)

### Methods
HIGHLIGHTS, TOP_NEWS, LOCATION, SEARCH, TOPIC, GEO

### Supported TOPICS
TOPICS_WORLD, TOPICS_NATION, TOPICS_BUSINESS, TOPICS_TECHNOLOGY, TOPICS_ENTERTAINMENT, TOPICS_SCIENCE, TOPICS_SPORTS, TOPICS_HEALTH

```javascript
// msg = {};
// msg.api = 'search' // HIGHLIGHTS, TOP_NEWS, LOCATION, SEARCH, TOPIC, GEO
// msg.keyword = '삼성전자'
// msg.locale = 'ko-KR'
return msg;
```


JS Code for Node-RED
------
```js
var googleNewsAPI = require("google-news-json");
module.exports = function (RED) {
    function googlenews(config) {
        RED.nodes.createNode(this, config);
        var self = this;
        this.keyword = config.keyword || "";
        this.locale = config.locale || "";
        this.api = config.api || "";
        this.on('input', function(msg) {
            var keyword = self.keyword || msg.keyword;
            var locale = self.locale || msg.locale;
            var api = self.api || msg.api;
            googleNewsAPI.getNews(googleNewsAPI[api.toUpperCase()], keyword, locale, (err, response) => {
                msg.payload = response;
                self.send(msg);
            });
        });
    }
    RED.nodes.registerType('googlenews', googlenews);
};

```

Sample Flow
------
```json
[
  {
    "id": "3f30af8e.a3db8",
    "type": "inject",
    "z": "639cfd7b.3072d4",
    "name": "",
    "props": [
      {
        "p": "payload"
      },
      {
        "p": "topic",
        "vt": "str"
      }
    ],
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 180,
    "y": 60,
    "wires": [
      [
        "dd30f997.d9aa88"
      ]
    ]
  },
  {
    "id": "e8ad654f.9dcb78",
    "type": "googlenews",
    "z": "639cfd7b.3072d4",
    "api": "search",
    "keyword": "2021-02-08 삼성전자",
    "locale": "ko-KR",
    "name": "google news",
    "x": 550,
    "y": 60,
    "wires": [
      [
        "c4fbe9cf.56fb18"
      ]
    ]
  },
  {
    "id": "dd30f997.d9aa88",
    "type": "function",
    "z": "639cfd7b.3072d4",
    "name": "",
    "func": "// msg = {};\n// msg.api = 'search';\n// msg.keyword = '삼성전자';\n// msg.locale = 'ko-KR';\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "x": 360,
    "y": 60,
    "wires": [
      [
        "e8ad654f.9dcb78"
      ]
    ]
  },
  {
    "id": "c4fbe9cf.56fb18",
    "type": "debug",
    "z": "639cfd7b.3072d4",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "statusVal": "",
    "statusType": "auto",
    "x": 730,
    "y": 60,
    "wires": []
  }
]

```
