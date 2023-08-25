import './catalogPagesPanel.scss'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store'
import { setPositionsOffset } from '../../store/appSlice/positionsSlice'
import { useState, useEffect } from 'react'

const CatalogPagesPanel = () => {
    const dispatch = useDispatch()
    const { positions, quantityPositionsOnPage, positionsOffset, sortType } =
        useAppSelector((state) => state.positions)
    const positionsQuantity = positions.length - 1
    const pagesQuantity = Math.ceil(positionsQuantity / quantityPositionsOnPage)

    const [pagesVisibleOffset, setPagesVisibleOffset] = useState(0)

    useEffect(() => {
        setPagesVisibleOffset(0)
    }, [quantityPositionsOnPage, sortType])

    const plusVisibleOffset = () => {
        if (pagesVisibleOffset > pagesQuantity - 6) return
        setPagesVisibleOffset((pagesVisibleOffset) => pagesVisibleOffset + 1)
    }
    const minusVisibleOffset = () => {
        if (pagesVisibleOffset - 1 < 0) return
        setPagesVisibleOffset((pagesVisibleOffset) => pagesVisibleOffset - 1)
    }

    const activePageVisibleSaver = (newPositionsOffset: number) => {
        if (newPositionsOffset > positionsQuantity || newPositionsOffset < 0)
            return
        if (pagesVisibleOffset > newPositionsOffset / quantityPositionsOnPage)
            setPagesVisibleOffset(newPositionsOffset / quantityPositionsOnPage)
        if (
            newPositionsOffset / quantityPositionsOnPage >
            pagesVisibleOffset + 4
        )
            setPagesVisibleOffset(
                newPositionsOffset / quantityPositionsOnPage - 4
            )
    }

    const prevPage = () => {
        const newPositionsOffset = positionsOffset - quantityPositionsOnPage
        dispatch(setPositionsOffset(newPositionsOffset))
        activePageVisibleSaver(newPositionsOffset)
    }
    const nextPage = () => {
        const newPositionsOffset = positionsOffset + quantityPositionsOnPage
        dispatch(setPositionsOffset(newPositionsOffset))
        activePageVisibleSaver(newPositionsOffset)
    }
    const setPage = (pageNumber: number) => {
        dispatch(setPositionsOffset(pageNumber * quantityPositionsOnPage))
    }

    const buildPagesItem = () => {
        let skippedPages = 0
        const pagesItem = []
        while (pagesQuantity > pagesItem.length + skippedPages) {
            const activeClass =
                positionsOffset / quantityPositionsOnPage ===
                pagesItem.length + skippedPages
                    ? 'pages-panel_functions_navigation_pages_item_active'
                    : ''
            const pageNumber = pagesItem.length + 1 + skippedPages
            if (skippedPages === pagesVisibleOffset && pagesItem.length < 5) {
                pagesItem.push(
                    <div
                        className={`pages-panel_functions_navigation_pages_item ${activeClass}`}
                        key={pageNumber}
                        onClick={() => setPage(pageNumber - 1)}
                    >
                        {pageNumber}
                    </div>
                )
            } else skippedPages++
        }
        return pagesItem
    }

    const showFromTo =
        positionsOffset + quantityPositionsOnPage > positionsQuantity
            ? positionsQuantity
            : positionsOffset + quantityPositionsOnPage
    const pagesDescr =
        positions.length > 0
            ? `Показано с ${positionsOffset} по ${showFromTo} из ${positionsQuantity} (всего ${pagesQuantity} страниц)`
            : ''

    const pagesItem = positions.length > 0 ? buildPagesItem() : null

    return (
        <div className="pages-panel">
            <div className="pages-panel_functions">
                <div className="pages-panel_functions_navigation pages-panel_functions_navigation_left">
                    <img
                        src="./icons/system/pagesArrow.svg"
                        alt="to start"
                        onClick={minusVisibleOffset}
                    />
                    <img
                        src="./icons/system/pagesArrowDouble.svg"
                        alt="prev page"
                        onClick={prevPage}
                    />
                </div>
                <div className="pages-panel_functions_navigation_pages">
                    {pagesItem}
                </div>
                <div className="pages-panel_functions_navigation pages-panel_functions_navigation_right">
                    <img
                        src="./icons/system/pagesArrow.svg"
                        alt="to start"
                        onClick={plusVisibleOffset}
                    />
                    <img
                        src="./icons/system/pagesArrowDouble.svg"
                        alt="next page"
                        onClick={nextPage}
                    />
                </div>
            </div>
            <div className="pages-panel_descr">{pagesDescr}</div>
        </div>
    )
}

export default CatalogPagesPanel
