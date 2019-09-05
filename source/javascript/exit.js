var validateForm = require('./libs/validateForm.js');
validateGeneral = new validateForm;
//GlobalEvents
$(document).on('changePage', function (event, page) {
  if (page === 'Validate') {
    $('#Dashboard').fadeOut();
    $('#Home').fadeOut(function () {
      $('#Validate').fadeIn();
    });
  }
  if (page === 'Dashboard') {
    $('#Validate').fadeOut(function () {
      $('#Dashboard').fadeIn(); 
    });
  }
});

$(document).on('ready', function () {
  home.init();
  Validate.init();
  Dashboard.init();
  // $('#datepairExample .time').timepicker({
  // 'showDuration': true
  // // 'timeFormat': 'g:ia'
  // });
$('#datepairExample .date').datepicker({
'format': 'd/m/yyyy',
'autoclose': true
});
$('#datepairExample').datepair();

$("#enviarFecha").click(function () {
  $(".velo").fadeIn();
});
$(".close").click(function () {
  $(".velo").fadeOut();
});
$("#aceptar_cita").click(function () {
  $(".velo").fadeOut();
});
});


var home = (function () {

  var st = {
    dni: '#dni',
    askedNumber: '#askedNumber',
    btnLogin: '#login',
    phoneNumber: '#phoneNumber',
    btnRecover: '#btnRecover',
    emailRecover: '#emailRecover',
    recoverNumber: '#recoverNumber',
    backToLogin: '#backLogin',
    form: '',
    //Sections
    introPage: '.contentIntro',
    recoverPage: '.contentRecover',
    successRecoverPage: '.successRecover'
  };

  var dom = {};

  var catchDom = function () {
    dom.btnLogin = $(st.btnLogin);
    dom.backToLogin = $(st.backToLogin);
    dom.recoverNumber = $(st.recoverNumber);
    dom.btnRecover = $(st.btnRecover);
    dom.introPage = $(st.introPage);
    dom.recoverPage = $(st.recoverPage);
    dom.successPage = $(st.successRecoverPage);
  };

  var suscribeEvents = function () {
    dom.btnRecover.on('click', events.goToRecoverPage);
    dom.backToLogin.on('click', events.goToLoginPage);
  };

  var validateForms = function (type) {
    validateGeneral.isValidate($(st.dni), 'numeric');
    validateGeneral.isValidate($(st.phoneNumber), 'numeric');
    validateGeneral.isValidate($(st.emailRecover), 'email');
    validateGeneral.isValidate($(st.askedNumber), 'numeric');

    if (type === 'login') {
      st.form = '#LoginForm';
    }

    if (type === 'recover') {
      st.form = '#RecoverForm';
    }

    $(st.form).validate({
      <errorPla></errorPla>cement: function (error, element) {
        return $(element).parent().append(error);
      },
      highlight: function (element) {
        var $element;
        $element = $(element).parent();
        $element.find('input').addClass('error-input');
      },
      unhighlight: function (element) {
        var $element;
        $element = $(element).parent();
        $element.find('input').removeClass('error-input');
        return $element.removeClass('error');
      },
      messages: {
        dni: {
          required: 'Ingrese número de DNI',
          minlength: 'Ingrese al menos 8 dígitos'
        },
        askedNumber: {
          required: 'Ingrese número de pedido',
          minlength: 'Ingrese al menos 8 dígitos'
        },
        phoneNumber: {
          required: 'Ingrese número de Celular',
          minlength: 'Ingrese al menos 9 dígitos',
          valphone: 'Número de celular debe comenzar con 9'
        },
        emailRecover: {
          required: 'Ingrese correo electrónico',
          emailCustom: 'correo electrónico incorrecto'
        }
      },
      submitHandler: function (form) {
        if (form.id === 'LoginForm') {
          //Ajax Login
          //On Ajax success
          $(document).trigger("changePage", ['Validate']);
        }
        if (form.id === 'RecoverForm') {
          //Ajax Recover Success  
          dom.recoverPage.fadeOut(function () {
            dom.successPage.fadeIn('fast');
          })
        }
      }
    });

  };

  var events = {
    goToRecoverPage: function (e) {
      e.preventDefault;
      dom.introPage.fadeOut(function () {
        dom.recoverPage.fadeIn('fast');
        validateForms('recover');
      })
    },
    goToLoginPage: function (e) {
      e.preventDefault();
      dom.successPage.fadeOut(function () {
        dom.introPage.fadeIn();
      })
    }
  };

  var initialize = function () {
    catchDom();
    suscribeEvents();
    validateForms('login');
  };

  return {
    init: initialize,
  }
})();


var Validate = (function () {

  var st = { 
    form: '#formValidateData',
    name: '#nameUser',
    emailUser: '#emailUser',
    phoneNumberUser: '#phoneNumberUser',
    phoneNumberUser2: '#phoneNumberUser2',
    ubication: '#ubication',
    edit: '.edit',
    btnValidate: '#btnValidateData'
  };  

  var dom = {};
  
  var catchDom = function () {
    dom.edit = $(st.edit);
    dom.btnValidate = $(st.btnValidate);
  };
  
  var suscribeEvents = function () {
    dom.edit.on('click',events.editInput);
    dom.btnValidate.on('click',events.goToDashboard);
  };
  
  var events = {
    editInput: function (e) {
      $(this).prev('input').removeAttr('disabled');
      validateForm(); 
    },
    goToDashboard: function (e) {
      if(!$(st.form).data('validator')){
        e.preventDefault();
        $(document).trigger("changePage", ['Dashboard']);
      }
    }
  };
  
  var validateForm = function () {
    
    validateGeneral.isValidate($(st.dni), 'numeric');
    validateGeneral.isValidate($(st.phoneNumber), 'numeric');
    validateGeneral.isValidate($(st.emailRecover), 'email');
    
    $(st.form).validate({
      errorPlacement: function (error, element) {
        return $(element).parent().append(error);
      },
      highlight: function (element) {
        var $element;
        $element = $(element).parent();
        $element.find('input').addClass('error-input');
      },
      unhighlight: function (element) {
        var $element;
        $element = $(element).parent();
        $element.find('input').removeClass('error-input');
        return $element.removeClass('error');
      },
      messages: {
        emailUser: {
          required: 'Ingrese correo electrónico',
          emailCustom: 'correo electrónico incorrecto'
        },
        phoneNumberUser: {
          required: 'Ingrese número de Celular',
          minlength: 'Ingrese al menos 9 dígitos',
          valphone: 'Número de celular debe comenzar con 9'
        },
        phoneNumberUser2: {
          required: 'Ingrese número de Celular',
          minlength: 'Ingrese al menos 9 dígitos',
          valphone: 'Número de celular debe comenzar con 9'
        },
        ubication: {
          required: 'Ingrese la dirección', 
          minlength: 'Ingrese al menos 5 letras'
        },
      },
      submitHandler: function (form) {
        //On Ajax Success
        $(document).trigger("changePage", ['Dashboard']); 
      }
    });

  };

  var initialize = function () {
    catchDom();
    suscribeEvents();
  };
  
  return {
    init: initialize,
  }
})();


var Dashboard = (function () {

  var st = {
    btnValidate: '#editData',
  };

  var dom = {};

  var catchDom = function () {
    dom.goEdit = $(st.btnValidate);
  };

  var suscribeEvents = function () {
    dom.goEdit.on('click',events.goToValidate);
  };

  var events = {
    goToValidate: function () {
      $(document).trigger('changePage',['Validate']);
    }
  };
  

  var initialize = function () {
    catchDom();
    suscribeEvents();
  };

  return {
    init: initialize,
  }
})();