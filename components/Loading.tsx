import { View, Text, StyleSheet, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import React from 'react'

const Loading = (
    props: 
        React.JSX.IntrinsicAttributes & 
        React.JSX.IntrinsicClassAttributes<ActivityIndicator> & 
        React.Readonly<ActivityIndicatorProps>
    ) => {
        return (
            <View style={styles.container}>
            <ActivityIndicator {...props} />
            </View>
        )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})