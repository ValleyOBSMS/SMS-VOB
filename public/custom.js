// custom js
jQuery(document).ready(function(){

	jQuery("#select-input-message").select2();
	
	jQuery('.custom-message-wrapp').hide();
	jQuery('#custom-message').prop("disabled", true);
	
	jQuery("#select-input-message").change(function() {
		if(( jQuery('option:selected', this).val() =='custom' )){
			jQuery('.custom-message-wrapp').show();
			jQuery('#custom-message').prop("disabled", false);
		}else{
			jQuery('#custom-message').val('');
			jQuery('#custom-message').prop("disabled", true);
			jQuery('.custom-message-wrapp').hide();
		}
	});

// document ready end 
});


