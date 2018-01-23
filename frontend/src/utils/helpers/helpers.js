// Format timestamp in formated date
export const dateFormat = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString();
}
