import { updatedDOM, selectCategory, addMedia } from '../support/helpers'

describe("Demo E2E", () => {
  //time to wait (change this value depending on DUT spec)
  const waitTime = 3000;

  it("Should select template from Birthday category -> Add Note > Add Youtube > Add Interview (search on tenor) GIF > Remove GIF > Preview > Send", () => {
    //visit root page
    cy.visit("/")

    //wait 3s for page to fully render (this value is bigger)
    //find the carousel and click to render egreeting
    updatedDOM('iframe[title=PersonalizationCarousel]', waitTime)
      .find('.App_content__3La4L')
      .first('.PersonalizationCarousel_CellContent__3srcj > .PersonalizationCarousel_CellContent__3srcj').click()

    selectCategory('Big Birthday')

    addMedia('Note')

    //Type birthday message
    updatedDOM('iframe[title=DiscoverApp]')
      .type('Happy Birthday Suresh and Vishwa!')
      .contains('DONE').click()

    addMedia('YouTube')

    //Search for video
    updatedDOM('iframe[title=DiscoverApp]')
      .type("Happy Birthday")
      .contains('Search').click()

    //Add first video
    updatedDOM('iframe[title=DiscoverApp]')
      .find('.Youtube-module_SearchResults__jDFiK > button')
      .eq(0).click()

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

    //Add selected gif to gift
    updatedDOM('iframe[title=DiscoverApp]')
      .contains('ADD TO GIFT').click()

    //Remove added gif
    updatedDOM('iframe[title=DiscoverApp]')
      .find('#vouchrAppRoot > div > div:nth-child(1) > div.App_content__3La4L > div.Preview_PreviewContainer__39hcn > div > div.Preview_ContentContainer__BjrSF > div:nth-child(10) > div > div.Media_Controls__1zHMA.flex.justify-between.w-full.absolute > div.Media_ControlsRight__3yZfs > button').click()

    //Tools > Preview > Next > Continue
    updatedDOM('iframe[title=DiscoverApp]')
      .contains('Tools').click()
    updatedDOM('iframe[title=DiscoverApp]')
      .contains('Preview').click()
    updatedDOM('iframe[title=DiscoverApp]')
      .contains('Next').click({ force: true })
    updatedDOM('iframe[title=DiscoverApp]')
      .contains('Continue').click()

    updatedDOM('iframe[title=PersonalizationCarousel]', waitTime)
      .contains('Your Gift is Ready!')

    cy.get('.my-4').contains('Send').click({ force: true })

    cy.get('.card-link').contains('Gift Link').should('have.attr', 'href')
      .then(link => {
        cy.visit(link)
        cy.contains('OPEN NOW').click()
        cy.contains('Happy Birthday Suresh and Vishwa!')
        cy.get('.VideoPlayer-module_VideoPlayerContainer__3PEPY')
      })
  });
});