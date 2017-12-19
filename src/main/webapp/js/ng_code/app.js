angular
	.module('spheresuite',['ngRoute', 'ngStorage', 'ui.bootstrap', 'moment-picker', 'infinite-scroll', 'ngFileUpload', 'ngSanitize','ngImgCrop', 'wt.responsive'])
	.config(['momentPickerProvider', function(momentPickerProvider) {
        momentPickerProvider.options({
            leftArrow: '&lt;',
            rightArrow: '&gt;',
            secondsEnd: 0
        });
    }])