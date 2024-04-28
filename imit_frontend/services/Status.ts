export const getColorFromStatus = (status) => {

    const statusObject = {
        'consideration': 'primary',
        'cancel' : 'negative',
        'revision' : 'secondary',
        'approve' : 'positive',
        'approve_after_revision' : 'positive',
        'approve_another_section' : 'warning',
    }

    return statusObject[status]; 
};