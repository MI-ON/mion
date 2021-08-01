module.exports = {
    css: {
        loaderOptions: {
            sass: {}
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/'
            }
        }
    }
};
