$(document).ready(function () {
  $("#nis").keypress(function (e) {
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
     }
   });
});

$(document).on('hidden.bs.modal', '#myModal', function (e) {
    $('#nome').html("");
    $('#nisNum').html("");
    $('#situacao').html("");
    $('#info').html("");
});

function buscar() {
    let nisBuscado = document.getElementById('nis').value;
    
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://neexsoft.com/mcmv/pessoa.php?nis=' + nisBuscado,
        beforeSend: function () {
            $('#botao').prop('disabled', true);
            $('#botao').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        },
        success: function (data) {
            $('#botao').html('<i class="material-icons">search</i>');
            $('#botao').prop('disabled', false);
            $('#nome').html(data[0].nome.toUpperCase());
            $('#nisNum').html(data[0].nis);
            $('#situacao').html(verificar(data[0]));
            $('#myModal').css('display' , 'flex');
            $('#myModal').css('align-items' ,'center');
            $('#myModal').modal('show');
        },
        error: function (data) {
            $('#botao').html('<i class="material-icons">search</i>');
            $('#botao').prop('disabled', false);
            $('#modalErro').modal('toggle');
        }
    });
}

function verificar(data){
    if (data.numeroUnico != 0) {
        if (data.contemplacao == 0 && data.reserva == 0) {
            return "Você não foi contemplado";
        }
        else if(data.contemplacao == 'deficientes'){
            if(data.reserva == 0){
                return "Você foi contemplado na cota de Deficientes";
            }
            else if(data.reserva == 1){
                return "Você encontra-se no cadastro de reserva do grupo de Deficientes";
            }
        }
        else if(data.contemplacao == 'idosos'){
            if(data.reserva == 0){
                return "Você foi contemplado na cota de Idoso";
            }
            else if(data.reserva == 1){
                return "Você encontra-se no cadastro de reserva do grupo de Idoso";
            }
        }
        else if(data.contemplacao == 'i'){
            if(data.reserva == 0){
                return "Você foi contemplado no Grupo 1";
            }
            else if(data.reserva == 1){
                return "Você encontra-se no cadastro de reserva do Grupo 1";
            }
        }
        else if(data.contemplacao == 'ii'){
            if(data.reserva == 0){
                return "Você foi contemplado no Grupo 2";
            }
            else if(data.reserva == 1){
                return "Você encontra-se no cadastro de reserva do Grupo 2";
            }
        }
        else if(data.contemplacao == 'iii'){
            if(data.reserva == 0){
                return "Você foi contemplado no Grupo 3";
            }
            else if(data.reserva == 1){
                return "Você encontra-se no cadastro de reserva do Grupo 3";
            }
        }
    }
    else {
         return "Desclassificado"
    }
}