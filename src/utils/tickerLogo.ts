const tickerLogo = (asset: string) => {
    if (asset == 'ETH') return 'https://content-api.changenow.io/uploads/ethbsc_9aef8d5bf4.svg';
    if (asset == 'UNI') return 'https://content-api.changenow.io/uploads/uni_e7f3b91b33.svg';
    if (asset == '1INCH') return 'https://content-api.changenow.io/uploads/1inch_8ec7c90868.svg'
    if (asset == 'ADA') return 'https://content-api.changenow.io/uploads/ada_3e3be3b950.svg'
    if (asset == 'AVAX') return 'https://content-api.changenow.io/uploads/avaxs_470dc56248.svg'
    if (asset == 'CELO') return 'https://content-api.changenow.io/uploads/celo_64285792fc.svg'
    if (asset == 'DOGE') return 'https://content-api.changenow.io/uploads/doge_a0321dc732.svg'
    if (asset == 'DOT') return 'https://content-api.changenow.io/uploads/dot_a2a9609545.svg'
    if (asset == 'ETC') return 'https://content-api.changenow.io/uploads/etc_42cb359a77.svg'
    if (asset == 'LINK') return 'https://content-api.changenow.io/uploads/link_183e331633.svg'
    if (asset == 'MATIC') return 'https://content-api.changenow.io/uploads/maticbsc_ea05fe4d1f.svg'
    if (asset == 'NEAR') return 'https://content-api.changenow.io/uploads/NEAR_ac5539b7ca.svg'
    if (asset == 'SOL') return 'https://content-api.changenow.io/uploads/sol_3b3f795997.svg'
    if (asset == 'SUSHI') return 'https://content-api.changenow.io/uploads/shushi_7804381157.svg'
    if (asset == 'YFI') return 'https://content-api.changenow.io/uploads/yfi_7b99a7b444.svg'
    if (asset == 'ATOM') return 'https://content-api.changenow.io/uploads/atom_4177c38aa8.svg'
    if (asset == 'AAVE') return 'https://content-api.changenow.io/uploads/aave_10a92c0ead.svg'
    if (asset == 'LTC') return 'https://content-api.changenow.io/uploads/ltc_a399d6378f.svg'
    if (asset == 'SNX') return 'https://content-api.changenow.io/uploads/snx_3f5da1009e.svg'
    return 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg'
}

export default tickerLogo