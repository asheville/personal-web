import Ember from 'ember';
import ScrollingMixin from '../mixins/scrolling';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ScrollingMixin, ComponentTransitionsMixin, Ember.Evented, {
  tagName: 'nav',
  classNames: ['app'],
  classNameBindings: ['scrolled', 'shown'],
  appNav: Ember.inject.service(),
  store: Ember.inject.service(),
  hidden: true,

  init() {
    this._super(...arguments);

    this.get('appNav').on('show', () => {
      this.set('hidden', false);
    });

    this.get('store').findAll('attribute').then((attributes) => {
      this.set('fullName', attributes.findBy('id', 'fullName').get('value'));
      this.set('imageUrl', attributes.findBy('id', 'imageUrl').get('value'));
      this.set('url', attributes.findBy('id', 'url').get('value'));
    });
  },

  options: function() {
    return this.get('appNav.options');
  }.property('appNav.options'),

  activeOption: function() {
    return this.get('appNav.activeOption');
  }.property('appNav.activeOption'),

  onScroll() {
    this.set('scrolled', ($(document).scrollTop() > 0));
  },

  didInsertElement() {
    this.bindScrolling();
  }
});