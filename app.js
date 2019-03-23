new Vue({
    el:'#app',
    data:{
        currencies:{},

        amount:0,

        from:'EUR',

        to:'USD',

        result:0,

        loading:false
    },
    mounted(){
        this.getCurrencies();
    },
    computed:{
        formattedCurrencies(){
            return Object.values(this.currencies);
        },
        calculateResult(){
            return (Number(this.amount) * this.result).toFixed(2);
        },
        disabled(){
            return this.amount==0 || !this.amount || this.loading;
        }
    },
    methods:{
        getCurrencies(){
            const currencies = localStorage.getItem('currencies')

            if(currencies){
                this.currencies = JSON.parse(currencies);
                return;
            }

        axios.get('https://free.currencyconverterapi.com/api/v6/currencies?apiKey=sample-api-key')
        .then( response => {
            this.currencies = response.data.results;
            localStorage.setItem('currencies', JSON.stringify(response.data.results))
        });
        },
        convertCurrency(){
            this.loading = true;
            const key = `${this.from}_${this.to}`;
            axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${key}&apiKey=sample-api-key`)
            .then((response) => {
                this.loading = false;
                console.log(response)
                this.result = response.data.results[key].val
            })
        }
    },
    watch:{
        from(){
            this.result = 0;
        },
        to(){
            this.result = 0;
        }
    }
})