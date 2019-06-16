import React from 'react'
import { Grid, Icon } from 'antd-mobile'

const list = [
    'check-circle', 'check', 'check-circle-o',
    'cross-circle', 'cross', 'cross-circle-o',
    'up', 'down', 'left',
    'right', 'ellipsis',
    'loading',
]

export default props => {
    const data = list.map(item => ({ icon: (<Icon type={item} />), text: item }))
    return <Grid data={data} columnNum={3} hasLine />
}