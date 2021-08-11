module.exports = {
    css: {
        loaderOptions: {
            sass: {}
        }
    },
    devServer: {
        proxy: {
            '/graphql': {
                target: process.env.GRAPHQL_API_ENDPOINT,
                changeOrigin: true
            }
        }
    }
};
