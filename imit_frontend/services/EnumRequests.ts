export const getRequestTxT = (enumValue) => {

    const mapping = {
        'consideration': 'На рассмотрении',
        'cancel': 'Отмена',
        'revision': 'На доработке',
        'approve': 'Принято',
        'approve_after_revision': 'Принято после доработки',
        'approve_another_section': 'Принято, изменена секция'
    };

    return mapping[enumValue]; 
};

export const getEnumKeyFromText = (textValue) => {
    const mapping = {
        'consideration': 'На рассмотрении',
        'cancel': 'Отмена',
        'revision': 'На доработке',
        'approve': 'Принято',
        'approve_after_revision': 'Принято после доработки',
        'approve_another_section': 'Принято, изменена секция'
    };

    const invertedMapping = Object.fromEntries(Object.entries(mapping).map(([key, value]) => [value, key]));

    return invertedMapping[textValue]; 
};