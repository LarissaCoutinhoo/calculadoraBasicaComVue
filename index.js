const app = Vue.createApp({
    data() {
        return {
            display: '0',
            expressao: '',
            operadorClicado: false
        }
    },
    methods: {
        numero(numero) {
            if (this.display === '0' || this.operadorClicado) {
                this.display = numero.toString()
                this.expressao += numero.toString()
            } else {
                this.display += numero.toString()
                this.expressao += numero.toString()
            }
            this.operadorClicado = false
        },
        operacao(operador) {
            if (this.expressao === '') return
            if (this.expressao.endsWith(' ') && operador !== '-') {
                this.expressao = this.expressao.slice(0, -3)
            }
            this.expressao += ' ' + operador + ' '
            this.display = operador
            this.operadorClicado = true
        },
        calcular() {
            if (this.expressao === '') return
            let resultado
            try {
                resultado = eval(this.expressao)
                this.display = resultado.toString()
                this.expressao = resultado.toString()
                this.operadorClicado = true
            } catch (error) {
                this.display = 'Erro'
            }
        },
        limpar() {
            this.display = '0'
            this.expressao = ''
            this.operadorClicado = false
        },
        decimall() {
            if (this.operadorClicado) return
            if (!this.display.includes('.')) {
                this.display += '.'
                this.expressao += '.'
            }
        },
        teclado(event) {
            const tecla = event.key;
            if (!isNaN(tecla)) {
                this.numero(parseInt(tecla));
            } else if (tecla === '+' || tecla === '-' || tecla === '*' || tecla === '/') {
                this.operacao(tecla);
            } else if (tecla === '.' || tecla === ',') {
                this.decimall();
            } else if (tecla === 'Enter' || tecla === '=') {
                this.calcular();
            } else if (tecla === 'Backspace' || tecla === 'Delete') {
                this.limpar();
            }
        }        
    }
})

app.mount('#app')
