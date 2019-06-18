import React, { useState, useContext, useCallback, useEffect } from 'react'
import { NavBar, WingBlank, WhiteSpace, ListView, List, Icon, InputItem, TextareaItem, Button, Switch, DatePicker, Toast } from 'antd-mobile';
import axios from 'axios'
import { AppDataContext } from '../../AppData'

export default props => {
    const [tasksData, setTasksData] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const { appState } = useContext(AppDataContext)
    const [displayValue, setDisplayValue] = useState(0)
    const [task, setTask] = useState({})    // 选中的任务
    const [newTask, setNewTask] = useState({ checked: true }) // 新建的任务
    const [levelsData, setLevelsData] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
    const [usersData, setUsersData] = useState([])
    const [levelUsers, setLevelUsers] = useState(new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))

    // eslint-disable-next-line
    const loadTasksData = useCallback(async () => {
        const response = await axios.post('http://hefeixiaomu.com:3009/find_task', { to: { $like: `%,${appState.user.id},%` } })
        if (response && response.data.code === 0 && response.data.data) {
            setTasksData(tasksData.cloneWithRows(response.data.data))
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

    useEffect(() => {
        loadTasksData()
        loadLevelsData()
        loadUsersData()
        // eslint-disable-next-line
    }, [])

    return <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%', display: displayValue === 0 ? 'block' : 'none' }}>
            <NavBar mode="light" rightContent={<Icon key="0" type="ellipsis" onClick={() => {
                setDisplayValue(2)
            }} />}>任务管理</NavBar>
            <ListView dataSource={tasksData} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderHeader={() => '任务列表'}
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
                <List.Item wrap extra={task.content}>内容</List.Item>
                <List.Item extra={task.title}>截止日期</List.Item>
            </List>
        </div>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 2 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type='left' />} onLeftClick={() => { setDisplayValue(0) }}>新建任务</NavBar>
            <List>
                <List.Item arrow="horizontal" onClick={() => { setDisplayValue(3) }} extra={newTask.toname}>执行人</List.Item>
                <InputItem onChange={val => { setNewTask({ ...newTask, title: val }) }}>主题</InputItem>
                <DatePicker
                    value={newTask.date}
                    onChange={date => { setNewTask({ ...newTask, date }) }}
                >
                    <List.Item arrow="horizontal">截止日期</List.Item>
                </DatePicker>
                <TextareaItem title="内容" rows={3} onChange={val => {
                    setNewTask({ ...newTask, content: val })
                }}></TextareaItem>
                <List.Item extra={<Switch checked={newTask.checked}
                    onChange={val => { setNewTask({ ...newTask, checked: val }) }}></Switch>}>短信通知</List.Item>
            </List>
            <WhiteSpace />
            <WingBlank>
                <Button type="primary" onClick={() => {
                    axios.post('http://hefeixiaomu.com:3009/insert_task', {
                        title: newTask.title,
                        content: newTask.context,
                        to: `,${newTask.toid},`,
                        from: appState.user.id,
                        isMessage: newTask.checked ? 1 : 0,
                        overTime: newTask.date.getTime()
                    }).then(response => {
                        if (response.data && response.data.code === 0) {
                            axios.post('http://hefeixiaomu.com:3009/sendMessageToStaffs', [{
                                phonenumber: newTask.tophone,
                                name: newTask.toname,
                                title: newTask.title,
                                time: `${newTask.date.getFullYear()}年${newTask.date.getMonth() + 1}月${newTask.date.getDate()}日`
                            }])
                            Toast.success('新建任务成功')
                            loadTasksData()
                            setDisplayValue(0)
                        }
                    })
                }}>确定</Button>
            </WingBlank>
        </div>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 3 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => { setDisplayValue(2) }}>部门列表</NavBar>
            <ListView dataSource={levelsData} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderRow={(rowData) => {
                    return <List.Item arrow="horizontal" onClick={() => {
                        const lus = usersData.filter(user => user.level_id === rowData.id)
                        setLevelUsers(levelUsers.cloneWithRows(lus))
                        setDisplayValue(4)
                    }}>{rowData.name}</List.Item>
                }} />
        </div>
        {/* =================================================================================================================== */}
        <div style={{ width: '100%', height: '100%', display: displayValue === 4 ? 'block' : 'none' }}>
            <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {
                setDisplayValue(3)
            }}>员工列表</NavBar>
            <ListView dataSource={levelUsers} initialListSize={20} pageSize={2} style={{ height: document.documentElement.clientHeight - 45 }}
                renderRow={(rowData) => {
                    return <List.Item onClick={() => {
                        setNewTask({ ...newTask, toid: rowData.id, toname: rowData.name, tophone: rowData.phonenumber })
                        setDisplayValue(2)
                    }}>{rowData.name}</List.Item>
                }} />
        </div>
    </div >
}