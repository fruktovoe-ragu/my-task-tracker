export const checkEventIsClickOrEnterPress = (e) =>
    e.type === 'touchstart' ||
    e.type === 'click' ||
    (e.nativeEvent).code === 'Enter' ||
    (e.nativeEvent).code === 'NumpadEnter';