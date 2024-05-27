const path = require('path');

module.exports = {
    // Autres configurations Webpack...
    resolve: {
        extensions: ['.js', '.jsx'], // Extensions de fichiers à résoudre
        modules: [path.resolve(__dirname, 'node_modules'), 'stompjs'], // Inclure le répertoire stompjs
    },
};
