import React, { useState, memo, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15;

const StackCarousel = ({ data: initialData, renderItem }) => {
    const [data, setData] = useState(initialData);
    const [history, setHistory] = useState([]);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    useEffect(() => {
        translateX.value = 0;
        translateY.value = 0;
    }, [data]);

    const handleSwipeRight = () => {
        setData((prev) => {
            const newData = [...prev];
            const swipedItem = newData.shift();
            setHistory(prevHistory => [...prevHistory, swipedItem]);
            newData.push(swipedItem);
            return newData;
        });
    };

    const handleSwipeLeft = () => {
        if (history.length === 0) {
            translateX.value = withSpring(0);
            return;
        }
        setHistory((prevHistory) => {
            const newHistory = [...prevHistory];
            const itemToRestore = newHistory.pop();

            setData(prevData => {
                const filteredData = prevData.filter(item => item.id !== itemToRestore.id);
                return [itemToRestore, ...filteredData];
            });
            return newHistory;
        });
    };

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd((event) => {
            if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
                const goingRight = event.translationX > 0;

                if (!goingRight) {
                    translateX.value = withSpring(-SCREEN_WIDTH, { velocity: event.velocityX });
                    runOnJS(handleSwipeLeft)();
                } else {
                    translateX.value = withSpring(
                        SCREEN_WIDTH * 2,
                        { velocity: event.velocityX, overshootClamping: true },
                        () => { runOnJS(handleSwipeRight)(); }
                    );
                }
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        });

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.stackWrapper}>
                {data
                    .map((item, index) => (
                        <Card
                            key={item.id}
                            item={item}
                            index={index}
                            translateX={translateX}
                            translateY={translateY}
                            renderItem={renderItem}
                            isTop={index === 0}
                            gesture={gesture}
                        />
                    ))
                    .reverse()}
            </View>
        </GestureHandlerRootView>
    );
};

const Card = memo(({ item, index, translateX, translateY, renderItem, isTop, gesture }) => {
    const animatedStyle = useAnimatedStyle(() => {
        if (isTop) {
            return {
                transform: [
                    { translateX: translateX.value },
                    { translateY: translateY.value },
                    { rotate: `${interpolate(translateX.value, [-SCREEN_WIDTH, SCREEN_WIDTH], [-15, 15])}deg` },
                    { scale: 1 }
                ],
                zIndex: 100,
                opacity: 1,
            };
        }

        const swipeProgress = interpolate(
            Math.abs(translateX.value),
            [0, SWIPE_THRESHOLD],
            [0, 1],
            Extrapolation.CLAMP
        );

        const isVisible = index < 3;

        const scale = interpolate(index, [1, 2], [0.92, 0.84]) + (swipeProgress * 0.08);
        const yOffset = interpolate(index, [1, 2], [20, 40]) - (swipeProgress * 20);
        const opacity = interpolate(index, [1, 2], [0.9, 0.4]) + (swipeProgress * 0.1);

        return {
            transform: [
                { scale: scale },
                { translateY: yOffset },
            ],
            opacity: isVisible ? opacity : 0,
            zIndex: 10 - index,
        };
    });

    return (
        <Animated.View style={[styles.card, animatedStyle]}>
            {isTop ? (
                <GestureDetector gesture={gesture}>
                    <Animated.View style={styles.fill}>{renderItem(item)}</Animated.View>
                </GestureDetector>
            ) : (
                renderItem(item)
            )}
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        height: 480,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stackWrapper: {
        width: SCREEN_WIDTH * 0.85,
        height: 420,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 40,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 5,
    },
    fill: {
        flex: 1,
    }
});

export default StackCarousel;