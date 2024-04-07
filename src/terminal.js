

const gr = [
    'vsm5gKtL', 'sEyKFyaf', 'j8qeNwrg',
    'coHFZYjI', 'O7F4dpvu', 'Vc6O774M',
    'pE4nAlpz', 'eg8aoU6h', 'Sj0Hf2Lt',
    'XVmBX4Ul', 'Rra6DjHY', 'rhajH2e7',
    'URP65pVH', 'ReAhTYOr', 'QbG9BSDl',
    '3mohrlJD', 'W6PYWQUY', 'citoEg88',
    'S8Fa2RzD', 'pTulscqq', 'mhijVzzY',
    'WzTx5wXN', 'NbALUR2N', 'KQXtAcr1',
    '7lyNUHB8'
]

gr.random = () => {
    const n = gr.length;
    return gr[Math.floor(Math.random() * (n))]
}


function random_group() {
    const temp = Math.floor(Math.random() * (5) + 1);
    const list = gr.slice(0, temp - 1)
    return list
}

export function random_user() {
    
}