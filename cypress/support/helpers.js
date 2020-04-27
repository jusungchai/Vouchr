//Return the desired iframe and allow chaining methods
const getIframe = (frameInfo) => {
  return (
    cy.get(frameInfo).its('0.contentDocument.body').should('not.be.empty')
      .then(cy.wrap)
  )
}

//Wait desired time (default 1s: varies on DUT's specification)
const wait = (time) => {
  cy.wait(time || 1000)
}

//Wait desired time (default 1s: varies on DUT's specification) and return the desired iframe
const updatedDOM = (frame, time) => {
  wait(time)
  return getIframe(frame)
}

const selectCategory = (category) => {
  const buttons = [
    category,
    'Dismiss'
  ]

  buttons.forEach(button => {
    updatedDOM('iframe[title=DiscoverApp]', 1000)
      .contains(button).click()
  })
}

const addMedia = (name) => {
  const steps = [
    'Tools',
    'Add Media',
    name
  ]

  steps.forEach(step => {
    updatedDOM('iframe[title=DiscoverApp]', 1000)
      .contains(step).click()
  })
}

const deleteMedia = (index) => {
  updatedDOM('iframe[title=DiscoverApp]', 1000)
    .find(`#vouchrAppRoot > div > div:nth-child(1) > div.App_content__3La4L > 
      div.Preview_PreviewContainer__39hcn > div > div.Preview_ContentContainer__BjrSF > 
      div:nth-child(${index}) > div > div > 
      div.Media_ControlsRight__3yZfs > button`).click()
}

module.exports = { updatedDOM, selectCategory, addMedia, deleteMedia }