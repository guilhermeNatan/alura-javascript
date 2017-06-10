class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(),this._negociacoesView,
        'adiciona','esvazia', 'ordena', 'inverteOrdem');
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView,'texto');

        this._ordemAtual='';
    }

    importarNegociacoes()
    {
        let negociacaoService = new NegociacaoService();

        negociacaoService.obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociações adicionada com sucesso!";
        })
            .catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna)
    {
        if(this._ordemAtual == coluna)
        {
            this._listaNegociacoes.inverteOrdem();
        }
        else {
            this._listaNegociacoes.ordena((a,b)=> a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
    adiciona(event) {
        
        event.preventDefault();
        try{

            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limpaFormulario();
        }catch (erro)
        {
            this._mensagem.texto = erro
        }
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    apaga()
    {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações excluídas com sucesso.';
    }
}