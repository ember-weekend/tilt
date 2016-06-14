import Ember from 'ember';

export default Ember.Controller.extend({
  page: 1,
  queryParams: ['page'],
  nextPage: Ember.computed('page', function() {
    return this.get('page') + 1;
  }),
  previousPage: Ember.computed('page', function() {
    return this.get('page') - 1;
  })
});
