import React from 'react'
import { View } from 'react-native'

export interface Props {
  spacing: number;
}

export const Space = ({ spacing }: Props) => {
  return (
    <View style={{ width: spacing, height: spacing }}></View>
  )
}
