export const showNotif = (message, color, $q, icon = 'priority_high') => {
    $q.notify({
        icon: icon,
        message: message,
        color: color
    })
}