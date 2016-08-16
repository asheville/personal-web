import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    if ($.isNumeric(params.post_id)) {
      return this.store.findRecord('post', params.post_id);
    } else {
      return this.store.query('post', { filter: { slug: params.post_id } });
    }
  },

  afterModel(model) {
    if (model.query && model.query.filter && model.get('firstObject')) {
      model = model.get('firstObject');
    }

    if (model && window.location.pathname !== model.get('slug')) {
      this.replaceWith('post', model.get('slug'));
    }
  },

  setupController(controller, model) {
    var self = this;

    if (!model) {
      return;
    }

    if (model.query && model.query.filter && model.get('firstObject')) {
      controller.set('post', model.get('firstObject'));
    } else if (model.get('id')) {
      controller.set('post', model);
    }

    if (controller.get('post.slug')) {
      this.set('headData.canonicalUrl', window.location.origin + this.router.generate('post', model.get('slug')));
    }

    this.set('id', this.paramsFor('post').post_id);
    this.set('titleToken', this.get('post.title'));
    this.set('headData.type', 'article');
    this.set('headData.imageUrl', this.get('post.imageUrl'));
    this.set('headData.description', this.get('post.excerpt'));
    this.set('headData.articlePublishedTime', this.get('post.publishedAt'));
    this.set('headData.articleModifiedTime', this.get('post.updatedAt'));
    this.set('headData.articleAuthor', this.get('post.author'));

    Ember.run.next(function() {
      self.set('headData.url', window.location.href);
    });
  },

  actions: {
    error(error, transition) {
      if (error) {
        console.error(error);
        this.intermediateTransitionTo('not-found', error);
      }
    }
  }
});