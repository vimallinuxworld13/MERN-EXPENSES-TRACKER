const express = require('express');
const usersController = require('../controllers/usersCtrl');
const isAuthenticated = require('../middlewares/isAuth');
const transactionController = require('../controllers/transactionCtrl');

const transactionRouter  = express.Router();
//!add
transactionRouter.post(
    '/api/v1/transactions/create', 
    isAuthenticated,
    transactionController.create
);


//!List
transactionRouter.get(
    '/api/v1/transactions/lists', 
    isAuthenticated,
    transactionController.lists
);


//!getFilteredTransactions
transactionRouter.get(
    '/api/v1/transactions/lists_filter', 
    isAuthenticated,
    transactionController.getFilteredTransactions
);


//! update
transactionRouter.put(
    '/api/v1/transactions/update/:id', 
    isAuthenticated,
    transactionController.update
);

//! delete
transactionRouter.put(
    '/api/v1/transactions/delete/:id', 
    isAuthenticated,
    transactionController.delete
);


module.exports = transactionRouter;

