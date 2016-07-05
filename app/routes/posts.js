import Ember from 'ember';
import config from 'tilt/config/environment';
import postSerializer from 'tilt/utils/post-serializer-thingy';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('post').then((models)=>{
      return models.sortBy('created_at:desc');
    }).catch(() => {
      this.get('flashMessages').info('Unable to load posts');
    });
  }
});
