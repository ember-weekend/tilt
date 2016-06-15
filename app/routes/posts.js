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
      this.store.query('post', { page: this.get('page') }).then((model) => {
	hasItems(model) ?  this.incrementProperty('page') : this.get('flashMessages').info('There are no more items');
      }).catch(() => {
	this.get('flashMessages').info('Connectivity derailed');
      });
    }
  }
});

function hasItems(model) {
  return model.get('length') > 0;
}
