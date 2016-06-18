import Ember from 'ember';
import config from 'tilt/config/environment';
import postSerializer from 'tilt/utils/post-serializer-thingy';

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
      return this.get('ajax').request(`${config.API_URL}/posts.json`, {
        data: { page: this.get('page') }
      }).then((response) => {
        return postSerializer.apply(this, [response])
      }).catch((err) => {
        this.get('flashMessages').info('Could not load more posts');
      });
    }
  }
});
