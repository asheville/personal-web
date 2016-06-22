import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, {
  appNavOption: 'Intro',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var self = this;

    Ember.RSVP.hash({
      attributes: this.get('store').findAll('attribute'),
      checkins: this.get('store').findAll('checkin'),
      geolocations: this.get('store').findAll('geolocation'),
      updates: this.get('store').findAll('update'),
      weatherExperiences: this.get('store').findAll('weatherExperience')
    }).then(function(model) {
      self.set('coverImageUrl', model.attributes.findBy('id', 'coverImageUrl').get('value'));
      self.set('fullName', model.attributes.findBy('id', 'fullName').get('value'));
      self.set('profession', model.attributes.findBy('id', 'profession').get('value'));
      self.set('homeLocation', model.attributes.findBy('id', 'homeLocation').get('value'));

      self.set('lastCheckin', model.checkins.objectAt(0));
      self.set('lastGeolocation', model.geolocations.objectAt(0));
      self.set('lastUpdate', model.updates.objectAt(0));
      self.set('lastWeatherExperience', model.weatherExperiences.objectAt(0));
    });
  }
});