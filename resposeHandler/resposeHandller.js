module.exports = function (req, res, data, err) {

    var results=
    {
        status:"",
        Error:""
    }

    if (err) {
        results.status="400";
        results.Error="ERROR";


    }
    else {
        results.status="200";
        results.Error="Sucess";

    }

res.json(results)



}