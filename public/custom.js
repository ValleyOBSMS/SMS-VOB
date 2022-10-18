// custom js
jQuery(document).ready(function () {
  jQuery("#select-input-message").select2();

  jQuery(".custom-message-wrapp").hide();
  jQuery("#custom-message").prop("disabled", true);

  jQuery("#select-input-message").change(function () {
    if (jQuery("option:selected", this).val() == "custom") {
      jQuery(".custom-message-wrapp").show();
      jQuery("#custom-message").prop("disabled", false);
    } else {
      jQuery("#custom-message").val("");
      jQuery("#custom-message").prop("disabled", true);
      jQuery(".custom-message-wrapp").hide();
    }
  });

  document.getElementById("email").addEventListener("keypress", (e) => {
    e.preventDefault();
  });
  document.getElementById("email").onkeydown = function () {
    var key = event.keyCode || event.charCode;

    if (key == 8 || key == 46) return false;
  };

  document.getElementById("number").addEventListener("keypress", (e) => {
    e.preventDefault();
  });

  document.getElementById("number").onkeydown = function () {
    var key = event.keyCode || event.charCode;

    if (key == 8 || key == 46) return false;
  };

  // document ready end
});
