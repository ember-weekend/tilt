import Ember from 'ember';
import config from 'tilt/config/environment';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  beforeModel() {
    return this.get('ajax').request(`${config.API_URL}/posts.json`, { timeout: 1000 }).then((response) => {
      const channelPromises = response.channels.map(c => {
        if (this.store.peekRecord('channel', c.id)) { return; }

        const channel = this.store.createRecord('channel');
        channel.setProperties(c);
        return channel.save().then(function(model) { return model; });
      });

      const developerPromises = response.developers.map(d => {
        if (this.store.peekRecord('developer', d.id)) { return; }

        const developer = this.store.createRecord('developer');
        developer.setProperties(d);
        return developer.save().then(function(model) { return model; });
      });

      return Ember.RSVP.hash({
        channels: Ember.RSVP.all(channelPromises),
        developers: Ember.RSVP.all(developerPromises)
      }).then(({channels, developers}) => {

        response.posts.forEach(p => {
          if (this.store.peekRecord('post', p.id)) { return; }

          const post = this.store.createRecord("post");
          let chan;
          let dev;

          post.setProperties(p)

          if (chan = channels.findBy('id', p.channel_id)) {
            post.set('channel', chan);
          }

          if (dev = developers.findBy('id', p.developer_id)) {
            post.set('developer', dev);
          }

          post.save();
        });
      });
    }).catch((err) => {
      console.log(err);
      this.get('flashMessages').info('Connectivity derailed');
    });
  }
});
