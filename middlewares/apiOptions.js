const GetErrorMessage = require('../config/init/errorMessages');
const url = require('url');

/**
 * Allow additional filtering - per_page, page, sort, sort_direction
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
const apiOptions = function(req, res, next) {
    try {

        let params = url.parse(req.url, true).query;
        console.log(params);
        let options = {};
        
        if((params.per_page && !params.page) || (!params.per_page && params.page)) {
            res.status(400).json({ Message: GetErrorMessage(998) });
            return;
        }
        
        // Limit and skip
        if(params.per_page && params.page) {
            options.limit = Number(params.per_page);
            options.skip = Number(params.per_page * (params.page - 1));
        }

        // Sorting and direction
        // Default sort direction is ascending
        // Default: sort by _id
        let sortParam = params.sort ? params.sort : '_id';
        options.sort = {
            [sortParam]: params.sort_direction == 'desc' ? -1 : 1 
        };

        // Bind fetch option with req obj
        req.fetchOptions = options;

        next();

    } catch(ex) {
        console.log(ex);
        res.status(400).json({ Message: 'Invalid params passed.' });     
    }
}

module.exports = apiOptions;