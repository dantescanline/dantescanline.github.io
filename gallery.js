function wrapImageWithLink (theImage) {
  let wrapper = document.createElement('a')

  let url = theImage.getAttribute('src')
  wrapper.setAttribute('href', url)
  wrapper.setAttribute('target','_blank')

  theImage.parentNode.appendChild(wrapper)
  return wrapper.appendChild(theImage)
}

window.onload = function () {
  console.log('loaded')

  let images = document.querySelectorAll('.gallery img')
  images.forEach(image => wrapImageWithLink(image))
}