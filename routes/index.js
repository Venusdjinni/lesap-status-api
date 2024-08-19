let express = require('express');
let router = express.Router();
const Status = require('../models/status');

// liste des statuts
router.get('/statuses', function(req, res, next) {
    let page = req.query.page ? parseInt(req.query.page) : 0;
    let size = 10;

    Status
        .find({})
        .sort({creation_date: -1})
        .skip(page * size)
        .limit(size)
        .then(
            async function(statuses) {
                let r = {};
                r.content = statuses;
                r.page = page;
                r.total = await Status.countDocuments();
                return res.status(200).send(r);
            },
            function(err) {
                console.log(err);
                return res.status(500).send({});
            },
        );
});

// création d'un statut
router.post('/status', function(req, res) {
    let content = req.body.content;

    if (
        content == null ||
        !(typeof content === 'string') ||
        content.trim().length === 0
    ) {
        return res.status(400).send({});
    }

    let status = new Status({
        content: content,
        creation_date: Date.now(),
        // aléatoire entre 0 et 50
        views_count: Math.floor(Math.random() * (50 - 1)),
    });

    status.save().then(
        function(status) {
            let r = {status: status};
            return res.status(200).send(r);
        },
        function(err) {
            console.log(err);
            return res.status(500).send({});
        },
    );
});

module.exports = router;
