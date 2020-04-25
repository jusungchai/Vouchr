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

module.exports = { updatedDOM, selectCategory, addMedia }