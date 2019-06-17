import React, { useState, useEffect, useCallback } from 'react'
import { NavBar, ListView, Icon, List, Steps, WhiteSpace, Button, WingBlank } from 'antd-mobile'
import axios from 'axios'

export default function BugView(props) {
    const [bugsData, setBugsData] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const [levelsData, setLevelsData] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const [usersData, setUsersData] = useState([])
    const [levelUsers, setLevelUsers] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const [displayValue, setDisplayValue] = useState(0)
    const [bug, setBug] = useState({})
    const [bugFixedUser, setBugFixedUser] = useState({})

    // eslint-disable-next-line
    const loadBugsData = useCallback(async () => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_bug', {})
        if (response && response.data.code === 0 && response.data.data) {
            setBugsData(bugsData.cloneWithRows(response.data.data))
        }
    })
    // eslint-disable-next-line
    const loadLevelsData = useCallback(async () => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_level', {})
        if (response && response.data.code === 0 && response.data.data) {
            setLevelsData(levelsData.cloneWithRows(response.data.data))
        }
    })
    // eslint-disable-next-line
    const loadUsersData = useCallback(async () => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_user')
        if (response && response.data.code === 0 && response.data.data) {
            setUsersData(response.data.data)
        }
    })
    // eslint-disable-next-line
    const loadBug = useCallback(async (id) => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_bug', { id })
        if (response && response.data.code === 0 && response.data.data) {
            setBug(response.data.data[0])
        }
    })

    useEffect(() => {
        loadBugsData()
        loadLevelsData()
        loadUsersData()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setBugFixedUser({})
        usersData.some(item => {
            if (item.id === bug.fixed_user_id) {
                setBugFixedUser(item)
                return true
            }
            return false
        })
    }, [bug, usersData])

    return <div style={{ width: '100%', height: '100%' }}>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 0 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type='left' />}
                onLeftClick={() => {
                    props.history.push('/main')
                }}>缺陷列表</NavBar>
            <ListView dataSource={bugsData} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderRow={(rowData) => {
                    return <List.Item arrow="horizontal" onClick={() => {
                        loadBug(rowData.id)
                        setDisplayValue(1)
                    }}>{rowData.title_name || '空'}</List.Item>
                }} />
        </div>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 1 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type='left' />}
                onLeftClick={e => { setDisplayValue(0) }}>缺陷详情</NavBar>
            <List renderHeader={() => '缺陷信息'}>
                <List.Item extra={bug.title_name}>标题</List.Item>
                <List.Item wrap extra={bug.content}>内容</List.Item>
                <List.Item extra={bugFixedUser.name}>处理人</List.Item>
            </List>
            <List renderHeader={() => '缺陷进度'}>
                <List.Item>
                    <WhiteSpace />
                    <Steps size="small" current={bug.status}>
                        <Steps.Step title="等待分配处理人" description={bugFixedUser.name} />
                        <Steps.Step title="等待维修" />
                        <Steps.Step title="等待专工验收" />
                        <Steps.Step title="等待运行人员验收" />
                        <Steps.Step title="验收通过" />
                    </Steps>
                    <WhiteSpace />
                </List.Item>
            </List>
            <List renderHeader={() => '缺陷处理'}>
            </List>
            <WingBlank>
                <WhiteSpace />
                <Button type="primary" onClick={() => { setDisplayValue(2) }}>分配处理人</Button>
                <WhiteSpace />
                <Button type="primary" onClick={() => {
                    axios.post('http://hefeixiaomu.com:3009/update_bug', { update: { ...bug, status: 2 }, query: { id: bug.id } })
                        .then((response => {
                            if (response.data.code === 0) {
                                loadBug(bug.id)
                            }
                        }))
                }}>维修完毕</Button>
                <WhiteSpace />
                <Button type="primary" onClick={() => {
                    axios.post('http://hefeixiaomu.com:3009/update_bug', { update: { ...bug, status: 3 }, query: { id: bug.id } })
                        .then((response => {
                            if (response.data.code === 0) {
                                loadBug(bug.id)
                            }
                        }))
                }}>专工验收</Button>
                <WhiteSpace />
                <Button type="primary" onClick={() => {
                    axios.post('http://hefeixiaomu.com:3009/update_bug', { update: { ...bug, status: 4 }, query: { id: bug.id } })
                        .then((response => {
                            if (response.data.code === 0) {
                                loadBug(bug.id)
                            }
                        }))
                }}>运营人员验收</Button>
                <WhiteSpace />
            </WingBlank>
        </div>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 2 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => { setDisplayValue(1) }}>部门列表</NavBar>
            <ListView dataSource={levelsData} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderRow={(rowData) => {
                    return <List.Item arrow="horizontal" onClick={() => {
                        const lus = usersData.filter(user => user.level_id === rowData.id)
                        setLevelUsers(levelUsers.cloneWithRows(lus))
                        setDisplayValue(3)
                    }}>{rowData.name}</List.Item>
                }} />
        </div>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 3 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {
                setDisplayValue(2)
            }}>员工列表</NavBar>
            <ListView dataSource={levelUsers} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderRow={(rowData) => {
                    return <List.Item onClick={() => {
                        // 更新Bug处理人
                        axios.post('http://hefeixiaomu.com:3009/update_bug', { update: { ...bug, fixed_user_id: rowData.id, status: 1 }, query: { id: bug.id } })
                            .then((response => {
                                if (response.data.code === 0) {
                                    loadBug(bug.id)
                                    setDisplayValue(1)
                                }
                            }))
                    }}>{rowData.name}</List.Item>
                }} />
        </div>
    </div>
}