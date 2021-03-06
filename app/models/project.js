import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Model from 'ember-data/model';

export default Model.extend({
  categories: hasMany('category'),
  description: attr('string'),
  featured: attr('string'),
  name: attr('string'),
  shortName: attr('string'),
  url: attr('string')
});
