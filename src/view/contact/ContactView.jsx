import React, { useState, useEffect, useCallback } from 'react'
import { NavBar, ListView, Icon, List } from 'antd-mobile'
import axios from 'axios'

export default function ContactView(props) {
    const [levelsData, setLevelsData] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const [usersData, setUsersData] = useState([])
    const [levelUsers, setLevelUsers] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const [displayValue, setDisplayValue] = useState(0)

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

    useEffect(() => {
        loadLevelsData()
        loadUsersData()
        // eslint-disable-next-line
    }, [])

    return <div style={{ width: '100%', height: '100%' }}>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 0 ? 'block' : 'none' }}>
            <NavBar mode="light">部门列表</NavBar>
            <ListView dataSource={levelsData} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderRow={(rowData) => {
                    return <List.Item arrow="horizontal" onClick={() => {
                        const lus = usersData.filter(user => user.level_id === rowData.id)
                        setLevelUsers(levelUsers.cloneWithRows(lus))
                        setDisplayValue(1)
                    }}>{rowData.name}</List.Item>
                }} />
        </div>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 1 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {
                setDisplayValue(0)
            }}>员工列表</NavBar>
            <ListView dataSource={levelUsers} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderRow={(rowData) => {
                    return <List.Item extra={rowData.remark}>{rowData.name}</List.Item>
                }} />
        </div>
    </div>
}