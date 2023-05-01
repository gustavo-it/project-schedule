const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = []; // se tiver algum erro aqui dentro n posso cadastrar
        this.user = null;
    };

    async register() {
        this.valida();
        if(this.errors.length > 0) return;
        // Se o usuário for criado é possível acessar de fora
        
        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        
        try {
            this.user = await LoginModel.create(this.body);
        } catch(error) {
            console.log(error);
        }
    };

    async userExists() {
        // Procurando se já existe um email cadastrado
        const user = await LoginModel.findOne({ email: this.body.email });
        if(user) this.errors.push('Usuário já existe.');
    }

    valida() {
        // Validação dos campos
        // e-mail precisa ser válida
        // senha precisa ter entre 3 e 14 caracteres
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if(this.body.password.length < 3 || this.body.password.length > 50) {
            return this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
        }
    };

    cleanUp() {
        // vai garantir que tudo dentro de body é uma string
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            };
        };

        // Garantindo que o objeto tenha somente estes campos
        this.body = {
            email: this.body.email,
            password: this.body.password,
        };
    };
};

module.exports = Login;