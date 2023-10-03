const createTouchHandler = (
    touchStartRef: React.MutableRefObject<number | null>,
    onChangeSlide: (move: 'prev' | 'next') => void
) => {
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = e.touches[0].pageX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartRef.current === null) return

        const deltaX = e.changedTouches[0].pageX - touchStartRef.current

        if (deltaX > 50) {
            onChangeSlide('prev')
        } else if (deltaX < -50) {
            onChangeSlide('next')
        }

        touchStartRef.current = null
    }
    return { handleTouchStart, handleTouchMove }
}

export default createTouchHandler
