import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

// Define constants for image sources
const DOTTED_BORDER_IMAGE = require('../../assets/dottedBorder.png');
const LINE_BORDER_IMAGE = require('../../assets/lineBorder.png');
const { width, height } = Dimensions.get('window');
const ThreePointScroller = ({ onChange, dataPayload }) => {
    // State to keep track of the current position
    const [position, setPosition] = useState(2);

    // Function to handle position changes
    const handlePositionChange = (newPosition, selectedKey) => {
        // Update the position state and call the onChange callback
        setPosition(newPosition);
        onChange(selectedKey);
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBar2}>
                {dataPayload.map((item, index) => (
                    <TouchableOpacity key={item.key} onPress={() => handlePositionChange(index + 1, item.key)}>
                        <Text style={[styles.heading, index == 2 ? { marginLeft: 50 } : { marginLeft: -30 }, index === 1 && styles.middleBox]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Dotted and line borders */}
            <View style={styles.progressBar}>
                <Image source={position !== 1 ? DOTTED_BORDER_IMAGE : LINE_BORDER_IMAGE} style={styles.dottedBorder1} />
                <Image source={position === 3 ? DOTTED_BORDER_IMAGE : LINE_BORDER_IMAGE} style={styles.dottedBorder2} />
                <Image source={position === 1 ? DOTTED_BORDER_IMAGE : LINE_BORDER_IMAGE} style={[styles.dottedBorder2, { marginLeft: 300 }]} />
                {position === 1 ? (<Image source={LINE_BORDER_IMAGE} style={[styles.dottedBorder2, { marginLeft: -130 }]} />) : null}
                <Image source={LINE_BORDER_IMAGE} style={[styles.dottedBorder2, { marginLeft: 300 }]} />
                {/* Render points */}
                {[1, 2, 3].map((num) => (
                    <TouchableOpacity key={num} onPress={() => handlePositionChange(num, dataPayload[num - 1].key)}>
                        <View style={[styles.point, position === num && styles.activePoint, styles[`point${num}`]]} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    progressBar: {
        flexDirection: 'row',
        width: 300,
        marginBottom: 20,
    },
    progressBar2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 20,
        width: width - 50,
        marginLeft: 25
    },
    heading: {
        color: '#99ABC7',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        lineHeight: 25,
        width: 'auto',
        textAlign: 'center'
    },
    middleBox: {
        marginLeft: 60,
        borderWidth: 1,
        borderRadius: 16,
        height: 30,
        width: 100,
        borderColor: '#36ECDA',
        textAlign: 'center',
        lineHeight: 25,
    },
    point: {
        width: 13,
        height: 13,
        borderRadius: 10,
        backgroundColor: '#7C8DAA',
        marginBottom: -9,
    },
    dottedBorder1: {
        width: 140,
        height: 3,
        marginLeft: 7,
        position: 'absolute',
        marginTop: 5,
    },
    dottedBorder2: {
        width: 144,
        height: 3,
        marginLeft: 147,
        position: 'absolute',
        marginTop: 5,
    },
    activePoint: {
        backgroundColor: '#36ECDA',
        width: 15,
        height: 15,
        marginTop: -1,
    },
    point1: {
        marginLeft: 0,
    },
    point2: {
        marginLeft: 132,
    },
    point3: {
        marginLeft: 132,
    },
});

export default ThreePointScroller;
