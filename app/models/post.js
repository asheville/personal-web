import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  slug:           attr('string'),
  imageUrl:       attr('string'),
  title:          attr('string'),
  excerpt:        attr('string'),
  body:           attr('string'),
  createdAt:      attr('string'),
  updatedAt:      attr('string'),
  publishedAt:    attr('date')
});