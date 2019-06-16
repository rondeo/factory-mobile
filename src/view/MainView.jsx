import React, { useState } from 'react'
import { TabBar, Icon } from 'antd-mobile'
import BugListView from './bug/BugListView'
import HomeView from './home/HomeView'

export default function MainView(props) {
    const [index, setIndex] = useState(0)

    return <div style={{ height: '100%', width: '100%', top: 0 }}>
        <TabBar>
            <TabBar.Item title="首页" key="message" icon={<Icon type="left" />} selected={index === 0} onPress={() => { setIndex(0) }} children={<HomeView {...props} />} />
            <TabBar.Item title="缺陷" key="bug" icon={<Icon type="" />} selectedIcon={<Icon type="" />} selected={index === 1} children={<BugListView {...props} />} onPress={() => { setIndex(1) }} />
            <TabBar.Item title="任务" key="task" icon={<Icon type="" />} selected={index === 2} onPress={() => { setIndex(2) }} />
            <TabBar.Item title="我的" key="my" icon={<Icon type="" />} selected={index === 3} onPress={() => { setIndex(3) }} />
        </TabBar>
    </div>
}