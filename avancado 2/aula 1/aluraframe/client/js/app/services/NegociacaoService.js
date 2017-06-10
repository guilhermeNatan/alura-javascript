class NegociacaoService {

    constructor()
    {
        this._httpService = new HttpService();
    }

    obterNegociacoesDaSemana()
    {
        return  this._httpService
                .get('negociacoes/semana')
                .then(negociacoes => {

                       console.log(negociacoes);

                       return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    })// fim then
                .catch(
                    erro =>{
                        console.log(erro);
                        throw new Error('Não foi possível obter negociações da semana');
                    })// fim catch



    }// fim obterNegociacoesDaSemana




    obterNegociacoesDaSemanaAnterior()
    {
        return this._httpService.get('negociacoes/anterior')
                .then(negociacoes =>{
                        return negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor))
                    }

                )// fim then
                .catch(
                    erro =>{
                        console.log(erro);
                        throw new Error ('Não foi possível obter negociações da semana anterior');
                    }

                )// fim catch



    }// fim obterNegociacoesDaSemanaAnterior


    obterNegociacoesDaSemanaRetrasada()
    {
        return this._httpService.get('negociacoes/retrasada')
                .then(negociacoes =>{
                        return negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor))
                    }

                )// fim then
                .catch(
                    erro =>{
                        console.log(erro);
                        throw new Error('Não foi possível obter negociações da semana retrasada');
                    }

                )// fim catch



    }// fim obterNegociacoesDaSemanaRetrasada



    obterNegociacoes()
    {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()]
        ).then(periodo => {
            return periodo.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        })
        .catch(erro => {
            throw new Error(erro)
        });
    }

}// fim NegociacaoService



