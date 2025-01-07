import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { styles } from './SwitchGroup.style'

type Tab = {
  key: string
  label: string
}

type SwitchGroupProps = {
  tabs: Tab[]
  activeTab: string
  onTabChange: (key: string) => void
}

export const SwitchGroup: FC<SwitchGroupProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <View style={styles.tabs}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text style={styles.tabText}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
