
/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')
  , meetups = require('../app/controllers/meetups')
  , auth = require('./middlewares/authorization')

/**
 * Route middlewares
 */

var meetupAuth = [auth.requiresLogin, auth.meetup.hasAuthorization]

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session)
  app.get('/users/:userId', users.show)
  app.get('/auth/twitter',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.signin)
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.authCallback)

  app.param('userId', users.user)

  // meetup routes
  app.get('/meetups', meetups.index)
  app.get('/meetups/new', auth.requiresLogin, meetups.new)
  app.post('/meetups', auth.requiresLogin, meetups.create)
  app.get('/meetups/:id', meetups.show)
  app.get('/meetups/:id/edit', meetupAuth, meetups.edit)
  app.put('/meetups/:id', meetupAuth, meetups.update)
  app.del('/meetups/:id', meetupAuth, meetups.destroy)

  app.param('id', meetups.load)

  // home route
  app.get('/', meetups.index)

  // comment routes
  var comments = require('../app/controllers/comments')
  app.post('/meetups/:id/comments', auth.requiresLogin, comments.create)

  // tag routes
  var tags = require('../app/controllers/tags')
  app.get('/tags/:tag', tags.index)

}