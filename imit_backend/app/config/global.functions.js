function sendResult(res, result){
    res.status(200).send(result);
}

function sendResultWithId(res, result, id){
    res.status(200).json({ message: result, id: id });
}

function sendError(res, err){
    res.status(500).send(err);
}

module.exports = {
    sendResult: sendResult,
    sendResultWithId: sendResultWithId,
    sendError: sendError
};