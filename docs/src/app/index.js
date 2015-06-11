'use strict';

angular.module('docs', ['eehNavigation', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap']);
angular.module('docs').config(function ($stateProvider, $translateProvider, $urlRouterProvider, eehNavigationProvider) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController'
        })
        .state('docs', {
            url: '/docs',
            templateUrl: 'app/docs/docs.html',
            controller: 'DocsController'
        })
        .state('docs.gettingStarted', {
            url: '/getting-started',
            templateUrl: 'partials/getting-started.html'
            //template: '<marked ng-include="\'content/getting-started.md\'"></marked>'
        })
        .state('docs.changeLog', {
            url: '/change-log',
            templateUrl: 'partials/change-log.html'
        })
        .state('docs.icons', {
            url: '/icons',
            template: '<marked ng-include="\'content/icons.md\'"></marked>'
        })
        .state('docs.languageTranslation', {
            url: '/language-translation',
            template: '<marked ng-include="\'content/language-translation.md\'"></marked>'
        })
        .state('docs.eehNavigationService', {
            url: '/eeh-navigation-service',
            templateUrl: 'partials/api/core/service/eehNavigation.html'
            //template: '<marked ng-include="\'content/eeh-navigation-service.md\'"></marked>'
        })
        .state('docs.eehNavigationSidebar', {
            url: '/eeh-navigation-sidebar',
            templateUrl: 'partials/api/sidebar/directive/eeh-navigation-sidebar.html'
            //template: '<marked ng-include="\'content/eeh-navigation-sidebar.md\'"></marked>'
        })
        .state('docs.eehNavigationNavbar', {
            url: '/eeh-navigation-navbar',
            templateUrl: 'partials/api/navbar/directive/eeh-navigation-navbar.html'
        });

    eehNavigationProvider
        .iconBaseClass('fa')
        .menuItem('nav.gettingStarted', {
            text: 'Getting Started',
            state: 'docs.gettingStarted',
            iconClass: 'fa-power-off'
        })
        .menuItem('nav.changeLog', {
            text: 'Change Log',
            state: 'docs.changeLog',
            iconClass: 'fa-refresh'
        })
        .menuItem('nav.service', {
            text: 'Service'
        })
        .menuItem('nav.service.eehNavigationService', {
            text: 'eehNavigation',
            state: 'docs.eehNavigationService'
        })
        .menuItem('nav.directive', {
            text: 'Directive',
            isCollapsed: false
        })
        .menuItem('nav.directive.eehNavigationSidebar', {
            text: 'eehNavigationSidebar',
            state: 'docs.eehNavigationSidebar'
        })
        .menuItem('nav.directive.eehNavigationNavbar', {
            text: 'eehNavigationNavbar',
            state: 'docs.eehNavigationNavbar'
        })
        //.menuItem('nav.configuration.nestedSidebarMenuItems', {
        //    text: 'Nested Sidebar Menu Items',
        //    state: 'docs.nestedSidebarMenuItems'
        //})
        //.menuItem('nav.configuration.sidebarTextCollapseMenuItem', {
        //    text: 'Sidebar Text Collapse Menu Item',
        //    state: 'docs.sidebarTextCollapseMenuItem'
        //})
        //.menuItem('nav.configuration.sidebarSearchMenuItem', {
        //    text: 'Sidebar Search Menu Item',
        //    state: 'docs.sidebarSearchMenuItem'
        //})
        //.menuItem('nav.configuration.languageTranslation', {
        //    text: 'Language Translation',
        //    state: 'docs.languageTranslation'
        //})
        //.menuItem('nav.configuration.icons', {
        //    text: 'Icons',
        //    state: 'docs.icons'
        //})
        ;
});

angular.module('docs').directive('pre', function($window) {
    return {
        restrict: 'E',
        link: function postLink(scope, element) {
            scope.$on('$viewContentLoaded', function(){
                element.addClass('prettyprint');
                element.html($window.prettyPrint(element.html(), '', true));
                //$window.hljs.initHighlightingOnLoad();
                //element.html($window.hljs.highlightBlock(element.html()));
                //$window.hljs.highlightAuto('<pre>' + element.html() + '</pre>');
            });
        }
    };
});