import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  body: attr(),
  title: attr(),
  slug: attr(),
  likes: attr('number'),
  created_at: attr(),
  updated_at: attr(),
  published_at: attr(),
  developer: belongsTo('developer'),
});
