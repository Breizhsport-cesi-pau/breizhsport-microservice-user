const User = require( '../models/User' );
const Global = require( '../utils/helpers' )

// Récupérer tous les utilisateurs
exports.getAllUsers = async ( req, res ) => {
    try {
        const users = await User.findAll( {
            attributes: { exclude: [ 'password' ] }
        } );
        res.json( users );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Erreur lors de la récupération des utilisateurs' } );
    }
};

// Récupérer un utilisateur par ID
exports.getUserById = async ( req, res ) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk( id, { attributes: { exclude: [ 'password' ] } } );
        if ( !user ) {
            return res.status( 404 ).json( { error: 'Utilisateur non trouvé' } );
        }
        res.json( user );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Erreur lors de la récupération de l’utilisateur' } );
    }
};

// Créer un nouvel utilisateur
exports.createUser = async ( req, res ) => {
    const { firstname, lastname, email, password, phone_number, role } = req.body;
    const hash_password = await Global.hashPassword( password );
    try {
        const newUser = await User.create( { firstname, lastname, email, password: hash_password, phone_number, role } );
        res.status( 201 ).json( { message: 'Utilisateur créé', user: newUser } );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( { error: 'Erreur lors de la création de l’utilisateur' } );
    }
};

// Modifier un utilisateur
exports.updateUser = async ( req, res ) => {
    const { id } = req.params;
    const { firstname, lastname, email, phone_number, role } = req.body;
    try {
        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status( 404 ).json( { error: 'Utilisateur non trouvé' } );
        }

        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.email = email || user.email;
        user.phone_number = phone_number || user.phone_number;
        user.role = role || user.role

        await user.save();

        res.json( { message: 'Utilisateur mis à jour', user } );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Erreur lors de la mise à jour de l’utilisateur' } );
    }
};

// Supprimer un utilisateur
exports.deleteUser = async ( req, res ) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status( 404 ).json( { error: 'Utilisateur non trouvé' } );
        }

        await user.destroy();

        res.json( { message: 'Utilisateur supprimé' } );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Erreur lors de la suppression de l’utilisateur' } );
    }
};


exports.loginUser = async ( req, res ) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne( {
            where: { email },
        } );
        const hashedPassword = user.password;

        const isMatch = await Global.verifyPassword( password, hashedPassword );

        if ( !isMatch ) {
            return res.status( 401 ).json( { error: 'Mot de passe incorrect' } );
        }

        const token = await Global.generateToken( { email, role: user.role, id: user.id } );

        return res.json( { message: 'Connexion réussie', access_token: token, data: { email: user.email, firstname: user.firstname, lastname: user.lastname, id: user.id, role: user.role } } );
    } catch ( error ) {
        console.error( 'Erreur lors de la vérification du mot de passe :', error );
        res.status( 500 ).json( { error: 'Erreur lors de la connexion' } );
    }
};
