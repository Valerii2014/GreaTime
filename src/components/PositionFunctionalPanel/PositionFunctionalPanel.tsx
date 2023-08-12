import './positionFunctionalPanel.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { useState } from 'react'
import {
    setQuantityPositionsOnPage,
    setPositionsSortType,
    SortTypeLiteral,
    setPositionsType,
    FilterType,
    QuantityType,
} from '../../store/appSlice/positionsSlice'

const _filterTypesData: FilterType[] = [
    {
        descr: 'Цена (низкая > высокая)',
        type: 'less-more_price',
    },
    {
        descr: 'Цена (высокая > низкая)',
        type: 'more-less_price',
    },
    {
        descr: 'Популярные',
        type: 'popular',
    },
    {
        descr: 'Со скидкой',
        type: 'with_sale',
    },
]

const quantityPositionsData: QuantityType[] = [15, 21, 30, 42]

const PositionFunctionalPanel = () => {
    const dispatch = useDispatch()
    const sortType = useSelector((state: RootState) => state.positions.sortType)
    const quantityPositionsOnPage = useSelector(
        (state: RootState) => state.positions.quantityPositionsOnPage
    )
    const positionsType = useSelector(
        (state: RootState) => state.positions.positionsType
    )

    const [visibleSortTypeList, setVisibleSortTypeList] = useState(false)
    const [visibleQuantityList, setVisibleQuantityList] = useState(false)

    const buildSortedList = (data: FilterType[] | QuantityType[]) => {
        const filters = data.map((filter) => {
            const functionCB =
                typeof filter === 'object'
                    ? () => {
                          dispatch(setPositionsSortType(filter))
                      }
                    : () => {
                          dispatch(setQuantityPositionsOnPage(filter))
                      }
            const activeClass =
                typeof filter === 'object'
                    ? filter.type === sortType.type
                        ? 'position-functional-panel_subcategories_list_item_active'
                        : ''
                    : filter === quantityPositionsOnPage
                    ? 'position-functional-panel_subcategories_list_item_active'
                    : ''
            return (
                <li
                    className={`position-functional-panel_subcategories_list_item ${activeClass}`}
                    onClick={functionCB}
                >
                    <div className="position-functional-panel_subcategories_list_item_wrapper">
                        <span>
                            {typeof filter === 'object'
                                ? `${filter.descr}`
                                : `${filter}`}
                        </span>
                    </div>
                </li>
            )
        })
        return (
            <ul className="position-functional-panel_subcategories_list">
                {filters}
            </ul>
        )
    }

    return (
        <div className="position-functional-panel">
            <div className="position-functional-panel_wrapper">
                <div className="position-functional-panel_functions">
                    <div className="position-functional-panel_functions_sort search_form">
                        <button className="button_search-form button_sort">
                            Сортировка:
                        </button>
                        <div className="position-functional-panel_functions_sort_type">
                            <span className="position-functional-panel_functions_sort_type_name">
                                {`${sortType.descr}`}
                            </span>

                            <div
                                className="position-functional-panel_subcategories"
                                onMouseLeave={() => {
                                    setVisibleSortTypeList(false)
                                    setVisibleQuantityList(false)
                                }}
                            >
                                {visibleSortTypeList
                                    ? buildSortedList(_filterTypesData)
                                    : null}
                            </div>
                        </div>
                        <img
                            src={`./icons/system/catalog-arrow${
                                visibleSortTypeList ? '-active' : ''
                            }.svg`}
                            alt="arrow"
                            onClick={() =>
                                setVisibleSortTypeList((state) => !state)
                            }
                        />
                        <div className="position-functional-panel_functions_sort_list "></div>
                    </div>
                    <div className="position-functional-panel_functions_quantity search_form">
                        <button className="button_search-form button_quantity">
                            Показать:
                        </button>
                        <div className="position-functional-panel_functions_quantity_counter">
                            <span className="position-functional-panel_functions_quantity_counter_name">
                                {quantityPositionsOnPage}
                            </span>
                            <div
                                className="position-functional-panel_subcategories"
                                onMouseLeave={() => {
                                    setVisibleSortTypeList(false)
                                    setVisibleQuantityList(false)
                                }}
                            >
                                {visibleQuantityList
                                    ? buildSortedList(quantityPositionsData)
                                    : null}
                            </div>
                        </div>

                        <img
                            src={`./icons/system/catalog-arrow${
                                visibleQuantityList ? '-active' : ''
                            }.svg`}
                            alt="arrow"
                            onClick={() =>
                                setVisibleQuantityList((state) => !state)
                            }
                        />
                    </div>
                </div>
                <div className="position-functional-panel_positionstype">
                    <span>
                        <svg
                            width="28"
                            height="27"
                            viewBox="0 0 28 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => dispatch(setPositionsType('card'))}
                        >
                            <g id="Category">
                                <path
                                    id="Category_2"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8.68472 0.142456H4.6344C2.44127 0.142456 0.666748 1.93238 0.666748 4.13648V8.22196C0.666748 10.4252 2.44165 12.216 4.6344 12.216H8.68472C10.8775 12.216 12.6524 10.4252 12.6524 8.22196V4.13648C12.6524 1.93238 10.8779 0.142456 8.68472 0.142456ZM4.6344 2.00292H8.68472C9.84673 2.00292 10.7919 2.95631 10.7919 4.13648V8.22196C10.7919 9.40136 9.84623 10.3555 8.68472 10.3555H4.6344C3.47289 10.3555 2.52721 9.40136 2.52721 8.22196V4.13648C2.52721 2.95631 3.47239 2.00292 4.6344 2.00292ZM23.367 0.142456H19.3154C17.1223 0.142456 15.3478 1.93238 15.3478 4.13648V8.22196C15.3478 10.4252 17.1227 12.216 19.3154 12.216H23.367C25.5588 12.216 27.3334 10.4249 27.3334 8.22196V4.13648C27.3334 1.93264 25.5592 0.142456 23.367 0.142456ZM19.3154 2.00292H23.367C24.5279 2.00292 25.4729 2.95644 25.4729 4.13648V8.22196C25.4729 9.40122 24.5274 10.3555 23.367 10.3555H19.3154C18.1539 10.3555 17.2083 9.40136 17.2083 8.22196V4.13648C17.2083 2.95631 18.1534 2.00292 19.3154 2.00292ZM4.6344 14.7356H8.68472C10.8781 14.7356 12.6524 16.5258 12.6524 18.7309V22.8151C12.6524 25.0192 10.8779 26.8091 8.68472 26.8091H4.6344C2.44127 26.8091 0.666748 25.0192 0.666748 22.8151V18.7309C0.666748 16.5258 2.44101 14.7356 4.6344 14.7356ZM8.68472 16.5961H4.6344C3.47226 16.5961 2.52721 17.5496 2.52721 18.7309V22.8151C2.52721 23.9953 3.47239 24.9487 4.6344 24.9487H8.68472C9.84673 24.9487 10.7919 23.9953 10.7919 22.8151V18.7309C10.7919 17.5496 9.84687 16.5961 8.68472 16.5961ZM23.367 14.7356H19.3154C17.1221 14.7356 15.3478 16.5258 15.3478 18.7309V22.8151C15.3478 25.0192 17.1223 26.8091 19.3154 26.8091H23.367C25.5592 26.8091 27.3334 25.0189 27.3334 22.8151V18.7309C27.3334 16.526 25.5594 14.7356 23.367 14.7356ZM19.3154 16.5961H23.367C24.528 16.5961 25.4729 17.5497 25.4729 18.7309V22.8151C25.4729 23.9951 24.5279 24.9487 23.367 24.9487H19.3154C18.1534 24.9487 17.2083 23.9953 17.2083 22.8151V18.7309C17.2083 17.5496 18.1533 16.5961 19.3154 16.5961Z"
                                    fill={
                                        positionsType === 'card'
                                            ? '#FFB745'
                                            : '#BDBDBD'
                                    }
                                />
                            </g>
                        </svg>
                    </span>
                    <span>
                        <svg
                            width="28"
                            height="27"
                            viewBox="0 0 28 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => dispatch(setPositionsType('line'))}
                        >
                            <g id="Category">
                                <g id="Category_2">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0.666748 22.8151C0.666748 25.0192 2.44127 26.8091 4.6344 26.8091H23.367C25.5592 26.8091 27.3334 25.0189 27.3334 22.8151V18.7309C27.3334 16.526 25.5594 14.7356 23.367 14.7356H4.6344C2.44101 14.7356 0.666748 16.5258 0.666748 18.7309V22.8151ZM4.6344 16.5961C3.47226 16.5961 2.52721 17.5496 2.52721 18.7309V22.8151C2.52721 23.9953 3.47239 24.9487 4.6344 24.9487H23.367C24.5279 24.9487 25.4729 23.9951 25.4729 22.8151V18.7309C25.4729 17.5497 24.528 16.5961 23.367 16.5961H4.6344Z"
                                        fill={
                                            positionsType === 'line'
                                                ? '#FFB745'
                                                : '#BDBDBD'
                                        }
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0.666748 4.13648C0.666748 1.93238 2.44127 0.142456 4.6344 0.142456H23.367C25.5592 0.142456 27.3334 1.93264 27.3334 4.13648V8.22196C27.3334 10.4249 25.5588 12.216 23.367 12.216H4.6344C2.44165 12.216 0.666748 10.4252 0.666748 8.22196V4.13648ZM4.6344 10.3555C3.47289 10.3555 2.52721 9.40136 2.52721 8.22196V4.13648C2.52721 2.95631 3.47239 2.00292 4.6344 2.00292H23.367C24.5279 2.00292 25.4729 2.95644 25.4729 4.13648V8.22196C25.4729 9.40122 24.5274 10.3555 23.367 10.3555H4.6344Z"
                                        fill={
                                            positionsType === 'line'
                                                ? '#FFB745'
                                                : '#BDBDBD'
                                        }
                                    />
                                </g>
                            </g>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PositionFunctionalPanel
