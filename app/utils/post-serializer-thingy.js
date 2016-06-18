import Ember from 'ember';

export default function postSerializerThingy(response) {
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
}
