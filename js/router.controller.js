$(function() {
	
	var target_view = $('#main-view');

	// Print a hash
	$.print = function(dict) {
	    return JSON.stringify(dict);
	}

	// Setup routes
	// [folder]/:template/:action/:value/...
    target_view
        .route('test/', function(request) {
            return 'test: ' + $.print(request.params);
        }).route('settings/', function(request) {
            return 'settings: ' + $.print(request.params);
        }).route('quit/', function(request) {
            return 'quit: ' + $.print(request.params);
        }).route('book/:id/', function(request, id) {
            return 'book ' + id + ': ' + $.print(request.params);
        }).route('book/:id/note/:noteId#[0-9]+#/', function(request, id, noteId) {
            return 'book ' + id + ', note ' + noteId + ': ' + $.print(request.params);
        }).route('content/', function(request) {
	        //alert(request.params.view); // get ?view=
	        //alert(request.path); // get path
	        target_view.load(request.params.view+'.html');
	        //return 'omg';
        }).route('home/', function(request) {
	        $('.iosSlider').iosSlider('destroy'); // any page that contains iosSlider must be destroyed to work...
	        target_view.html('<iframe src="v-homescreen/index.html" height="1080px" width="1920px"></iframe>');

	        $('.iosSlider').iosSlider('destroy'); // any page that contains iosSlider must be destroyed to work...
        }).route('demo2/', function(request) {
	        $('.iosSlider').iosSlider('destroy'); // any page that contains iosSlider must be destroyed to work...
	        target_view.html('<iframe src="v-taphouse/index.html" height="1080px" width="1920px"></iframe>');
        }).route('demo3/', function(request) {
	        $('.iosSlider').iosSlider('destroy'); // any page that contains iosSlider must be destroyed to work...
	        target_view.html('<iframe src="v-simonds-prototype/index.html" height="1080px" width="1920px"></iframe>');
       
	    }).route('dans/', function(request) {
		    $('.iosSlider').iosSlider('destroy'); // any page that contains iosSlider must be destroyed to work...
	        target_view.load('v-dans/index.html');
        });
        


	// Bind hashchange event
    $(window).bind('hashchange', function(e, triggered) {
	    $('#link-holder').removeClass('show');
        var hash = location.hash.replace(/^#/, '');
        if (hash) {
            var match = $.routeMatches(hash);
            if (match) {
                var template = $(match.route.template);
                if (template.length) {
                    var text = match.route.callback.apply(match.route.callback, match.args);
                    template.text(text);
                }
            }
        }
    });
    
    
	
})