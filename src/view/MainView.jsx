import React, { useState } from 'react'
import { TabBar, Icon } from 'antd-mobile'
import HomeView from './home/HomeView'
import ContactView from './contact/ContactView'
import TaskView from './task/TaskView';
import Icon1 from '../assets/1.svg'
import MeView from './me/MeView';

export default function MainView(props) {
    const [index, setIndex] = useState(0)

    return <div style={{ height: '100%', width: '100%', top: 0 }}>
        <TabBar>
            <TabBar.Item title="首页" key="message" icon={<img alt="" width="22" height="22" src={Icon1} />}
                selectedIcon={<Icon type="" />} selected={index === 0} onPress={() => { setIndex(0) }}
                children={<HomeView {...props} />} />
            <TabBar.Item title="任务" key="bug" icon={<Icon type="" />} selectedIcon={<Icon type="" />}
                selected={index === 1} onPress={() => { setIndex(1) }} children={<TaskView {...props} />} />
            <TabBar.Item title="通讯录" key="task" icon={<Icon type="" />} selectedIcon={<Icon type="" />}
                selected={index === 2} onPress={() => { setIndex(2) }} children={<ContactView {...props} />} />
            <TabBar.Item title="我的" key="my" icon={<Icon type="" />} selectedIcon={<Icon type="" />}
                selected={index === 3} onPress={() => { setIndex(3) }} children={<MeView {...props} />} />
        </TabBar>
    </div>
}