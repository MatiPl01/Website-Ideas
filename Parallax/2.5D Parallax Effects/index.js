const document_element = document.documentElement
document_element.addEventListener('mousemove', e => {
    document_element.style.setProperty('--x', `${e.clientX}px`)
})