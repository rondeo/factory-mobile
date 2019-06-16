import React, { useContext } from 'react'
import { NavBar, Icon, List, Steps, WhiteSpace } from 'antd-mobile'
import { AppDataContext } from '../../AppData'

export default function BugDetailView(props) {
    const { appState } = useContext(AppDataContext)

    return <div style={{ width: '100%', height: '100%' }}>
        <NavBar mode="light" icon={<Icon type='left' />}
            onLeftClick={e => { console.log(props); props.history.push('/main') }}>缺陷详情</NavBar>
        <List renderHeader={() => '缺陷信息'} className="my-list">
            <List.Item extra={appState.bug.title_name}>标题</List.Item>
            <List.Item extra={appState.bug.content}>内容</List.Item>
        </List>
        <List renderHeader={() => '缺陷进度'} className="my-list">
            <List.Item>
                <WhiteSpace />
                <Steps size="small" current={1}>
                    <Steps.Step title="Finished" description="This is description" />
                    <Steps.Step title="In Progress" description="This is description" />
                    <Steps.Step title="Waiting" description="This is description" />
                </Steps>
                <WhiteSpace />
            </List.Item>
        </List>
        <List renderHeader={() => '缺陷处理'} className="my-list">
            <List.Item arrow="horizontal">分配处理</List.Item>
        </List>
    </div >
}