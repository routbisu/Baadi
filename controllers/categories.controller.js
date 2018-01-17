const router = require('../routes/routes');
const passport = require('passport');
const categoriesService = require('../services/categoryService');
const adminOnly = require('../middlewares/allowAdminOnly');

/**
 * Get all categories
 */
router.get('/categories', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log(req.fetchOptions);
    categoriesService.GetAll(req.fetchOptions).then(function(categories) {
        res.json(categories);
    }, function(error) {
        res.status(400).json({ Message: error })
    });
});

/**
 * Create a new category
 * Allow only for admins
 */
router.post('/categories', passport.authenticate('jwt', { session: false }), adminOnly, function(req, res) {
    console.log(req.body);    
    categoriesService.CreateNew({
        category_name: req.body.CategoryName,
        category_description: req.body.CategoryDescription ? req.body.CategoryDescription : '',
        icon_path: req.body.IconPath ? req.body.IconPath : ''
    }).then(function(categories) {
        res.json({ success: true });
    }, function(error) {
        res.status(400).json({ Message: error });
    });
});
