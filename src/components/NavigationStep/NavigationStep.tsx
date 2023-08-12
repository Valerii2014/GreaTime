import './navigationStep.scss'

import { Fragment } from 'react'
import { onTransformString } from '../../utils/stringTransformer'

interface NavigationStepsProps {
    steps: string[] // Укажите, что ожидается массив строк
}

const NavigationSteps: React.FC<NavigationStepsProps> = (props) => {
    const { steps } = props

    const navigationItems = steps.map((step, index) => {
        return (
            <Fragment key={step}>
                {index > 0 && <span className="navigation_slash">/</span>}
                <span>{onTransformString(step)}</span>
                {index === steps.length - 1 && (
                    <span className="navigation_slash" />
                )}
            </Fragment>
        )
    })

    return (
        <div className="navigation">
            <div className="container">{navigationItems}</div>
        </div>
    )
}

export default NavigationSteps
