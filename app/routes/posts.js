import Ember from 'ember';

export default Ember.Route.extend({
  page: 2,
  ajax: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  model() {
    return this.store.findAll('post').catch(() => {
      this.get('flashMessages').info('Unable to load posts');
    });
  },
  actions: {
    showMore(controller) {
      return this.get('ajax').request('/posts', {
        data: { page: this.get('page') },
        timeout: 1000
      }).then((response) => {
        const channelPromises = response.channels.map(c => {
          if (this.store.peekRecord('channel', c.id)) { return; }

          const channel = this.store.createRecord('channel');
          channel.setProperties(c);
          return channel.save();
        }).filter(function(item) { return typeof item !== 'undefined' });

        const developerPromises = response.developers.map(d => {
          if (this.store.peekRecord('developer', d.id)) { return; }

          const developer = this.store.createRecord('developer');
          developer.setProperties(d);
          return developer.save();
        }).filter(function(item) { return typeof item !== 'undefined' });

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

            this.incrementProperty('page');
            post.save();
          });
        });
      }).catch((err) => {
        this.get('flashMessages').info('Could not load more posts');
      });
    }
  }
});
