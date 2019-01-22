const PubSub = {
  publish: function (channel, payload) {
    console.log(`successfully published on ${channel} with payload ${payload}`);
    const event = new CustomEvent(channel, {
      detail: payload
    });
    document.dispatchEvent(event);
  },

  subscribe: function (channel, callback) {
    console.log(`successfully subscribed on ${channel}`);
    document.addEventListener(channel, callback);
  }
};

module.exports = PubSub;
