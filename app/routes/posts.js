import Ember from 'ember';

export default Ember.Route.extend({
  page: 1,
  model() {
    return this.store.findAll('post');
  },
  setupController(controller, model) {
    controller.setProperties({
      model: model,
      posts: model
    })
  },
  actions: {
    showMore() {
      const page = this.incrementProperty('page');
      this.store.query('post', { page });
    }
  }
});
