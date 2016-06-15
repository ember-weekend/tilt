import Ember from 'ember';

export default Ember.Route.extend({
  page: 2,
  flashMessages: Ember.inject.service(),
  model() {
    return this.store.findAll('post');
  },
  afterModel(model) {
    return Ember.RSVP.all([model.get('developer'), model.get('channel')]);
  },
  actions: {
    showMore() {
      this.store.query('post', { page: this.get('page') }).then(() => {
	this.incrementProperty('page');
      }).catch(() => {
	this.get('flashMessages').info('Connectivity derailed');
      });
    }
  }
});
