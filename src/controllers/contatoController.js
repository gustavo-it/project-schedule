const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato')
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }
    
        req.flash('success', 'Contato registrado com sucesso.');
        // Acessando a constante contato acima
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch(error) {
        console.log(error);
        return res.render('404');
    };
};

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    const user = await contato.buscaPorId(req.params.id);
    if(!req.params.id) return res.render('404');

    res.render('contato', {
        contato: user,
    });
};