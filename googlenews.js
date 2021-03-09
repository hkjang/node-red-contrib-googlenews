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
