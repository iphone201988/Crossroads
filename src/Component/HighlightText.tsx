import React from 'react';
import { Text } from 'react-native';
const HighlightText = ({ searchText, text }) => {
    const regex = new RegExp(`(${searchText})`, 'gi');
    const parts = text.split(regex);

    return (
        <Text>
            {parts.map((part, i) => {
                return (
                    <Text
                        key={i}
                        style={
                            part.toLowerCase() == searchText.toLowerCase()
                                ? {
                                    fontSize: 16,
                                    fontWeight: '600',
                                    lineHeight: 65,
                                    color: '#99ABC7',
                                    includeFontPadding: false,
                                }
                                : {
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: '400',
                                    lineHeight: 65
                                }
                        }>
                        {part}
                    </Text>
                );
            })}
        </Text>
    );
};

export default HighlightText;