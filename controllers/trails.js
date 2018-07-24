const express = require('express');
const router = express.Router();
const Trail = require("../models/trails")


router.get('/', async (req, res) => {
	try {
		const data = await Trail.find({});
		res.render('trails/index.ejs', 
		{ "trailsList": data });
	} catch (error) {
		console.log(error);
	}
});

router.get('/new', (req, res) => {
		res.render('trails/new.ejs')
});


router.post('/', (req, res) => {
	Trail.create(req.body, (err, createdTrail) => {
		console.log(createdTrail);
		res.redirect('/trails')
	});
});





router.get('/:id', async (req, res) => {
	try {
		const data = await Trail.findById(req.params.id);
		res.render('trails/show.ejs', {
			trail: data,
			index: req.params.id
		})
	} catch (error) {
		console.log(error)
	}
});

router.get('/:id/edit', (req, res) => {
	Trail.findById(req.params.id, (err, editTrail) => {
		res.render("trails/edit.ejs", {
			trail: editTrail
		});
	});
});

router.put('/:id', async (req, res) => {
	try {
		await Trail.findByIdAndUpdate(req.params.id, req.body, {new: true})
		res.redirect('/trails');
	} catch(err) {
		console.log(error)
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Trail.findByIdAndRemove(req.params.id)
		res.redirect('/trails');
	} catch(err) {
		console.log(error)
	}
});



module.exports = router;