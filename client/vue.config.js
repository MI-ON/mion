module.exports = {
    css: {
        loaderOptions: {
            sass: {}
        }
    },
    devServer: {
        proxy: {
            '/graphql': {
                target: process.env.VUE_APP_GRAPHQL_API_ENDPOINT,
                changeOrigin: true
            }
        }
    }
};
