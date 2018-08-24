/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });



    /* Here the the test loops through each feed in the allFeeds objects and
    checks each feed has a url defined and is not empty.*/
    it('URLs are defined and not empy', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });

    });


    /* Here the test loops through each feed in the allFeeds object and check if
    each feed's name is defined and that name is not empty.
     */
    it('names are defined and not empy', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });

    });
  });

  describe('The menu', function() {
    const body = document.getElementsByTagName('body');
    /* Here the code checks if the menu is initially hidden.
    The menu is hidded when the class .menu-hidden is assigned to the body.*/
    it('is hidden', function() {
      expect(body[0].classList.contains('menu-hidden')).toBe(true);
    });

    // Test check of the menu's visibility changes when the menuIcon is clicked
    it('visibility changes when clicked', function() {
      const menuIcon = document.querySelector('a.menu-icon-link');
      /*The menu should be hidden initially as checked in the spec above. When menuIcon is clicked,
      the menu-hidden class should be removed to make the menu visible.*/
      menuIcon.click();
      expect(body[0].classList.contains('menu-hidden')).toBe(false);
      // When the icon is clicked again, the menu-hidden class should be added back to the body to hide the menu.
      menuIcon.click();
      expect(body[0].classList.contains('menu-hidden')).toBe(true);
    });

  });



  describe('Initial Entries', function() {
    /*This checks that once all the feeds are loaded, there is at least one .entry element within the .feed container.
     *As loadFeed() is an asynchronous fucntion, the beforeEach() and done() functions are used to make sure
     *LoadFeed() has completed before the .feed contaier is checked. This allows the .entry elements to be
     * added before the container is checked.*/
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });
    it('has at least a single .entry container within the feed container', function(done) {
      const feedContainer = document.querySelector('div.feed');
      const feedContainerContents = feedContainer.getElementsByClassName('entry');
      expect(feedContainerContents.length > 0).toBe(true);
      done();

    });

  });




  describe('New Feed Selection', function() {
    /*This check ensure when a new feed is loaded by the loadFeed() funciton, that the contents actually changes.
     *As loadFeed() is asynchronous, the beforeEach() and done() funcitons are used to make sure all the necessary feeds
     * are loaded before the feeds are checked.
     */
    let firstFeed;
    beforeEach(function(done) {
      loadFeed(0, function() {
        //stores the html for the first set of feeds
        firstFeed = document.querySelector('div.feed').innerHTML;
        loadFeed(1, function() {
          done();
        });
      });
    });

    it('is loaded. The contents changes to the new feed contents.', function(done) {
      //stores the html for the second set of feeds
      const newFeed = document.querySelector('div.feed').innerHTML;
      // checks if these two sets are the same. If they are different, it means the second set of feeds has been loaded.
      expect(firstFeed).not.toEqual(newFeed);
      done();

    });

  });


}());
