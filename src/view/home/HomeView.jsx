import React from 'react'
import { Grid } from 'antd-mobile'

const list = ['巡检平台', '缺陷管理', '仓库管理', '工卡管理', '工作票', '安全管理', '视频监控']

export default props => {
    const data = list.map(item => ({ text: item }))
    return <Grid data={data} columnNum={3} hasLine onClick={(el, index) => {
        if (index === 1) {
            props.history.push('/bug')
        } else if (index === 0) {
            props.history.push('/device')
        }
    }} />
}