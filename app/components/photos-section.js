import Ember from 'ember';
import PhotoSwipeMixin from '../mixins/photoswipe';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(PhotoSwipeMixin, ScrollToUpdateAppNavMixin, {
  appNavOption: 'Photos',
  store: Ember.inject.service(),

  init: function() {
    this._super(...arguments);

    var self = this;
    this.get('store').query('photo', { limit: this.get('limit'), offset: this.get('offset') }).then(function(photos) {
      self.set('photos', photos);
    });
  },
});
