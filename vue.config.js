module.exports ={
    devServer : {
        proxy : {
            '/csrng' : {  
                target : "https://csrng.net",
                ws: true,
                pathRewrite : { '^/csrng':  '/csrng' },
                changeOrigin: true
            }
        }
    }
}