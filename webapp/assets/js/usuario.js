$('#parar-de-seguir').on('click', pararDeSeguir);
$('#seguir').on('click', seguir);
$('#editar-usuario').on('submit', editar);

function pararDeSeguir() {
    const usuarioID = $(this).data('usuario-id');
    $(this).prop('disabled', true);

    $.ajax({
        url: `/usuarios/${usuarioID}/parar-de-seguir`,
        method: "POST"
    }).done(function() {
        window.location = `/usuarios/${usuarioID}`;
    }).fail(function() {
        Swal.fire("Ops...", "Erro ao parar de seguir o usuário!", "error");
        $('#parar-de-seguir').prop('disabled', false);
    });
}

function seguir() {
    const usuarioID = $(this).data('usuario-id');
    $(this).prop('disabled', true);

    $.ajax({
        url: `/usuarios/${usuarioID}/seguir`,
        method: "POST"
    }).done(function() {
        window.location = `/usuarios/${usuarioID}`;
    }).fail(function() {
        Swal.fire("Ops...", "Erro ao seguir o usuário!", "error");
        $('#seguir').prop('disabled', false);
    });
}

function editar(evento) {
    evento.preventDefault();

    $.ajax({
        url: "/editar-usuario",
        method: "PUT",
        data: {
            nome: $('#nome').val(),
            email: $('#email').val(),
            nick: $('#nick').val(),
        }
    }).done(function() {
        Swal.fire("Sucesso!", "Usuário atualizado com sucesso!", "success")
            .then(function() {
                window.location = "/perfil";
            })
    }).fail(function() {
        Swal.fire("Ops...", "Erro ao atualizar o usuário!", "error");
    })
}