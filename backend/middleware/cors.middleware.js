function cors(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next()
}

export default cors