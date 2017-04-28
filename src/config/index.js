const config = {
    // Oauth 参数
    Oauth: {
        appid: "wx34aa7d47c54160d8"
    },

    // 换取token接口
    AuthUrl: '/weixin/oauth/login',
    // 跳转到授权地址
    authorizeUrl: '/weixin/authorize/wxxg',
    // 行情api地址
    quoteUrl: 'https://v3quote.ktkt.com',
    Origin: 'wxxg'
}

export default config