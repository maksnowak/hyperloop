const validateParams = (id: any, from: any, to: any) => {
    // id should be a number
    if (!id) {
        throw new Error('No id provided');
    }
    id = Number(id);
    // start_date should be a valid date
    if (!from) {
        throw new Error('No start_date provided');
    }
    from = new Date(from);
    // end_date should be a valid date
    if (!to) {
        throw new Error('No end_date provided');
    }
    to = new Date(to);
    return { id: id, from: from, to: to };
};

export default validateParams;