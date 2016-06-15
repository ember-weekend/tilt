import Ember from 'ember';

export default Ember.Route.extend({
  page: 1,
  flashMessages: Ember.inject.service(),
  model() {
    return this.store.findAll('post');
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
