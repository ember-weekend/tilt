import Ember from 'ember';
import config from 'tilt/config/environment';
import postSerializer from 'tilt/utils/post-serializer-thingy';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  beforeModel() {
    return this.get('ajax').request(`${config.API_URL}/posts.json`).then((response) => {
      return postSerializer.apply(this, [response])
    }).catch((err) => {
      console.log(err);
      this.get('flashMessages').info('Connectivity derailed');
    });
  }
});
