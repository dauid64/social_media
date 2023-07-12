$('#nova-publicacao').on('submit', criarPublicacao);
$(document).on('click', '.curtir-publicacao', curtirPublicacao);
$(document).on('click', '.descurtir-publicacao', descurtirPublicacao);
$('#atualizar-publicacao').on('click', atualizarPublicacao);

function criarPublicacao(evento) {
    evento.preventDefault();

    $.ajax({
        url: "/publicacoes",
        method: "POST",
        data: {
            titulo: $('#titulo').val(),
            conteudo: $('#conteudo').val(),
        }
    }).done(function() {
        window.location = "/home";
    }).fail(function() {
        alert("Erro ao criar a publicação!");
    })
}

function curtirPublicacao(evento) {
    evento.preventDefault();

    const elementoClicado = $(evento.target);
    const publicacaoID = elementoClicado.closest('div').data('publicacao-id');

    elementoClicado.prop('disabled', true);
    
    $.ajax({
        url:  `/publicacoes/${publicacaoID}/curtir`,
        method: "POST"
    }).done(function() {
        const contadorDeCurtidas = elementoClicado.next('span');
        const quantidadeDeCurtidas = parseInt(contadorDeCurtidas.text());

        contadorDeCurtidas.text(quantidadeDeCurtidas + 1);

        elementoClicado.addClass('descurtir-publicacao');
        elementoClicado.addClass('text-danger');
        elementoClicado.removeClass('curtir-publicacao');
    }).fail(function() {
        alert("Erro ao curtir a publicação!");
    }).always(function() {
        elementoClicado.prop('disabled', false);
    })
}

function descurtirPublicacao(evento) {
    evento.preventDefault();

    const elementoClicado = $(evento.target);
    const publicacaoID = elementoClicado.closest('div').data('publicacao-id');

    elementoClicado.prop('disabled', true);
    
    $.ajax({
        url:  `/publicacoes/${publicacaoID}/descurtir`,
        method: "POST"
    }).done(function() {
        const contadorDeCurtidas = elementoClicado.next('span');
        const quantidadeDeCurtidas = parseInt(contadorDeCurtidas.text());

        contadorDeCurtidas.text(quantidadeDeCurtidas - 1);

        elementoClicado.addClass('curtir-publicacao');
        elementoClicado.removeClass('text-danger');
        elementoClicado.removeClass('descurtir-publicacao');
    }).fail(function() {
        alert("Erro ao curtir a publicação!");
    }).always(function() {
        elementoClicado.prop('disabled', false);
    })
}

function atualizarPublicacao() {
    $(this).prop('disabled', true);

    const publicacaoID = $(this).data('publicacao-id');
    console.log(publicacaoID);

    $.ajax({
        url: `/publicacoes/${publicacaoID}`,
        method: "PUT",
        data: {
            titulo: $('#titulo').val(),
            conteudo: $('#conteudo').val()
        }
    }).done(function() {
        alert("Publicação editada com sucesso!");
    }).fail(function() {
        alert("Erro ao atualizar a publicação!");
    }).always(function() {
        $('#atualizar-publicacao').prop('disabled', false);
    })
}