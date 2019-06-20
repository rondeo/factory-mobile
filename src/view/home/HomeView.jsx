import React from 'react'
import { Grid, NavBar, WhiteSpace, WingBlank, Carousel } from 'antd-mobile'
import Icon1 from '../../assets/1.svg'

const list = ['巡检平台', '缺陷管理', '仓库管理', '工卡管理', '工作票', '安全管理', '视频监控']

export default props => {
    const data = list.map(item => ({ text: item, icon: <img width='60' height="60" src={Icon1} alt=""></img> }))
    return <div>
        <NavBar mode="light">首页</NavBar>
        <WingBlank>
            <WhiteSpace />
            <Carousel
                autoplay
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
            >
                <img
                    src={`https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                    }}
                />
                <img
                    src={`https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                    }}
                />
                <img
                    src={`https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                    }}
                />
            </Carousel>
            <WhiteSpace />
            <Grid data={data} columnNum={3} hasLine onClick={(el, index) => {
                if (index === 1) {
                    props.history.push('/bug')
                } else if (index === 0) {
                    props.history.push('/device')
                }
            }} />
        </WingBlank>
    </div>
}