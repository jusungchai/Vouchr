import { updatedDOM, selectCategory, addMedia, deleteMedia } from '../support/helpers'

describe("Demo E2E", () => {
  //time to wait (change this value depending on DUT spec)
  const waitTime = 3000;

  it("Should visit root page", () => {
    cy.visit("/")
  })

  it("Should wait for iframe to load and click the egreetings banner", () => {
    updatedDOM('iframe[title=PersonalizationCarousel]', waitTime)
      .find('.App_content__3La4L')
      .first('.PersonalizationCarousel_CellContent__3srcj > .PersonalizationCarousel_CellContent__3srcj').click()
  })

  it("Should select Birthday Category template", () => {
    selectCategory('Big Birthday')
  })

  it("Should add Note", () => {
    addMedia('Note')

    //Type birthday message
    updatedDOM('iframe[title=DiscoverApp]')
      .type('Happy Birthday Suresh and Vishwa!')
      .contains('DONE').click()
  })

  it("Should add Youtube", () => {
    addMedia('YouTube')

    //Search for video
    updatedDOM('iframe[title=DiscoverApp]')
      .type("Happy Birthday")
      .contains('Search').click()

    //Add first video
    updatedDOM('iframe[title=DiscoverApp]')
      .find('.Youtube-module_SearchResults__jDFiK > button')
      .eq(0).click()
  })

  it("Should add Gif", () => {
    addMedia('Gif')

    //Click on input field (disabled at default) and search
    updatedDOM('iframe[title=DiscoverApp]')
      .find('input', '.leading-normal GifEditor-module_input__1MK3l').click()
      .focus()
      .type('Interview')

    //Add first gif
    updatedDOM('iframe[title=DiscoverApp]')
      .find('.ResultsPage-module_column__3zcIx > img')
      .eq(0).click()

    updatedDOM('iframe[title=DiscoverApp]')
      .contains('ADD TO GIFT').click()
  })

  it("Should remove Gif", () => {
    deleteMedia(10)
  })

  it("Should preview egreetings", () => {
    updatedDOM('iframe[title=DiscoverApp]')
      .contains('Tools').click()
    updatedDOM('iframe[title=DiscoverApp]')
      .contains('Preview').click()
  })

  it("Should submit egreetings", () => {
    updatedDOM('iframe[title=DiscoverApp]')
      .contains('Next').click({ force: true })
    updatedDOM('iframe[title=DiscoverApp]')
      .contains('Continue').click()
  })

  it("Should show that egreetings is added", () => {
    updatedDOM('iframe[title=PersonalizationCarousel]', waitTime)
      .contains('Your Gift is Ready!')
  })

  it("Should submit the money transfer", () => {
    cy.get('.my-4').contains('Send').click({ force: true })
  })

  it("Should show and goto gift link", () => {
    cy.get('.card-link').contains('Gift Link').should('have.attr', 'href')
      .then(link => {
        cy.visit(link)
      })
  })

  it("Should open egreetings", () => {
    cy.contains('OPEN NOW').click()
  })

  it("Should validate that note and youtube are added", () => {
    cy.contains('Happy Birthday Suresh and Vishwa!')
    cy.get('.VideoPlayer-module_VideoPlayerContainer__3PEPY')
  })
});