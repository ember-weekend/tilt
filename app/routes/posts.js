import Ember from 'ember';
import config from 'tilt/config/environment';
import postSerializer from 'tilt/utils/post-serializer-thingy';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('post').catch(() => {
      this.get('flashMessages').info('Unable to load posts');
    });
  }
});
