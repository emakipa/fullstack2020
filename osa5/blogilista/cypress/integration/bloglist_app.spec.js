describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //create user into backend
    const user = {
      name: 'Esa Mäkipää',
      username: 'emakip',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('login',function() {
    it('login succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('emakip')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Esa Mäkipää logged in')
    })

    it('login fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('emakip')
      cy.get('#password').type('vaarasalasana')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'Esa Mäkipää logged in')
      cy.get('.error').should('contain', 'invalid username and/or password')
      //notification is shown in red
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      //notification border style is solid
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('when user is logged in', function() {
    beforeEach(function() {
      //log in user
      cy.login({ username: 'emakip', password: 'salasana' })
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      //create blog by using the form
      cy.get('#title').type('A blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://something.com')
      cy.get('#create-button').click()
      cy.get('.success').should('contain', 'a new blog A blog created by cypress by Cypress added')
      cy.contains('A blog created by cypress')
      cy.contains('Cypress')
    })

    describe('one blog exists', function () {

      beforeEach(function() {
        //create blog with zero likes
        cy.createBlog({ title: 'A blog created by cypress', author: 'Cypress', url: 'https://something.com', likes: 0 })
      })

      it('a blog can be liked', function() {
        cy.get('#view-button').click()
        cy.get('#like-button').click()
        //likes is increased by one 
        cy.contains('likes 1')
      })

      it('a blog can be removed', function() {
        cy.get('html').should('contain', 'Esa Mäkipää logged in')
        cy.contains('A blog created by cypress')
        cy.get('#view-button').click()
        cy.get('#remove-button').click()
        cy.get('.success').should('contain', 'blog A blog created by cypress removed')
        cy.get('A blog created by cypress').should('not.exist')   
      })
    })

    describe('Many blog exist', function () {

      beforeEach(function() {
        //create blogs
        //create blog0 with 0 likes
        cy.createBlog({ title: 'A blog0 with zero likes created', author: 'Author0', url: 'https://something0.com', likes: 0 })
        //create blog1 with 5 likes
        cy.createBlog({ title: 'A blog1 with most likes created', author: 'Author1', url: 'https://something1.com', likes: 5 })
        //create blog2 with 2 likes
        cy.createBlog({ title: 'A blog2 with second most likes created', author: 'Author2', url: 'https://something2.com', likes: 2 })
      })

      it('blogs are ordered according to blogs having most likes', function() {
        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0]).should('contain', 'A blog1 with most likes created')
          cy.wrap(blogs[1]).should('contain', 'A blog2 with second most likes created')
          cy.wrap(blogs[2]).should('contain', 'A blog0 with zero likes created')
        })
      })
    })  
  })
})