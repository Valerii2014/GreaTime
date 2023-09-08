import './catalogPagesPanel.scss'

import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import { useAppSelector } from '../../store'
import { setProductsOffset } from '../../store/appSlice/productsSlice'

const CatalogPagesPanel = () => {
    const dispatch = useDispatch()
    const { products, quantityProductsOnPage, productsOffset, sortType } =
        useAppSelector((state) => state.products)
    const productsQuantity = products.length - 1
    const pagesQuantity = Math.ceil(productsQuantity / quantityProductsOnPage)

    const [pagesVisibleOffset, setPagesVisibleOffset] = useState(0)

    useEffect(() => {
        setPagesVisibleOffset(0)
    }, [quantityProductsOnPage, sortType])

    const plusVisibleOffset = () => {
        if (pagesVisibleOffset > pagesQuantity - 6) return
        setPagesVisibleOffset((pagesVisibleOffset) => pagesVisibleOffset + 1)
    }
    const minusVisibleOffset = () => {
        if (pagesVisibleOffset - 1 < 0) return
        setPagesVisibleOffset((pagesVisibleOffset) => pagesVisibleOffset - 1)
    }

    const activePageVisibleSaver = (newProductsOffset: number) => {
        if (newProductsOffset > productsQuantity || newProductsOffset < 0)
            return
        if (pagesVisibleOffset > newProductsOffset / quantityProductsOnPage)
            setPagesVisibleOffset(newProductsOffset / quantityProductsOnPage)
        if (newProductsOffset / quantityProductsOnPage > pagesVisibleOffset + 4)
            setPagesVisibleOffset(
                newProductsOffset / quantityProductsOnPage - 4
            )
    }

    const prevPage = () => {
        const newProductsOffset = productsOffset - quantityProductsOnPage
        dispatch(setProductsOffset(newProductsOffset))
        activePageVisibleSaver(newProductsOffset)
    }
    const nextPage = () => {
        const newProductsOffset = productsOffset + quantityProductsOnPage
        dispatch(setProductsOffset(newProductsOffset))
        activePageVisibleSaver(newProductsOffset)
    }
    const setPage = (pageNumber: number) => {
        dispatch(setProductsOffset(pageNumber * quantityProductsOnPage))
    }

    const buildPagesItem = () => {
        let skippedPages = 0
        const pagesItem = []
        while (pagesQuantity > pagesItem.length + skippedPages) {
            const activeClass =
                productsOffset / quantityProductsOnPage ===
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
        productsOffset + quantityProductsOnPage > productsQuantity
            ? productsQuantity
            : productsOffset + quantityProductsOnPage
    const pagesDescr =
        products.length > 0
            ? `Показано с ${productsOffset} по ${showFromTo} из ${productsQuantity} (всего ${pagesQuantity} страниц)`
            : ''

    const pagesItem = products.length > 0 ? buildPagesItem() : null

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
