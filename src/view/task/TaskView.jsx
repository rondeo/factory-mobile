import React, { useState, useContext, useCallback, useEffect } from 'react'
import { SegmentedControl, NavBar, WingBlank, WhiteSpace, ListView, List, Icon } from 'antd-mobile';
import axios from 'axios'
import { AppDataContext } from '../../AppData'

export default props => {
    const [tasksData, setTasksData] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const { appState } = useContext(AppDataContext)
    const [displayValue, setDisplayValue] = useState(0)
    const [task, setTask] = useState({})

    // eslint-disable-next-line
    const loadTasksData = useCallback(async () => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_task', { to: { $like: `%,${appState.user.id},%` } })
        if (response && response.data.code === 0 && response.data.data) {
            setTasksData(tasksData.cloneWithRows(response.data.data))
        }
    })

    useEffect(() => {
        loadTasksData()
        // eslint-disable-next-line
    }, [])

    return <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%', display: displayValue === 0 ? 'block' : 'none' }}>
            <NavBar mode="light" rightContent={[<Icon key="0" type="ellipsis" />]}>任务管理</NavBar>
            <WingBlank>
                <WhiteSpace />
                <SegmentedControl values={['我分配的任务', '分配我的任务']} onValueChange={val => {
                    console.log(val)
                }} />
            </WingBlank>
            <ListView dataSource={tasksData} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderHeader={() => '分配我的任务'}
                renderRow={(rowData) => {
                    return <List.Item arrow="horizontal" onClick={() => {
                        setTask(rowData)
                        setDisplayValue(1)
                    }}>{rowData.title || '空'}</List.Item>
                }} />

        </div>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 1 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type='left' />} onLeftClick={() => { setDisplayValue(0) }}>任务详情</NavBar>
            <List renderHeader={() => '任务信息'}>
                <List.Item extra={task.title}>标题</List.Item>
                <List.Item extra={task.title}>分配人</List.Item>
                <List.Item extra={task.title}>截止日期</List.Item>
            </List>
        </div>
    </div >
}