import React, { useEffect, useState } from 'react';
import Text from './app-text'; // Make sure to import the correct component for text display
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Make sure to import the correct icon component
import { useQuestion } from 'hooks/quiz-provider';
import { View } from 'react-native';

const Timer = () => {
    const { time: { initialTime, onClose, start } } = useQuestion();
    const [minutes, setMinutes] = useState(Math.floor(initialTime / 60));
    const [seconds, setSeconds] = useState(initialTime % 60);

    useEffect(() => {
        if (start && initialTime > 0) {
            const countdownInterval = setInterval(() => {
                setMinutes(Math.floor(initialTime / 60));
                setSeconds(initialTime % 60);

                useQuestion.setState((state) => ({
                    time: {
                        ...state.time,
                        initialTime: state.time.initialTime - 1,
                    },
                }));
            }, 1000);

            return () => {
                clearInterval(countdownInterval);
                if (initialTime === 0) {
                    onClose && onClose();
                }
            };
        }
    }, [start, initialTime, onClose]);

    const formatTime = (value: number) => {
        return value < 10 ? `0${value}` : `${value}`;
    };

    return (
        <View className='mr-5 flex flex-row items-center justify-center'>
            {start && initialTime > 0 ? (
                <Text classes='flex flex-row item-center text-blue-800'>
                    <Ionicons name="time-outline" size={24} className="mr-3" />
                    <Text>{formatTime(minutes)}:{formatTime(seconds)}</Text>
                </Text>
            ) : <Text><MaterialIcons name="timer-off" size={24} color="black" /></Text>}
        </View>
    );
};

export default Timer;
