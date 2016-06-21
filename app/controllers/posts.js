import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
  pagedContent: pagedArray('model', {perPage: 5, infinite: 'unpaged'}),
  actions: {
    showMore() {
      this.get('pagedContent').loadNextPage();
    }
  }
});
