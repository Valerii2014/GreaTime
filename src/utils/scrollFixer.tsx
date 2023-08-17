const disableScroll = (window: Window, document: Document) => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
}

const enableScroll = (window: Window, document: Document) => {
    document.body.style.overflow = 'auto'
}

export { disableScroll, enableScroll }
