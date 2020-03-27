/*!
 * angular-vertical-menu - v0.0.1 - 2015-09-04
 * https://github.com/gnavarro77/angular-vertical-menu
 * Copyright (c) 2015 ; Licensed MIT
 */
 angular.module('angularVerticalMenu', []);

    'use strict';
    
angular.module('angularVerticalMenu').directive('verticalMenu', VerticalMenu);

/**
 * 
 * 
 */
function VerticalMenu() {

    function compile( element, attributes) {
	// get the height of an individual sub menu item, to be used in
	// animation definition
	var height = element.find('li')[1].offsetHeight;
	return {
	        post: function postLink(scope, iElement, iAttrs, controller) {
	            if (controller.config.animation) {
	        	controller.setupAnimation(height);
	            }
	        }
	};
    }
    
    var ddo = {
	restrict : 'EA',
	replace : true,
	scope : {
	},
	controller : VerticalMenuController,
	controllerAs : 'vm',
	bindToController : {
	    id : '@',
	    config : '='
	},
	templateUrl : 'templates/angular-vertical-menu.directive.html',
	compile : compile
    };
    return ddo;
}

VerticalMenuController.$inject = [ '$rootScope', '$location' ];

/**
 * 
 * @param $scope
 * @param $location
 * @param $timeout
 */
function VerticalMenuController($rootScope, $location) {
    
    var vm = this;
    /**
     * Default bullet icon associated with the second level items with no
     * specified icon
     */
    vm.DEFAULT_BULLET_ICON = 'fa-circle-o';
    
    var DEFAULT_ANIMATION = {
	    duration : 0.4,
	    timing : 'ease'
    }
    
    function getKeyframesRules(item, height, id) {
	var height = height * item.children.length;
    	var expandRule = '@-webkit-keyframes expand-' + id + ' { from { max-height: 0px; } to { max-height: ' + height + 'px; } } \
    		    @keyframes expand-' + id + ' { from { max-height: 0px; } to { max-height: ' + height + 'px; } }';
    	var collapseRule = '@-webkit-keyframes collapse-' + id + ' { from { max-height: ' + height + 'px; } to { max-height: 0px; } } \
    		    @keyframes collapse-' + id + ' { from { max-height: ' + height + 'px; } to { max-height: 0px; }}';
    	return expandRule + collapseRule;	
    };
    
    function getAnimationRules(id){
	var animation = angular.copy(DEFAULT_ANIMATION);
	if (angular.isObject(vm.config.animation)) {
	    animation = angular.extend({}, animation, vm.config.animation);
	}
	
	return '.vertical-menu .sbm-collapse-' + id + ' { \
			-webkit-animation-duration: ' + animation.duration + 's; \
			animation-duration: ' + animation.duration + '5s; \
			-webkit-animation-timing-function: ' + animation.timing + '; \
                	animation-timing-function: ' + animation.timing + '; \
        		-webkit-animation-fill-mode: backwards; \
                	animation-fill-mode: backwards; \
        		overflow: hidden; \
        		opacity: 1; \
        	} \
                .vertical-menu .sbm-collapse-' + id + '.ng-enter {\
                    visibility: hidden;\
                    -webkit-animation-name: expand-' + id + ';\
                            animation-name: expand-' + id + ';\
                    -webkit-animation-play-state: paused;\
                            animation-play-state: paused;\
                }\
        	.vertical-menu .sbm-collapse-' + id + '.ng-enter.ng-enter-active {\
                    visibility: visible;\
                    -webkit-animation-play-state: running;\
                            animation-play-state: running;\
        	}\
                .vertical-menu .sbm-collapse-' + id + '.ng-leave {\
                    -webkit-animation-name: collapse-' + id + ';\
                            animation-name: collapse-' + id + ';\
                    -webkit-animation-play-state: paused;\
                            animation-play-state: paused;\
                }\
                .vertical-menu .sbm-collapse-' + id + '.ng-leave.ng-leave-active {\
                    -webkit-animation-play-state: running;\
                            animation-play-state: running;\
                }';
    }
    
    
    vm.setupAnimation = function(height) {
	    var styleElt = document.createElement('style');
	    styleElt.type = 'text/css';
	    var items = vm.config.data;
	    var head = document.head || document.getElementsByTagName('head')[0];
	    var css, item, id = null;
	    for (var i=0; i < items.length; i++) {
		item = items[i];
		if (item.children && item.children.length > 0) {
		    id = vm.getId(i);
		    styleElt.appendChild(document.createTextNode(getAnimationRules(id)));
		    css = getKeyframesRules(items[i], height, id);
		    styleElt.appendChild(document.createTextNode(css));
		}
	    }
	    head.appendChild(styleElt);
    };
    
    /**
     * 
     */
    vm.toggle = function(event, item) {
	event.stopPropagation();
	if (vm.hasChildren(item)) {
	    item.active = !item.active;
	} else if (item.href) {
	    $rootScope.$evalAsync(function() {
		$location.path(item.href);
	    });
	} else if (item.callback) {
	    item.callback(item);
	}
	return false;
    };
    
    /**
     * Returns <code>true</code> if the specified item has some children,
     * <code>false</code> otherwise.
     * 
     * @param {Object}
     *                item - A menu item.
     * @returns {boolean} <code>true</code> if the item has some children,
     *          <code>false</code> otherwise
     */
    vm.hasChildren = function(item) {
	return !!item.children;
    };

    /**
     * Returns the icon associated with the specified item or if none exists the
     * default bullet icon value.
     * 
     * @param {Object}
     *                item - A menu item.
     * @returns {string} the icon associated with the item
     */
    vm.getItemIcon = function(item) {
	return item.icon || vm.getDefaultIcon();
    };
    
    /**
     * Returns the default bullet icon specified by the
     * <code>config.default.icon</code> property or if none is specified the
     * internally defined default bullet icon.
     * 
     * @returns {string} the default bullet icon
     */
    vm.getDefaultIcon = function(){
	var icon = vm.DEFAULT_BULLET_ICON;
	if (vm.config.default && vm.config.default.icon){
	    icon = vm.config.default.icon;
	}
	return icon ;
    };
    /**
     * 
     */
    vm.getId = function(index){
	var id = vm.id || '';
	id += index;
	return id;
    }
}


angular.module("angularVerticalMenu").run(["$templateCache", function($templateCache) {$templateCache.put("templates/angular-vertical-menu.directive.html","<ul class=vertical-menu><li class=treeview ng-class=\"{\'active\' : item.active}\" ng-repeat=\"item in vm.config.data track by $index\"><a ng-href ng-click=\"vm.toggle($event, item)\"><i class=\"fa {{::item.icon}}\"></i> <span>{{::item.label}}</span> <span class=\"pull-right badge {{item.badge.context}}\" ng-if=item.badge>{{item.badge.value || item.badge}}</span> <i class=\"fa pull-right\" ng-class=\"{\'fa-chevron-left\' : !item.active, \'fa-chevron-down\' : item.active}\" ng-if=vm.hasChildren(item)></i></a><ul class=\"treeview-menu sbm-collapse-{{::vm.getId($index)}}\" ng-if=\"vm.hasChildren(item) && item.active\"><li ng-repeat=\"child in item.children track by $index\"><a ng-href ng-click=\"vm.toggle($event, child);\"><i class=\"fa {{::vm.getItemIcon(child)}}\"></i><span>{{::child.label}}</span></a></li></ul></li></ul>");}]);