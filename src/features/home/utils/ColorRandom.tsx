export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color;

    do {
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (color === '#FFFFFF'); // Kiểm tra xem màu có phải là trắng không

    return color;
};
